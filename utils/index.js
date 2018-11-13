import socket from "socket.io-client";

export const returnApiUrl = (symbol, type = "quote") => `https://api.iextrading.com/1.0/stock/${symbol}/${type}`;

export const makeRequest = ({ url, method, headers, data }, type) => {
    return new Promise(async (resolve, reject) => {
        headers = { ...headers, Accept: "application/json" }
        try {
            let res = await fetch(url, {
                method,
                headers: new Headers(headers),
                body: data
            });

            if(res.status == 200) {
                resolve(res.json());
            }else if(res.status == 404){
                resolve({ error: true, message: "Unknown symbol." });
            }else {
                resolve({ error: true, message: "An error has ocurred." });
            }
        }catch(err) {
            reject(err)
        }
    });
}

export const waitTime = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("success");
        }, time);
    });
}

export const socketConnection = () => {
    return socket("https://ws-api.iextrading.com/1.0/tops");
}