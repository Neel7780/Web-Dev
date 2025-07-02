import { useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../configs";
import axios from "axios";

export function SignIn () {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username : username,
            password : password
        })
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
    }
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border rounded-md p-2">
                <div className="flex justify-center text-xl text-bold">Sign In</div>
                <Input reference={usernameRef} placeholder="Username"/>
                <Input reference={passwordRef} placeholder="Password"/>
                <div className="flex justify-center"><Button text={"Submit"} onClick={signin} variant="primary" size="md"/></div>
            </div>
        </div>
    )
}