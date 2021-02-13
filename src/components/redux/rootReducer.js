import { combineReducers } from "redux";
import { OPEN_LOGIN_MENU, CLOSE_LOGIN_MENU, OPEN_REG_MENU, CLOSE_REG_MENU, OPEN_STARTUP_MENU, CLOSE_STARTUP_MENU, OPEN_STARTUP_POPUP, CLOSE_STARTUP_POPUP } from "./types";

const initialState = {
    loginOpen: false,
    regOpen: false,
    startupPopup: {
        data: {},
        open: false
    },
    startupDialogOpen: false
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

export const startupMenuReducer = (state = initialState.startupPopup, action) => {
    switch (action.type) {
        case OPEN_STARTUP_MENU:
            return state = {
                data: action.payload.data,
                open: true
            }
        case CLOSE_STARTUP_MENU:
            return state = {
                open: false
            }
        default:
            return state;
    }
}

export const startupDialogReducer = (state = initialState.startupDialogOpen, action) => {
    switch (action.type) {
        case OPEN_STARTUP_POPUP:
            return state = true
        case CLOSE_STARTUP_POPUP:
            return state = false
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    login: loginMenuReducer,
    reg: regMenuReducer,
    startup: startupMenuReducer,
    startupDialog: startupDialogReducer
})