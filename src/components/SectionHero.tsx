import { useEffect, useRef, useState } from "react"
import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { TrailerPlayer } from './TrailerPlayer';

type heroProps = {
    request: any,
    slogan: string,
    setUpscaled: any,
    setSelectedMediaX1: any,
    setSelectedMediaTypeX: any;
}

const apiKey: string = '8bd571e7945e3a610f397bff1b4b6727';

export const SectionHero = (props: heroProps) => {

    const { request, slogan, setUpscaled, setSelectedMediaX1, setSelectedMediaTypeX } = props;

    let mediaURL, fetchVideosUrl

    const { data } = useQuery([`get${slogan}`], () => {
        return Axios.get(request).then((res) => {
            // res.data.results.shift();
            return (res.data.results)
        });
    });

    mediaURL = data ? (data[0].title || data[0].name).replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase() : '';
    fetchVideosUrl = data ? `//api.themoviedb.org/3/${data[0].media_type}/${data[0].id}/videos?api_key=${apiKey}` : '';

    const titleWrap = useRef<HTMLDivElement>(null);
    const sloganWrap = useRef<HTMLDivElement>(null);
    const [sloganWrapHeight, setSloganWrapHeight] = useState<number | null>(null);

    useEffect(() => {
        if (sloganWrap.current !== null) {
            const height = sloganWrap.current.clientHeight;
            setSloganWrapHeight(height);
        }
    }, [data]);

    const [count, setCount] = useState<number>(5);

    const onComplete = () : void => {
        // console.log('gotowe');
        if(sloganWrap.current) {
            if(titleWrap.current) {
                titleWrap.current.style.transform = `translateY(${sloganWrapHeight}px) scale(0.75)`;
            }
            sloganWrap.current.style.transform = `translateY(${sloganWrapHeight}px) scale(0.75)`;
            sloganWrap.current.style.opacity = "0"
        }
    }

    useEffect(() => {
        if(sloganWrapHeight) {
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(timer);
            onComplete();
        }

        return () => {
            clearInterval(timer);
        };
    }}, [count, onComplete]);

    return (
        <>
        {data && (
            <div className="aspect-video bg-cover bg-center relative before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1/6 before:bg-gradient-to-t before:from-20% before:via-60% before:from-neutral-900 before:via-neutral-900/80 before:to-neutral-900/0 after:bg-gradient-to-r after:from-0% after:via-30% after:from-neutral-900 after:via-neutral-900/50 after:to-neutral-900/0 after:bottom-0 after:left-0 after:opacity-75 after:absolute after:right-[25%] after:top-0 after:pointer-events-none before:pointer-events-none" style={{ backgroundImage: `url(//image.tmdb.org/t/p/original/${data[0].backdrop_path})`}}>
                <TrailerPlayer fetchVideosUrl={fetchVideosUrl} />
                <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 min-h-full flex flex-col justify-end pb-56 relative z-10 pointer-events-none">
                    <div className="flex flex-col gap-y-12 py-32 w-1/3">
                        <div className="flex flex-col overflow-hidden">
                            <div ref={titleWrap} className="will-change-transform transition-transform origin-bottom-left duration-500">
                                <h1 className={(count === 0 ? "text-white" : "text-white") + " text-7xl font-extrabold"}>{data[0].title || data[0].name}</h1>
                            </div>
                            <div ref={sloganWrap} className="transition-all duration-500 will-change-[transform, opacity] origin-bottom-left pt-8">
                                <p className="text-white text-xl font-medium">{data[0].overview} {data[0].media_type}</p>
                            </div>
                        </div>
                        {/* <pre>{JSON.stringify(data[0], null, 2)}</pre> */}
                        <div className="flex flex-wrap gap-x-4">
                            <NavLink
                                to={`/watch/${mediaURL}`}
                                    state={{ title: data[0].title || data[0]?.name, fetchVideosUrl: fetchVideosUrl }}
                                className="pointer-events-auto flex items-center gap-x-3 gap-y-1 flex-wrap text-neutral-900 font-bold text-lg px-7 py-3 transition-colors hover:bg-white/75 bg-white rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                                <span className="block">Play</span>
                            </NavLink>
                            <button
                                onClick={() => {
                                    setUpscaled((isUpscaled: boolean) => !isUpscaled),
                                    setSelectedMediaX1(data[0]),
                                    setSelectedMediaTypeX(data[0].media_type);
                                }}
                                className="pointer-events-auto flex items-center gap-x-3 gap-y-1 flex-wrap text-white font-bold text-lg px-7 py-3 transition-colors hover:bg-neutral-500/40 bg-neutral-500/70 rounded-md"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <span className="block">More info</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ) }
        </>
    )
}