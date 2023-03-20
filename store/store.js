import { configureStore } from '@reduxjs/toolkit'

import TrackSlice from "./idOfPlayingTrackSlice";

export default configureStore({
    reducer: {
        TrackSlice,
    }
})