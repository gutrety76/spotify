import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPlay, setPlayingTrack} from "../store/idOfPlayingTrackSlice";
import Image from "next/image"
import Navbarmobile from "./Navbarmobile";


export default function SectionForTracks() {
    const dispatch = useDispatch()
    const {idOfTrack, playing, allTracks} = useSelector(state => state.TrackSlice)
    const audioElement = useRef(null);
    useEffect(() => {
        if (playing) {
            audioElement.current.play();
        } else {
            audioElement.current.pause();
        }
    }, [playing])

    async function playAudio() {
        dispatch(setPlay(!playing))
    };

    async function pauseAudio() {
        dispatch(setPlay(false))
    };


    useEffect(() => {
        if (idOfTrack.id !== 0) {
            fetch(`http://127.0.0.1:8000/api/v1/tracks/${idOfTrack.id}/`)
                .then(response => response.blob())
                .then(blob => {
                    // convert the blob to a data URL
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = () => {
                        const dataUrl = reader.result;
                        // set the source of the audio element to the data URL
                        audioElement.current.src = dataUrl;
                        // play the audio

                        audioElement.current.play()

                    };
                });
        }


    }, [idOfTrack]); // only fetch the mp3 file once
    const [volume, setVolume] = useState(1);


    function handleVolumeChange(event) {
        setVolume(event.target.value);
        audioElement.current.volume = event.target.value

    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const formattedSeconds = String(seconds % 60).padStart(2, '0');
        return `${minutes}:${formattedSeconds}`;
    }

    function toSeconds(time) {
        const [minutes, seconds] = time.split(':');
        return Number(minutes) * 60 + Number(seconds);
    }

    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        if (idOfTrack.id) {
            setInterval(() => {
                if (formatTime(Math.round(audioElement.current.currentTime, 1)) !== idOfTrack.long) {
                    setCurrentTime(audioElement.current.currentTime)

                }
                if (formatTime(Math.round(audioElement.current.currentTime, 1)) == idOfTrack.long) {
                    nextTrack()
                }
            }, 1000)
        }
    }, [idOfTrack])

    function handleSeekChange(event) {
        pauseAudio()
        setCurrentTime(event.target.value);
    }

    function handleSeekMouseUp(event) {
        audioElement.current.currentTime = currentTime;
        playAudio()
    }

    function nextTrack() {


        console.log(allTracks.indexOf(idOfTrack) + 1)
        if (allTracks.length === allTracks.indexOf(idOfTrack) + 1) {
            dispatch(setPlayingTrack(allTracks[0]))
            dispatch(setPlay(true))
        } else {
            dispatch(setPlayingTrack(allTracks[allTracks.indexOf(idOfTrack) + 1]))
            dispatch(setPlay(true))
        }
    }

    function prevTrack() {

        console.log()

        if (!allTracks[allTracks.indexOf(idOfTrack) - 1]) {
            dispatch(setPlayingTrack(allTracks[allTracks.length - 1]))
            dispatch(setPlay(true))
        } else {
            dispatch(setPlayingTrack(allTracks[allTracks.indexOf(idOfTrack) - 1]))
            dispatch(setPlay(true))
        }
    }

    return (
        <div className="absolute bottom-0 md:bottom-0 left-0 pt-2 w-full bg-[#181818]">
            <div className="flex flex-col justify-between w-full ">
                <div className="flex items-center w-full  h-full ">
                    {idOfTrack.id &&
                        <div className="flex items-center md:mr-auto h-full justify-center min-w-[200px] md:w-[350px]">
                            <div className="flex ml-4 mr-auto w-fit p-1 items-center justify-center">
                                <Image src={`http://127.0.0.1:8000${idOfTrack.picture}`} height={55} width={55}
                                       alt={`лого ${idOfTrack.title}`}/>
                            </div>
                            <div
                                className="flex w-full md:mr-auto max-w-[300px] text-left ml-2 p-1 font-[600] text-white flex-col items-start justify-center">
                                <span className="mr-auto">{idOfTrack.title}</span>
                                <span className="mr-auto font-[500] text-[#B2B2B2]">{idOfTrack.author}</span>
                            </div>
                        </div>}
                    {!idOfTrack.id && <div className="flex items-center mr-auto h-full justify-center w-[350px]">

                    </div>}

                    <div className="flex flex-col items-center justify-center w-full md:w-2/4">
                        <div className="flex  items-center mb-2 justify-center">
                            {idOfTrack.id && <div onClick={prevTrack}>
                                <Image src={`/nextButton.svg`} width={45} height={45}
                                       className="mr-1 rotate-180 hover:cursor-pointer hover:scale-110 active:scale-100"/>

                            </div>}
                            {idOfTrack.id && <div onClick={playAudio}
                                                  className={`relative play-pause-button ${playing ? 'playing' : ''}`}>
                                <div className="absolute z-20">
                                    {playing ? <Image src={`/pauseButton.svg`} className={`rotate-[269deg]`} width={50}
                                                      height={50}/> :
                                        <Image className="pl-0.5 " src={`/playButton.svg`} width={50}
                                               height={50}/>
                                    }
                                </div>
                            </div>}
                            {idOfTrack.id && <div onClick={() => {
                                nextTrack()
                            }}>
                                <Image src={`/nextButton.svg`} width={45} height={45}
                                       className="ml-1 hover:cursor-pointer hover:scale-110 active:scale-100"/>
                            </div>}
                        </div>

                        <div className="md:flex w-full hidden items-center justify-center">
                            {idOfTrack.id && <input
                                type="range"
                                className="mx-6 py-1 w-full"
                                min={0}
                                max={audioElement.current.duration}
                                step={0.01}
                                value={currentTime}
                                onChange={handleSeekChange}
                                onMouseUp={handleSeekMouseUp}
                            />}
                        </div>
                    </div>
                    <div className="flex items-center h-full justify-center ml-auto  mr-2 hidden md:flex  md:w-1/4 ">
                        <audio ref={audioElement} volume={volume}
                        />
                        <div className="flex items-center h-full justify-center">
                            <div className="flex flex-col items-center justify-center">

                                {idOfTrack.id && <div className="text-white flex items-center  md:w-full justify-center"><Image
                                    src={`/volumeIcon.png`} width={40} height={40}/> <input type="range" className="w-full" min={0} max={1}
                                                                                            step={0.01} value={volume}
                                                                                            onChange={handleVolumeChange}/>
                                </div>}
                                <div></div>
                            </div>

                        </div>
                    </div>
                </div>

                <Navbarmobile/>
            </div>
        </div>
    );
}