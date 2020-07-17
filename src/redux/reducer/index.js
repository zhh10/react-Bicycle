import {switcMenu,actionTypes} from "../action"
import { satisfies } from "semver"


const initialState = "首页"
export default function reducer(state=initialState,action){
    switch(action.type){
        case actionTypes.switchMenu:
            return action.payload ;
        default :
            return state 
    }
}