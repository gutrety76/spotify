import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAllAlbums} from "../store/idOfPlayingTrackSlice";


export default async function HeroPlaylistSection() {

    const dispatch = useDispatch()
    const {allAlbums} = useSelector(state => state.TrackSlice)
    console.log(allAlbums)
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/v1/albumslist`).then(a => a.json())
    },[])

    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 place-items-center  mt-12">

            <div className="p-2 bg-[#121212]">
                <div>1232</div>
                <div></div>
            </div>
            <div className="w-[200px] h-[200px] bg-black">

            </div>
            <div className="w-[200px] h-[200px] bg-black">

            </div>
        </div>)
}