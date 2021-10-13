import { get } from 'axios';

export const getBase64 = async (url) => {
    return await get(url, { responseType: 'arraybuffer', crossDomain: true }).then((response) =>
        Buffer.from(response.data, 'binary').toString('base64')
    )
}

export const emailMask = (email, mask) => {
    mask = mask || '*';
    return email.replace(/^(.)(.*)(.@.*)$/, function (_, a, b, c) {
        return a + b.replace(/./g, mask) + c;
    });
}
