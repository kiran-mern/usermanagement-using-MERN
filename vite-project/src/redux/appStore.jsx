import { configureStore } from "@reduxjs/toolkit";
import adminReducer from './adminSlice'

const appStore=configureStore({
    admin:{
        admin:adminReducer
    }

})
export default appStore