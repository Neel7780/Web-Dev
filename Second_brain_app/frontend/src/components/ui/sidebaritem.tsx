import type { ReactElement } from "react";

interface SidebarItemprops {
    title : string,
    icon : ReactElement
}

export function SidebarItem ({title, icon} : SidebarItemprops) {
    return (
        <div className="flex m-6 gap-2">
            <div>{icon}</div>
            <div>{title}</div>
        </div>
    )
}