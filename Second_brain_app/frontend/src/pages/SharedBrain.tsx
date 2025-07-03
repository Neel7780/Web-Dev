import { useParams } from "react-router-dom";
import { Sidebar } from "../components/ui/sidebar";
import { Card } from "../components/ui/cards";
import { BACKEND_URL } from "../configs";
import axios from "axios";
import { useEffect, useState } from "react";

interface ContentItem {
    type: "youtube" | "twitter";
    link: string;
    title: string;
}

export function SharedBrain() {
    const { shareId } = useParams<{ shareId: string }>();
    const [contents, setContents] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!shareId) return;

        const fetchSharedContent = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/share/${shareId}`);
                console.log("API Response:", response.data);
                const responseData = response.data;
                let contentList = [];

                if (responseData && responseData.content && typeof responseData.content === 'object' && !Array.isArray(responseData.content)) {
                    // Handle single content object
                    contentList = [responseData.content];
                } else if (responseData && responseData.contents && Array.isArray(responseData.contents)) {
                    // Handle array of contents
                    contentList = responseData.contents;
                } else if (responseData && responseData.sharedBrain && Array.isArray(responseData.sharedBrain.contents)) {
                    // Handle nested contents in sharedBrain
                    contentList = responseData.sharedBrain.contents;
                } else if (Array.isArray(responseData)) {
                    // Handle direct array response
                    contentList = responseData;
                } else if (responseData && typeof responseData === 'object' && !Array.isArray(responseData)) {
                    // Handle single object response
                    contentList = [responseData];
                }

                if (Array.isArray(contentList) && contentList.length > 0) {
                    setContents(contentList);
                } else {
                    setError("No content found or invalid data format from server.");
                }
            } catch (err) {
                setError("Failed to fetch shared brain. The link may be invalid or expired.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSharedContent();
    }, [shareId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex gap-4 flex-wrap items-start">
                {contents.map((content, index) => (
                    <Card
                        key={index}
                        type={content.type}
                        link={content.link}
                        title={content.title}
                    />
                ))}
            </div>
        </div>
    );
}