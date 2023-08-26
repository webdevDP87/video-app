import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { TrailerPlayer } from './TrailerPlayer';
import Axios from 'axios';

type selectedMediaProps = {
    activeMedia?: {
        title: string,
        name: string,
        id: number,
        genre_ids: number[],
        backdrop_path: string,
        overview: string,
    },
    activeMediaType?: string
    modalPosition: {
        top: string,
        left: string,
        width: string
    },
    modalUpscaled: boolean,
    modalVisible: boolean,
    setModalUpscaled: any,
}

const apiKey: string = '8bd571e7945e3a610f397bff1b4b6727';

export const Modal = (props: selectedMediaProps) => {

    const modalWrapperRef = useRef<HTMLDivElement | null>(null);
    const modalContainerRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const [allGenres, setAllGenres] = useState<any>();
    const [similar, setSimilar] = useState<any>();
    const [matchNumber, setMatchNumber] = useState<any>();
    const [minAge, setMinAge] = useState<any>();
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

    let genres: any,
        mediaType: string | undefined,
        mediaURL: string | undefined,
        fetchVideosUrl: any

    const { activeMedia, activeMediaType, modalPosition, modalUpscaled, modalVisible, setModalUpscaled } = props;

    if (activeMedia) {
        genres = allGenres.filter((obj: { id: number, name: string }) => activeMedia.genre_ids.includes(obj.id));
        mediaType = (activeMediaType === 'movie') ? 'movie' : 'tv';
        mediaURL = (activeMedia.title || activeMedia.name).replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
        fetchVideosUrl = `//api.themoviedb.org/3/${mediaType}/${activeMedia.id}/videos?api_key=${apiKey}`;
    }

    const { data: queryMediaSimilar, refetch } = useQuery([`getSimilar`], () => {
        if(activeMedia) {
            return Axios.get(`//api.themoviedb.org/3/${activeMediaType}/${activeMedia.id}/similar?language=en&api_key=${apiKey}`).then((res) => {
                return res.data.results;
            });
        } else {
            return null
        }
    });

    const { data: queryMediaGenre } = useQuery([`getGenre`], () => {
        return Axios.get(`//api.themoviedb.org/3/genre/${activeMediaType}/list?language=en&api_key=${apiKey}`).then((res) => {
            return res.data.genres;
        });
    });   

    useEffect(() => {
        setMatchNumber(Math.floor(Math.random() * 51) + 50);
        const numbers = [13, 16, 18];
        const randomIndex = Math.floor(Math.random() * numbers.length);
        setMinAge(numbers[randomIndex])
    }, [activeMedia]);

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', modalUpscaled);
        document.body.classList.toggle('h-screen', modalUpscaled);
    }, [modalUpscaled]);

    useEffect(() => {
        if (queryMediaGenre) {
            setAllGenres(queryMediaGenre);
        }
    }, [queryMediaGenre]);

    useEffect(() => {
        if (activeMedia) {
            refetch();
            if (queryMediaSimilar) {
                setSimilar(queryMediaSimilar);
            }
        }
    }, [activeMedia, queryMediaSimilar, refetch]);

    return (
        <>
        {activeMedia && (    
                <div ref={modalWrapperRef} className={`bg-neutral-900/50 transition-colors duration-1000 static inset-0 z-20 h-0 overflow-y-auto pointer-events-none ${modalUpscaled && '!h-screen !pointer-events-auto bg-neutral-900/90 !fixed'}`}>
                    <div ref={modalContainerRef} className={`py-8 transition-all duration-1000 will-change-[padding] flex justify-center ${modalUpscaled && 'py-[27.5rem]'}`}>
                        <div
                            ref={modalRef}
                            onMouseOver={() => { setIsMouseOver(true) }}
                            onMouseLeave={() => { setIsMouseOver(false) }}
                            className={`card__modal z-10 group after:shadow-[0px_0px_16px_rgba(0,0,0,0.5)] after:-z-[1] after:absolute after:rounded-md after:transition-opacity after:duration-500 after:will-change-[opacity, transform] after:inset-0 rounded-md fixed top-0 left-0 right-0 will-change-[opacity] text-xs transition-all duration-500 origin-center ${modalVisible || isMouseOver
                                    ? "scale-150 opacity-100 pointer-events-auto"
                                    : "scale-100 opacity-0 pointer-events-none"
                                } ${modalUpscaled ? "scale-150 !opacity-100 !static !w-[520px] pointer-events-auto" : ""}`}
                            style={modalPosition && { top: modalPosition.top, left: modalPosition.left, width: modalPosition.width, position: 'absolute' }}
                        >
                        <div className="flex flex-col">
                                <NavLink
                                    to={`/watch/${mediaURL}`}
                                    state={{ title: activeMedia.title || activeMedia.name, fetchVideosUrl: fetchVideosUrl }}
                                    className="card__video relative rounded-t-md overflow-hidden"
                                >
                                <div className="card__video__player bg-center bg-cover relative" style={{ backgroundImage: activeMedia.backdrop_path ? `url(https://image.tmdb.org/t/p/w780/${activeMedia.backdrop_path})` : 'none' }}>
                                    <div className="flex flex-col justify-end aspect-video bg-gradient-to-t from-black/75 via-black/10 to-black/0 p-4 text-base font-bold">
                                        <h2 className="opacity-00 hiddenn text-white">{activeMedia.title || activeMedia.name}</h2>
                                            <TrailerPlayer
                                                fetchVideosUrl={fetchVideosUrl}
                                            />
                                        {/* <pre>{JSON.stringify(x, null, 2)}</pre> */}
                                    </div>
                                </div>
                            </NavLink>
                            <div className="card__info p-4 rounded-b-md bg-neutral-900 flex flex-col gap-y-3">
                                <div className="card__info__user flex gap-x-2 justify-between">
                                    <div className="flex gap-x-2">
                                        <NavLink
                                            to={`/watch/${mediaURL}`}
                                            state={{ title: activeMedia.title || activeMedia.name, fetchVideosUrl: fetchVideosUrl }}
                                            className="text-neutral-900 w-7 h-7 flex items-center justify-center bg-white rounded-full transition-colors duration-300 hover:bg-neutral-300 hover:border-white"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                            </svg>
                                        </NavLink>
                                        <button
                                            className="text-white w-7 h-7 flex items-center justify-center border border-neutral-300 rounded-full transition-colors duration-300 hover:border-white hover:bg-neutral-800"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </button>
                                        <button
                                            className="text-white w-7 h-7 flex items-center justify-center border border-neutral-300 rounded-full transition-colors duration-300 hover:bg-neutral-800"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex gap-x-2">
                                        <button
                                            onClick={() => setModalUpscaled((modalUpscaled: boolean) => !modalUpscaled)}
                                            className="text-white w-7 h-7 flex items-center justify-center border border-neutral-300 rounded-full transition-colors duration-300 hover:border-white hover:bg-neutral-800"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="card__info__excerpt flex gap-x-2 items-center text-[11px]">
                                    <span className="font-bold text-[#46d369]">{matchNumber}% Match</span>
                                    <span className="text-neutral-400 border border-neutral-400 px-1 block font-semibold leading-tight">{minAge}+</span>
                                </div>
                                <div className="card__info__generes">

                                    {/* wrapper: genres */}

                                    {genres && (

                                        <ul className="flex flex-wrap text-neutral-300 font-semibold text-[11px]">
                                            {genres.map((genre: {name: string}, index: number) => {
                                                return (
                                                    <li
                                                        className='flex items-center last:after:hidden after:block after:bg-neutral-600 after:mx-2 after:h-1 after:w-1 after:rounded-full'
                                                        key={index}
                                                    >
                                                        {genre.name}
                                                    </li>
                                                )
                                            })}
                                        </ul>

                                    )}

                                    {/* wrapper: genres end */}

                                    {/* wrapper: overview */}

                                    {(activeMedia.overview && modalUpscaled) && (
                                        <div className='mt-8 font-normal text-white'>{activeMedia.overview}</div>
                                    )}

                                    {/* wrapper: overview end */}

                                    {/* wrapper: similiar media */}

                                    {(similar && modalUpscaled) && (

                                        <>
                                            <h3 className='mt-8 font-semibold text-md'>More like this:</h3>
                                            <ul className="grid grid-cols-4 gap-x-4 gap-y-8 !!hidden mt-4">
                                                { similar.map((item: any, index: number) => {
                                                   
                                                    const itemPoster = item?.poster_path;

                                                    if (!queryMediaSimilar) {
                                                        return null;
                                                    }

                                                    return (
                                                        <li key={index} className="col-span-1">
                                                            {item && (
                                                                    <div className="flex flex-col gap-y-2">
                                                                        {itemPoster ? (
                                                                            <img src={`//image.tmdb.org/t/p/w300/${itemPoster}`} alt={item?.title || item?.name} className='w-full h-auto rounded-md' />
                                                                        ) : (
                                                                            <div className="bg-neutral-800 w-full flex items-center p-2 justify-center aspect-[2/3] text-center text-neutral-600">No poster available</div>
                                                                        )}
                                                                        <h2 className='text-white font-semibold text-[0.625rem] leading-tight'>{item?.title || item?.name}</h2>
                                                                    </div>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </>

                                    )}

                                    {/* wrapper: similiar media end */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </div>    
            )}   
        </>
    )

}