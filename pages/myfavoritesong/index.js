import {useEffect, useState} from "react";
import axios from "axios";
import Image from "next/image"
import Skeleton  from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css"
import {useDispatch, useSelector} from "react-redux";
import {setAllTracks, setPlay, setPlayingTrack, TrackSlice} from "../../store/idOfPlayingTrackSlice";
import Equalizer from "../../components/equilizer/equilizer";
export default function Index() {


    const dispatch = useDispatch()
    const {idOfTrack, playing, allTracks, selectedAlbum} = useSelector(state => state.TrackSlice)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/v1/album/Мой%20плейлист");
                const json = await response.json();
                console.log(json)
                dispatch(setAllTracks(json.tracks))
            } catch (error) {
                console.error(error);
            }

        }
        fetchData();
    }, []);
    return (<div className="flex flex-col items-center justify-start w-full">

        <div className="mt-8 font-bold text-4xl text-white">Любимые треки</div>

        <div className="grid w-full gap-3 overflow-y-auto  max-h-[90vh] grid-cols-1 md:p-8">
        {allTracks && allTracks.map((content, index) => {
            async function setPlayer(){
                if(idOfTrack.id == content.id && playing){

                    dispatch(setPlay(false))

                }
                if (idOfTrack.id == content.id && !playing){

                    dispatch(setPlay(true))
                }
                if (idOfTrack.id !== content.id) {

                    dispatch(setPlayingTrack(content))

                    dispatch(setPlay(true))
                }

        }
            return (
                <div key={index} onClick={()=>{
                    setPlayer()
                }} className="w-full cursor-pointer group hover:bg-[#232323] rounded duration-75 flex items-center justify-start h-[50px] text-white font-bold">
                    <div  className="group-hover:flex hidden md:w-[5%] flex items-center justify-center" role={`number`}>
                        { content.id === idOfTrack.id && playing ? <Image src={`/pauseButton.svg`} width={30} height={30}/>: <Image src={`/playButton.svg`} width={30} height={30}/> }
                    </div>
                    <div onClick={()=>{
                        setPlayer()
                    }} className="group-hover:hidden  flex  md:w-[5%] flex items-center justify-center" role={`number`}>
                        {content.id === idOfTrack.id && playing ? <Equalizer/> : index + 1}
                    </div>


                    <div className="md:w-[5%] flex items-center justify-center" role={`picture`}>
                        <Image src={`http://127.0.0.1:8000${content.picture}`} alt={`123`} width={40} height={40}/>
                    </div>
                    <div className="flex md:w-[40%] text-[16px] flex-col items-center  justify-start" role={`artist song name`}>
                        <div className=" ml-4 mr-auto">
                            {content.title}
                        </div>
                        <div className="ml-4 font-medium mr-auto">
                            {content.author}
                        </div>
                    </div>
                    <div className="ml-auto flex items-center justify-center mr-5" role={`time of a song`}>
                        {content.long}
                    </div>
                </div>

            )
        })}


        {/*<TracksSection/>*/}
    </div></div>)
}