export function Sidebar2(){
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="md:w-96 w-0 h-screen sm:block hidden transition-all duration-1000 bg-white shadow-2xl shadow-black z-10">
                <div className="flex justify-between">
                    <div className="flex items-center bg-violet-800 px-3 py-3 text-white rounded-xl m-3">
                        <img
                            src="../../pics/computer-logo-internet-png-favpng-bAJctcX18wnUDEZsgq9i1tEb3-removebg-preview.png"
                            alt=""
                            className="h-9 w-auto"
                        />
                        <h1 className="ml-2 font-semibold truncate">Webinar.gg</h1>
                    </div>
                    <div className="m-5">
                        <img
                            src="../../pics/107311448.png"
                            alt=""
                            className="w-10 h-10 rounded-xl ml-3 flex-shrink-0 shadow"
                        />
                    </div>
                </div>
                <div className="space-y-4 mt-8 ml-6">
                    <div>Home</div>
                    <div>Webinars</div>
                    <div>Billing</div>
                    <div>Manage</div>
                    <div>Settings</div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full h-screen bg-white ">
                    <div className="w-screen h-48 bg-black hidden md:block"></div>
                    <div className="grid grid-cols-11 gap-8 p-8">
                        <div className="h-96 rounded-2xl bg-red-200 md:col-span-2 -translate-y-24 shadow-lg  col-span-11 hidden md:block">
                        </div>
                    </div>
            </div>
        </div>
    )
}