export const getParams = (path) => {
    let paramsArr = path.split('?')[1];
    let params = {};
    if (paramsArr.length > 0) {
        let arrPara = paramsArr.split('&');
        let arr;
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split("=");
            let value = arr[1].replace(/\+/g, '%20')
            params[arr[0]] = decodeURI(value);
        }
    }
    return params;
}