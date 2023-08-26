import { useRef } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

type TrailerPlayerProps = {
    fetchVideosUrl: string;
}

export const TrailerPlayer = ({ fetchVideosUrl }: TrailerPlayerProps) => {

    const playerRef = useRef<ReactPlayer | null>(null);

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
        );
    }

    if (data) {
        return (
            <div className="absolute inset-0">
                <ReactPlayer
                    ref={playerRef}
                    url={`https://www.youtube.com/watch?v=${data}&rel=0`}
                    onEnded={() => {console.log('end')}}
                    width='100%' height='100%' className="absolute inset-0"
                />
            </div>
        );
    }

    return null;
}