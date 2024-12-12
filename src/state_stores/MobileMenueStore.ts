import { configureStore } from '@reduxjs/toolkit'
import Mobile_Menue_Slice from './Mobile_Menue_Slice'

export const store=configureStore({
    reducer:{
        Mobile_Menue_Slice
    }
})

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch= typeof store.dispatch;