import { useEffect, useState  } from "react"
import { NavLink } from 'react-router-dom'

export const Header: React.FC  = () => {

    const [isSticky, setIsSticky] = useState<boolean>(false)

    const handleScroll = () : void => {
        const currentScrollPos: number = window.scrollY;
        currentScrollPos > 1 ? setIsSticky(true) : setIsSticky(false)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []
    )

    type navItem = {
        name:   string,
        url:    string
    }

    type navItems = navItem[]

    const navItems: navItems = [
        {
            name:   "Home",
            url:    "/"
        },
        /*  soon
        {
            name: "TV Shows",
            url: "/single"
        },
        {
            name:   "Movies",
            url:    "/single"
        },
        {
            name:   "New & popular",
            url:    "/single"
        },
        {
             name:   "My List",
             url:    "/my-list"
        },
        */
        
    ]
    return (
        <>
            <header className={(isSticky ? "bg-neutral-900 " : "") + "fixed left-0 right-0 top-0 py-5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-gradient-to-b from-[#000000]/50 to-[#000000]/0 z-20 transition-colors duration-500 will-change-[background-color]"}>
                <div className="flex items-center flex-wrap gap-x-8">
                    <NavLink
                        to="/"
                        className="flex mr-2"
                    >
                        <svg className="h-6 w-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="2500"
                            height="676"
                            viewBox="0 0 1024 276.742"
                        >
                            <path
                                fill="#d81f26"
                                d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0H1024z"
                            ></path>
                        </svg>
                    </NavLink>
                    {
                        navItems.length > 0 && (
                            <div className="flex text-sm font-bold">
                                <ul className="flex items-center gap-x-6 gap-y-2">
                                    {
                                        navItems.map((navItem, index) => {
                                            return (
                                                <li key={index}>
                                                    <NavLink
                                                        to={navItem.url}
                                                        className={
                                                            ({ isActive, isPending }) => isPending ? "text-red-500" : isActive ? "active text-white font-bold" : "text-neutral-300 font-medium transition-colors hover:text-neutral-400"
                                                        }
                                                    >
                                                        {navItem.name}
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }
                    
                    {/* <div className="ml-auto">My account </div> (one day..) */}
                    
                </div>
            </header>
        </>
    )
}