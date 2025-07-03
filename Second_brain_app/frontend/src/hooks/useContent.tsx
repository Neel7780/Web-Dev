import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../configs";

export function useContent () {
    const [contents, setContents] = useState([])
    function refresh () {
        const token = localStorage.getItem("token");
        if (!token) {
            console.warn("No authentication token found. Not fetching content.");
            setContents([]);
            return;
        }
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then((response) => {
                setContents(Array.isArray(response.data) ? response.data : [])
            })
            .catch((error) => {
                console.error("Error fetching content:", error);
                setContents([])
            })
    }
    useEffect(() => {
        refresh()
        let interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return {contents, refresh};
}