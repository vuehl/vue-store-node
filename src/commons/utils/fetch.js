// 這個是請求api的部分
// import { TOKEN_KEY } from "../constants/const";

let option = {
    mode: "cors",
    cache: "default"
};

function getCustomHeader (header = {}) {
    let result = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...header
    };

    // let token = tokenHelper.get();
    // if (token) {
    //     result[TOKEN_KEY] = token;
    // }

    return result;
}

function IsJsonString (str) {
    try {
        JSON.parse(str);
    } catch (error) {
        return false;
    }
    return true;
}

function fetchApi (url, option) {
    return fetch(url, option)
        .then(res => res.text())
        .then(text => {
            let res = IsJsonString(text) ? JSON.parse(text) : text;
            // if (res && res.status && res.status.code === invalidTokenCode) {
            //     invalidToken();
            // }
            return res;
        });
}

function get (url, fileHeader, header) {
    let op = Object.assign(
        {},
        option,
        {
            method: "GET",
            headers: getCustomHeader(header)
        },
        fileHeader
    );
    return fetchApi(url, op);
}

function post (url, pd, hd = {}) {
    let op = Object.assign({}, option, {
        method: "POST",
        body: typeof pd === "string" ? pd : JSON.stringify(pd),
        headers: getCustomHeader(hd)
    });
    return fetchApi(url, op);
}

export default {
    get,
    post
};
