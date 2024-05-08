import {createSlice} from '@reduxjs/toolkit'

const adminSlice=createSlice({
    name:'admin',
    initialState:{
        admin:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.admin=action.payload
        }

    }


})
export const{addUser}=adminSlice.actions
export default adminSlice.reducers