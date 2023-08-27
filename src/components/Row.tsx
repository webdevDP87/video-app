import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';

import { Card } from '../components/Card';

type RowProps = {
    request: string;
    slogan: string;
    type?: string;
    setActiveMedia: any;
    setActiveMediaType: any;
    setModalPosition: any;
    setModalVisible: any;
};

export const Row = (props: RowProps) => {
    const {
        request,
        slogan,
        setActiveMedia,
        setActiveMediaType,
        setModalPosition,
        setModalVisible,
        type
    } = props;

    const { data } = useQuery([`get${slogan}`], () => {
        return Axios.get(request).then((res) => {
            
            {
                if (!type) {
                    res.data.results.shift().shift()
                }
            }
            return res.data.results;
        });
    });

    const swiperSlideRefs = useRef<Array<HTMLDivElement | null>>(
        data?.map(() => null) || []
    );

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col gap-y-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 focus-within:z-10 focus:z-10 hover:z-10 group">
            <h2 className="text-2xl text-neutral-200 font-bold">{slogan}</h2>
            <Swiper
                loop={true}
                slidesPerView={'auto'}
                spaceBetween={8}
                pagination={{
                    clickable: false,
                    dynamicBullets: true,
                }}
                navigation
                touchMoveStopPropagation
                simulateTouch={false}
                modules={[Navigation, Pagination]}
                className="overflow-visible"
            >
                {data?.map(
                    (media: {
                        id: number;
                        backdrop_path: string;
                        title: string;
                        name: string;
                        media_type: string;
                    },
                        index: number
                    ) => {
                        return (
                            index !== 0 && (
                                <SwiperSlide
                                    key={media?.id}
                                    className={`w-[calc((100%-0.0rem))] sm:w-[calc((100%-0.5rem)/2)] md:w-[calc((100%-1rem)/3)] lg:w-[calc((100%-1.5rem)/4)] xl:w-[calc((100%-2rem)/5)] 2xl:w-[calc((100%-2.5rem)/6)] }`}
                                >
                                    <div
                                    
                                        onMouseOver={() => {

                                            if (media) {
                                                setActiveMedia(media);

                                                let mediaType;

                                                if (type !== undefined) {
                                                    mediaType = type;
                                                } else {
                                                    mediaType = media.media_type;
                                                }

                                                // console.log(mediaType)
                                                setActiveMediaType(mediaType);

                                            }

                                            const element = swiperSlideRefs.current[index];
                                            if (element) {
                                                const boundingRect = element.getBoundingClientRect();
                                                setModalPosition({
                                                    top: boundingRect.top + scrollY,
                                                    left: boundingRect.left,
                                                    width: boundingRect.width
                                                });
                                                setModalVisible(true);
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setModalVisible(false);
                                        }}
                                        ref={(el) => {
                                            swiperSlideRefs.current[index] = el;
                                        }}
                                    >
                                        <Card media={media && media} />
                                    </div>
                                </SwiperSlide>
                            )
                        );
                    }
                )}
            </Swiper>
        </div>
    );
};
