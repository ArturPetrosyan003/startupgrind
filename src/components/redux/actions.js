import { OPEN_LOGIN_MENU, CLOSE_LOGIN_MENU, OPEN_REG_MENU, CLOSE_REG_MENU } from "./types";

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