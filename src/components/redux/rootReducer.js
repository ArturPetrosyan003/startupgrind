import { combineReducers } from "redux";
import { OPEN_LOGIN_MENU, CLOSE_LOGIN_MENU, OPEN_REG_MENU, CLOSE_REG_MENU } from "./types";

const initialState = {
    loginOpen: false,
    regOpen: false
}

export const loginMenuReducer = (state = initialState.loginOpen, action) => {
    switch (action.type) {
        case OPEN_LOGIN_MENU:
            return state = true
        case CLOSE_LOGIN_MENU:
            return state = false
        default:
            return state;
    }
}

export const regMenuReducer = (state = initialState.regOpen, action) => {
    switch (action.type) {
        case OPEN_REG_MENU:
            return state = true
        case CLOSE_REG_MENU:
            return state = false
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    login: loginMenuReducer,
    reg: regMenuReducer
})