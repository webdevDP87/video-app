import { NavLink } from 'react-router-dom'

type CardProps = {
    media: {
        backdrop_path: string,
        title: string,
        name: string,
    }
}

export const Card = (props: CardProps) => {

    const {media} = props;
    const mediaURL = media && (media?.title || media?.name)?.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase();

    return (
        <>
            
            <NavLink to={`/watch/${mediaURL}`} state={{ title: media?.title || media?.name }} className="card relative">

                <div className="card__body rounded-md overflow-hidden">
                    <div className="card__poster">
                        <div className="card__video__player aspect-video bg-neutral-800 text-white relative">
                            <img src={`//image.tmdb.org/t/p/w300/${media?.backdrop_path}`} alt={media?.title || media?.name} className='w-full h-full ' />
                            <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-black/0">
                                <h2 className="text-lg font-semibold leading-tight">{media?.title || media?.name}</h2>
                            </div>
                        </div>
                    </div>
                </div>

            </NavLink>
        </>
    )
}