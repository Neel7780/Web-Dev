import type { ReactElement } from "react"

interface buttonprops {
    text : String,
    size : "lg" | "sm" | "md",
    icon?: ReactElement, 
    variant : "primary" | "secondary",
    onClick? : () => void,
}

const sizeStyles = {
    "lg": "px-8 py-4 text-xl rounded-xl",
    "md": "px-4 py-2 text-md rounded-md",
    "sm": "px-2 py-1 text-sm rounded-sm",
}

const buttonvariants = {
    "primary": " bg-purple-700 text-white",
    "secondary": "bg-purple-400 text-purple-700",

}

export function Button(props : buttonprops){
    const Comp = props.icon;
    return (
        <button onClick={props.onClick} className={`${buttonvariants[props.variant]} ${sizeStyles[props.size]} cursor-pointer`}>
            <div className="flex items-center">
                {Comp}
                <div className="pl-2 pr-2">
                    {props.text}
                </div>
            </div>
        </button>
    )
}