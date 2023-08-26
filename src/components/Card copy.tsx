import { useState } from 'react';
import { CardModal } from './CardModal';
import { NavLink } from 'react-router-dom'

type CardProps = {
    title: string
    cover: string
    id: number
    type: string
}

export const Card = (props: CardProps) => {

    const {id, title, cover, type} = props;
    const titler2 = props.title.replace(/\s/g, "-").toLowerCase()

    const [isMouseOver, setIsMouseOver] = useState<boolean>(false)

    const handleMouseOver = () : void => {
        setIsMouseOver(true);
    }
    const handleMouseLeave = () : void => {
        setIsMouseOver(false);
    }

    return (
        <>
            
            <NavLink to={`/watch/${titler2}`} state={{ title: title }} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave} className="card relative">

                <div className="card__body rounded-md overflow-hidden">
                    <div className="card__poster">
                        <div className="card__video__player aspect-video bg-neutral-800 text-white relative">
                            <img src={`//image.tmdb.org/t/p/w300/${cover}`} alt={title} className='w-full h-full ' />
                            <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/10 to-black/0">
                                <h2 className="text-lg font-semibold leading-tight">{title}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <CardModal isMouseOver={isMouseOver} id={id} type={type} titler={title} title={title} cover={cover} />

            </NavLink>
        </>
    )
}