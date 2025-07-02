import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../configs";

export function useContent () {
    const [contents, setContents] = useState([])
    function refresh () {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                setContents(Array.isArray(response.data) ? response.data : [])
            })
            .catch(() => {
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