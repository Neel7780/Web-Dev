import { useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { BACKEND_URL } from "../configs"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp () {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username : username,
            password : password
        })
        alert("You are signed up!")
        navigate("/signin")
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="border rounded-md p-2">
                <div className="flex justify-center text-xl text-bold">Sign Up</div>
                <Input reference={usernameRef} placeholder="Username"/>
                <Input reference={passwordRef} placeholder="Password"/>
                <div className="flex justify-center">
                    <Button text={"Submit"} onClick={signup} variant="primary" size="md"/>
                </div>
            </div>
        </div>
    )
}