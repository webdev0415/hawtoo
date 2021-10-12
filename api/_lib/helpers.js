import { get } from 'axios';

const getBase64 = async (url) => {
    return await get(url, { responseType: 'arraybuffer', crossDomain: true }).then((response) =>
        Buffer.from(response.data, 'binary').toString('base64')
    )
}

export {
    getBase64,
}