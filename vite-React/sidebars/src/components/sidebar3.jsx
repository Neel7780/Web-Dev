import { useState, useEffect } from "react"
import { SidebarToggle } from "./icons/sidebartoggle"

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export function Sidebar3(){
    const [sidebaropen, setSidebaropen] = useState(true)
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        if (isDesktop == false) {
            setSidebaropen(false)
        } else {
            setSidebaropen(true)
        }
    }, [isDesktop])
  
    return (
        <div className="flex">
            <Sidebar sidebaropen={sidebaropen} setSidebaropen={setSidebaropen} />
            <Content/>
        </div>
    )
}

function Sidebar({sidebaropen, setSidebaropen}){
    return (
        <div className="relative flex flex-col">
            <div className="cursor-pointer absolute top-0 left-0 z-20" onClick={()=>{setSidebaropen(!sidebaropen)}}>
                <SidebarToggle />
            </div>
            <div
                className={`
                    transition-all duration-500 ease-in-out
                    bg-white shadow-2xl h-screen z-10
                    overflow-hidden
                    ${sidebaropen ? "md:w-96 w-64" : "w-0"}
                `}
                style={{ minWidth: sidebaropen ? "16rem" : "0" }}
            >
                <div className={`flex justify-between m-3 transition-opacity duration-300 ${sidebaropen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {/* Webinar.gg */}
                    <div className="flex items-center px-3 pb-1 bg-violet-800 rounded-2xl">  
                        <img
                            src="../../pics/computer-logo-internet-png-favpng-bAJctcX18wnUDEZsgq9i1tEb3-removebg-preview.png"
                            alt=""
                            className="h-9 w-auto"
                        />
                        <div className="ml-2 font-semibold text-white">Webinar.gg</div>
                    </div>
                    {/* PP */}
                    <div>
                        <img
                            src="../../pics/107311448.png"
                            alt=""
                            className="w-10 h-10 rounded-xl ml-3 flex-shrink-0 shadow"
                        />
                    </div>
                </div>
                <div className={`space-y-4 mt-8 ml-6 transition-opacity duration-300 ${sidebaropen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <div>Home</div>
                    <div>Webinars</div>
                    <div>Billing</div>
                    <div>Manage</div>
                    <div>Settings</div>
                </div>
            </div>
        </div>
    )
}

function Content(){
    return (
        <div className="w-full">
            <div className="bg-black h-48 w-full hidden md:block"></div>
            <div className="grid grid-cols-11 gap-8 md:p-8 m-10">
                <div className="h-96 md:col-span-2 bg-white shadow-xl rounded-2xl -translate-y-24 flex items-center justify-center col-span-11" >
                    <img src="../../pics/107311448.png" alt="" className="w-36 h-36 rounded-2xl mb-32" />
                </div>
                <div className="h-96 md:col-span-6 bg-amber-200 shadow-xl rounded-2xl md:translate-y-36 col-span-11"></div>
                <div className="h-96 md:col-span-3 bg-red-200 shadow-xl rounded-2xl md:translate-y-36 col-span-11"></div>
            </div>
        </div>
    )
}