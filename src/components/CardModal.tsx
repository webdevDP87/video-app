import { useQuery } from "@tanstack/react-query"
import { useMemo, useState,  useRef } from "react"
import Axios from 'axios'
import ReactPlayer from 'react-player/youtube'

// import { requests } from "../Requests"

type CardModalProps = {
    type: string
    id: number
    title: string,
    titler: string,
    cover: string,
    isMouseOver: boolean
}

type TrailerPlayerProps = {
    fetchVideosUrl: string;
};


const TrailerPlayer = ({ fetchVideosUrl }: TrailerPlayerProps) => {
    const { data, isLoading } = useQuery<string | null>(['getTrailer', fetchVideosUrl], async () => {
        const response = await Axios.get(fetchVideosUrl);
        const trailerObject = response.data.results.find((obj: { site: string; key: string }) => obj.site === 'YouTube');
        if (trailerObject) {
            const trailerKey = trailerObject.key;
            return trailerKey;
        } else {
            return null;
        }
    });

    if (isLoading) {
        return (
            <h1>loading.......</h1>
        )
    }

    const playerRef = useRef(null);
    const [isStarted, setIsStarted] = useState(false);

    const handlePlay = () => {
        if (!isStarted) {
            setIsStarted(true);
        }
    };

    if (data) {
        return (
            <ReactPlayer ref={playerRef} url={`http://www.youtube.com/watch?v=${data}`} playing={isStarted}
                muted={!isStarted}
                autoPlay
                onPlay={handlePlay} width='100%' height='100%' className="absolute inset-0" />
        );
    }

    return null;
};

export const CardModal = (props: CardModalProps) => {

    const {id, title, titler, cover, isMouseOver} = props

    const matchNumber: number = useMemo(() => Math.floor(Math.random() * 51) + 50, []);
    const minAge: number = useMemo(() => {
        const numbers = [13, 16, 18];
        const randomIndex = Math.floor(Math.random() * numbers.length);
        return numbers[randomIndex];
    }, []);

    
    const mediaType = (props.type === 'movie') ? 'movie' : 'tv';

    const fetchVideosUrl = `//api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=8bd571e7945e3a610f397bff1b4b6727`

    return (
        <div className={(isMouseOver ? "scale-150 opacity-100 after:opacity-100 z-20 pointer-events-auto " : "scale-100 opacity-0 after:opacity-0 z-10 pointer-events-none ") + " card__modal group after:shadow-[0px_0px_16px_rgba(0,0,0,0.5)] after:-z-[1] after:absolute after:rounded-md after:transition-opacity after:duration-500 after:will-change-[opacity] after:inset-0 rounded-md absolute top-0 left-0 right-0 will-change-[transform, opacity] text-xs transition-all duration-500 origin-center"}>
            <div className="flex flex-col">
                <div className="card__video relative rounded-t-md overflow-hidden">
                    <div className="card__video__player aspect-video bg-neutral-800 p-4 text-base font-bold bg-center bg-cover relative" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w780/${cover})`}}>
                        <h2 className="opacity-0 hidden">{title} {titler}</h2>
                        {isMouseOver && <TrailerPlayer fetchVideosUrl={fetchVideosUrl} />}
                    </div>
                </div>
                <div className="card__info p-4 rounded-b-md bg-neutral-900 flex flex-col gap-y-3">
                    <div className="card__info__user flex gap-x-2 justify-between">
                        <div className="flex gap-x-2">
                            <button className="text-neutral-900 w-7 h-7 flex items-center justify-center bg-white rounded-full transition-colors duration-300 hover:bg-neutral-300 hover:border-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <button className="text-white w-7 h-7 flex items-center justify-center border border-neutral-300 rounded-full transition-colors duration-300 hover:border-white hover:bg-neutral-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                
                            </button>
                            <button className="text-white w-7 h-7 flex items-center justify-center border border-neutral-300 rounded-full transition-colors duration-300 hover:bg-neutral-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex gap-x-2">
                            <button className="text-white w-7 h-7 flex items-center justify-center border border-neutral-300 rounded-full transition-colors duration-300 hover:border-white hover:bg-neutral-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="card__info__excerpt flex gap-x-2 items-center text-[11px]">
                        <span className="font-bold text-[#46d369]">{matchNumber}% Match</span>
                        <span className="text-neutral-400 border border-neutral-400 px-1 block font-semibold leading-tight">{minAge}+</span>
                    </div>
                </div>
            </div>
        </div>
    )
}