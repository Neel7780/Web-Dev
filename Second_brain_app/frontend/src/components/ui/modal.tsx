import { useRef, useState } from "react"
import { CrossIcon } from "../../assets/icons"
import { Button } from "./button"
import { Input } from "./input"
import { BACKEND_URL } from "../../configs"
import axios from "axios"

interface modalProps {
    open : boolean,
    onClose : () => void
}

const contentType  = {
    youtube : "youtube",
    twitter : "twitter"
}

export function Modal ({open, onClose} : modalProps) {
    const [selected, setSelected] = useState(contentType.youtube)
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    async function addContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in. Please sign in first.");
            return;
        }
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type : selected
        }, {
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }) 
        onClose();
    }
    return (
        <div>
            {open && 
            <div>
                <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center"></div>
                    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                        <div className="flex flex-col justify-center">
                            <span className="bg-white opacity-100 p-4 rounded fixed">
                                <div onClick={onClose} className="flex justify-end cursor-pointer"><CrossIcon/></div>
                                <div >
                                    <Input reference={titleRef} placeholder="Title"/>
                                    <Input reference={linkRef} placeholder="Link" />
                                    <div className="flex justify-center">Type</div>
                                    <div className="flex p-4">
                                        <Button text={"Youtube"} variant={selected === contentType.youtube ? "primary" : "secondary"} onClick={() => setSelected(contentType.youtube)} size="md"/>
                                        <Button text={"Twitter"} variant={selected === contentType.twitter ? "primary" : "secondary"} onClick={() => setSelected(contentType.twitter)} size="md"/>
                                    </div>
                                    
                                </div>
                                <div className="flex justify-center"><Button text={"Submit"} onClick={addContent} variant={"primary"} size="md"/></div>
                            </span>

                        </div>
                    </div>
            </div>
            }
        </div>
    )
}