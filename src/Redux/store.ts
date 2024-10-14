import { configureStore } from "@reduxjs/toolkit";
import { UserInfo } from "../models/user.model";
import { AuthInfo } from "../models/auth.model";
import userSliceReducer from "./States/user";
import authSliceReducer from "./States/auth";

export interface AppStore{
    user: UserInfo;
    auth: AuthInfo;
}

export default configureStore<AppStore>({
    reducer:{
        user: userSliceReducer,
        auth: authSliceReducer
    }
})