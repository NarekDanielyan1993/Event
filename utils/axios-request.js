import axios from 'axios';

const api = axios.create({
    timeout: 50000,
});

export const apiRequest = (
    method,
    url,
    body = null,
    headers = null,
    options = null
) => {
    const config = {
        method: method.toLowerCase(),
        url,
        ...(body && { data: body }),
        headers: {
            ...(headers && { headers }),
        },
        ...(options && { options }),
    };

    return api.request(config);
};
