import {
    OPEN_LOGIN_MENU,
    CLOSE_LOGIN_MENU,
    OPEN_REG_MENU,
    CLOSE_REG_MENU,
    OPEN_STARTUP_MENU,
    CLOSE_STARTUP_MENU,
    OPEN_STARTUP_POPUP,
    CLOSE_STARTUP_POPUP,
    OPEN_PROFILE_POPUP,
    CLOSE_PROFILE_POPUP
} from "./types";

export function openLoginMenu() {
    return {
        type: OPEN_LOGIN_MENU
    }
}
export function closeLoginMenu() {
    return {
        type: CLOSE_LOGIN_MENU
    }
}
export function openRegMenu() {
    return {
        type: OPEN_REG_MENU
    }
}
export function closeRegMenu() {
    return {
        type: CLOSE_REG_MENU
    }
}
export function openStartupMenu(data=null) {
    return {
        type: OPEN_STARTUP_MENU,
        payload: {
            data: data
        }
    }
}
export function closeStartupMenu() {
    return {
        type: CLOSE_STARTUP_MENU
    }
}
export function openStartupPopup() {
    return {
        type: OPEN_STARTUP_POPUP
    }
}
export function closeStartupPopup() {
    return {
        type: CLOSE_STARTUP_POPUP
    }
}
export function openEditPopup() {
    return {
        type: OPEN_PROFILE_POPUP
    }
}
export function closeEditPopup() {
    return {
        type: CLOSE_PROFILE_POPUP
    }
}