import { useEffect, useState } from 'react'
import { requests } from '../Requests'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Modal } from '../components/Modal'
import { Row } from '../components/Row'
import { SectionHero } from '../components/SectionHero'

export const Homepage: React.FC = () => {

    const [activeMedia, setActiveMedia] = useState<{title: string, name: string, id: number, genre_ids: number[], backdrop_path: string, overview: string,}>();
    const [activeMediaType, setActiveMediaType] = useState<string>("");
    const [modalPosition, setModalPosition] = useState<{top: string, left: string, width: string}>({
        top: '50vh',
        left: '50vw',
        width: '0'
    });
    const [modalUpscaled, setModalUpscaled] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    
    const rows: {request: string; slogan: string; type?: string;}[] =  [
        {
            request:   'fetchTrendingAll',
            slogan:     'Trending now'
        },
        {
            request:    'fetchActionMovies',
            slogan:     'Action Movies',
            type:       'movie'
        },
        {
            request:    'fetchComedyTVShows',
            slogan:     'Comedy TV Shows',
            type:       'tv'
        },
        {
            request:   'fetchHistoryMovies',
            slogan:     'History Movies',
            type:       'movie'
        },
        {
            request:    'fetchMisteryTVShows',
            slogan:     'Mystery TV Shows',
            type:       'tv'
        },
        {
            request:    'fetchSinceFictionMovies',
            slogan:     'Science Fiction Movies',
            type:       'movie'
        },
        {
            request:    'fetchWarAndPoliticsTVShows',
            slogan:     'War & Politics TV Shows',
            type:       'tv'
        }

    ]

    useEffect(() => {
        document.title = 'Your Entertainment Journey Starts Here';
    }, [])

    return (
        <>
            <Header />

            <SectionHero
                request={requests.fetchTrendingAll}
                slogan="Trending now"
                setActiveMedia={setActiveMedia}
                setActiveMediaType={setActiveMediaType}
                setModalUpscaled={setModalUpscaled}
            />

            <section className="flex flex-col gap-y-12 relative -mt-56 z-10 overflow-x-hidden">
                {
                    rows.map((item, index) => {
                        const {request, slogan, type} = item;
                        return (
                            <Row
                                key={index}
                                request={requests[request]}
                                slogan={slogan}
                                type={type}
                                setActiveMedia={setActiveMedia}
                                setActiveMediaType={setActiveMediaType}
                                setModalPosition={setModalPosition}
                                setModalVisible={setModalVisible}
                            />
                        )
                    })
                }
            </section>

            <Modal
                activeMedia={activeMedia && activeMedia}
                activeMediaType={activeMediaType}
                modalVisible={modalVisible}
                modalUpscaled={modalUpscaled}
                modalPosition={modalPosition}
                setModalUpscaled={setModalUpscaled}
            />

            <Footer />
        </>
    )
}