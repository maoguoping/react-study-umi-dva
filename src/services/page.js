import http from '../utils/axios'
export async function getHeaderMenuList (params) {
    return http.get('/getHeaderMenuList', params);
}
export async function getSideMenuList (params) {
    return http.get('/getSideMenuList', params);
}