import { useEffect, useState } from 'react'
import { requests } from '../Requests'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Modal } from '../components/Modal'
import { Row } from '../components/Row'
import { SectionHero } from '../components/SectionHero'

export const Homepage: React.FC = () => {

    const [isModalUpscaled, setIsModalUpscaled] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [modalPosition, setModalPosition] = useState<any>({
        top: '50vh',
        left: '50vw',
        width: 0
    });
    const [selectedMediaX, setSelectedMediaX] = useState<any>();
    const [selectedMediaType, setSelectedMediaType] = useState<string>("");
    const [myList, setMyList] = useState<any>([]);

    useEffect(() => {
        document.title = 'Your Entertainment Journey Starts Here'
    }, [])

    return (
        <>
            <Header />

            <SectionHero request={requests.fetchTrendingAll} slogan="Trending now" setSelectedMediaX1={setSelectedMediaX} setUpscaled={setIsModalUpscaled} setSelectedMediaTypeX={setSelectedMediaType} />
            <section className="flex flex-col gap-y-12 relative -mt-56 z-10 overflow-x-hidden">
                <Row request={requests.fetchTrendingAll} slogan="Trending now" setSelectedMediaX1={setSelectedMediaX} setIsModalVisible={setIsModalVisible} setModalPosition={setModalPosition} setSelectedMediaTypeX={setSelectedMediaType} />
                <Row request={requests.fetchActionMovies} slogan="Action Movies" type="movie" setSelectedMediaX1={setSelectedMediaX} setIsModalVisible={setIsModalVisible} setModalPosition={setModalPosition} setSelectedMediaTypeX={setSelectedMediaType} />
                <Row request={requests.fetchComedyTVShows} slogan="Comedy TV Shows" type="tv" setSelectedMediaX1={setSelectedMediaX} setIsModalVisible={setIsModalVisible} setModalPosition={setModalPosition} setSelectedMediaTypeX={setSelectedMediaType} />
                <Row request={requests.fetchHistoryMovies} slogan="History Movies" type="movie" setSelectedMediaX1={setSelectedMediaX} setIsModalVisible={setIsModalVisible} setModalPosition={setModalPosition} setSelectedMediaTypeX={setSelectedMediaType} />
                <Row request={requests.fetchMisteryTVShows} slogan="Mystery TV Shows" type="tv" setSelectedMediaX1={setSelectedMediaX} setIsModalVisible={setIsModalVisible} setModalPosition={setModalPosition} setSelectedMediaTypeX={setSelectedMediaType} />
                <Row request={requests.fetchSinceFictionMovies} slogan="Science Fiction Movies" type="movie" setSelectedMediaX1={setSelectedMediaX} setIsModalVisible={setIsModalVisible} setModalPosition={setModalPosition} setSelectedMediaTypeX={setSelectedMediaType} />
                <Row request={requests.fetchWarAndPoliticsTVShows} slogan="War & Politics TV Shows" type="tv" setSelectedMediaX1={setSelectedMediaX} setIsModalVisible={setIsModalVisible} setModalPosition={setModalPosition} setSelectedMediaTypeX={setSelectedMediaType} />
            </section>
            <Modal x={selectedMediaX && selectedMediaX} isVisible={isModalVisible} isUpscaled={isModalUpscaled} setUpscaled={setIsModalUpscaled} position={modalPosition} type={selectedMediaType} myList={myList} setMyList={setMyList} />

            <Footer />
        </>
    )
}