import { TrailerPlayer } from '../components/TrailerPlayer'
import { useLocation } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react'

type TitleProps = {
    title: string,
    fetchVideosUrl: string,
}

export const Single: React.FC = () => {

    const location = useLocation();

    const { title, fetchVideosUrl }: TitleProps = location.state;

    useEffect(() => {
        document.title = title;
    }, []);

    return (
        <>
            <header className="fixed left-0 right-0 top-0 py-5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-gradient-to-b from-black to-black z-20 transition-colors duration-500 will-change-[background-color]">
                <div className="flex items-center flex-wrap gap-x-8">
                    <NavLink to="/" className="flex mr-2 text-neutral-600 transition-colors hover:text-white duration-500">
                        <svg
                            className='h-6 w-auto'
                            xmlns="http://www.w3.org/2000/svg" width="15" height="16.828" viewBox="0 0 15 16.828">
                            <g id="arrow-left" transform="translate(-4 -3.586)">
                                <line id="Line_1" data-name="Line 1" x1="14" transform="translate(5 12)" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" />
                                <path id="Path_545" data-name="Path 545" d="M12,19,5,12l7-7" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" />
                            </g>
                        </svg>
                    </NavLink>
                </div>
            </header>
            <div className="w-screen h-screen">
                <TrailerPlayer
                    fetchVideosUrl={fetchVideosUrl}
                />
            </div>
        </>
    )
}