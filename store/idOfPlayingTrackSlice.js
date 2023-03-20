import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    idOfTrack: [


    ],
    counter: 0,
    playing: false,
    allTracks: [],
    allAlbums: [],
    selectedAlbum: []

}
export const TrackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {

        setPlayingTrack(state, action){
            state.idOfTrack = action.payload
        },
        plusCounter(state, action){
            state.counter = state.counter + 1
        },
        setPlay(state,action){
            state.playing = action.payload
        },
        setSelectedTrack(state,action){
            state.selectedTrack = action.payload
        },
        setAllTracks(state,action){
            state.allTracks = action.payload
        },
        setAllAlbums(state,action){
            state.allAlbums = action.payload
        },
        setSelectedAlbum(state,action){
            state.selectedAlbum = action.payload
        }


    }
})
export const {setPlayingTrack,setPlay,setAllTracks,setAllAlbums,setSelectedAlbum} = TrackSlice.actions

export default TrackSlice.reducer
