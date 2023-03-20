import HeroPlaylistSection from "./HeroPlaylistSection";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAllAlbums} from "../store/idOfPlayingTrackSlice";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    const date = new Date()
    const hour = date.getHours();
    let greeting


    if (hour >= 6 && hour < 12) {
        greeting = "Доброе утро";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Добрый день";
    } else if (hour >= 17 && hour < 22) {
        greeting = "Добрый вечер";
    } else {
        greeting = "Доброй ночи";
    }
    const dispatch = useDispatch()
    const {allAlbums} = useSelector(state => state.TrackSlice)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v1/albumslist`).then(a => a.json()).then((a) => {
            dispatch(setAllAlbums(a))
        })
    }, [])


    return (<div className="overflow-y-scroll h-screen">
        <div className=" w-full p-4 mx-auto flex flex-col items-start ">
            <div className="text-white w-full flex flex-col items-center justify-center">
                <div className="mt-12 mr-auto  text-3xl font-bold">
                    <span>{greeting}</span>
                </div>

                <div className=" w-full mb-12  py-3 mt-5 rounded-2xl">
                    <div><span className="text-xl font-bold">Новогодние, рождественские подборки</span></div>
                    <div
                        className="grid mt-5  grid-cols-1 md:grid-cols-3 2xl:grid-cols-5 gap-4 gap-y-8 place-items-center md:place-items-start  ">

                        {allAlbums && allAlbums.map((content, index) => {

                            return (<>{content.type === "Новогодний" &&
                                <Link href={`album/${content.title}`}>
                                    <div
                                        className="p-5 h-[370px] cursor-pointer hover:scale-105 active:scale-100 duration-75 bg-[#252525] rounded">
                                        <div className="relative"><Image className="rounded " src={content.picture}
                                                                         width={250} height={200}/></div>
                                        <div
                                            className="text-white mt-4 text-xl font-bold min-h-[30px]">{content.title}</div>
                                        <div
                                            className="text-[#A7A7A7] mt-1 mb-2 font-medium">{content.authors.map((c, index) => {
                                            console.log(content.authors.length, index)
                                            return <>{content.authors.length == index + 1 ? `${c.name}` : `${c.name}, `}</>
                                        })}</div>

                                    </div>
                                </Link>}</>)
                        })}
                    </div>
                </div>
                <div className="border w-full mb-40 p-4 py-12  rounded-2xl">
                    <div><span className="text-2xl font-bold">Подборки по настроению</span></div>
                    <div
                        className="grid mt-5  grid-cols-1 md:grid-cols-3 2xl:grid-cols-5 gap-4 gap-y-8 place-items-center md:place-items-start  ">

                        {allAlbums && allAlbums.map((content, index) => {

                            return (<>{content.type === "По настроению" &&
                                <Link href={`album/${content.title}`}>
                                    <div
                                        className="p-5 h-[370px] cursor-pointer hover:scale-105 active:scale-100 duration-75 bg-[#252525] rounded">
                                        <div className="relative"><Image className="rounded " src={content.picture}
                                                                         width={250} height={200}/></div>
                                        <div
                                            className="text-white mt-4 text-xl font-bold min-h-[30px]">{content.title}</div>
                                        <div
                                            className="text-[#A7A7A7] mt-1 mb-2 font-medium">{content.authors.map((c, index) => {
                                            console.log(content.authors.length, index)
                                            return <>{content.authors.length == index + 1 ? `${c.name}` : `${c.name}, `}</>
                                        })}</div>

                                    </div>
                                </Link>}</>)
                        })}
                    </div>
                </div>
            </div>
            {/*<div className="w-5/6  flex items-center justify-center bg-black ">*/}
            {/*    123*/}
            {/*</div>*/}

        </div>
    </div>)
}