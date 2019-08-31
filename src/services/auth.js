import http from '../utils/axios'
export async function loginIn (params) {
    return http.post('/loginIn', params);
}
export async function getRouteInfo (params) {
    return http.post('/getRouteInfo', params);
}
export async function getRoleList (params) {
    return http.get('/getRoleList', params);
}