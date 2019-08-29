export function setLocalStorage(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
