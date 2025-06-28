export function Sidebar() {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="hidden md:block w-0 md:w-96 bg-white h-screen shadow-2xl transition-all duration-1000 ">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center bg-violet-800 px-3 py-2 text-white rounded-xl min-w-0 overflow-hidden transition-all duration-1000 shadow-md">
                        <img
                            src="../../pics/computer-logo-internet-png-favpng-bAJctcX18wnUDEZsgq9i1tEb3-removebg-preview.png"
                            alt=""
                            className="h-9 w-auto flex-shrink-0"
                        />
                        <h1 className="ml-2 font-semibold truncate">Webinar.gg</h1>
                    </div>
                    <img
                        src="../../pics/107311448.png"
                        alt=""
                        className="w-10 h-10 rounded-xl ml-3 flex-shrink-0 shadow"
                    />
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
            <div className="flex-1 bg-white p-4 shadow-lg transition-all duration-500 rounded-tl-3xl sm:rounded-tl-none">
                Content
            </div>
        </div>
    )
}