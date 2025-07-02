import { LogoIcon, XIcon, YoutubeIcon } from "../../assets/icons";
import { SidebarItem } from "./sidebaritem";



export function Sidebar () {
    return (
        <div className="h-screen top-0 left-0 min-w-72 border-r">
            <div className="flex m-3">
                <div className="text-purple-400 pr-2 "><LogoIcon /></div>
                <div className="text-xl font-bold">Second-Brain</div>
            </div>
            <div>
                <SidebarItem title="Twitter" icon={<XIcon/>}/>
                <SidebarItem title="Youtube" icon={<YoutubeIcon/>}/>
            </div>
        </div>
    )
}  