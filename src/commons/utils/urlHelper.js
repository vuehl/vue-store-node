import { URL_CONFIG_PATH, URL_KEY } from "../constants/const";
import Fetch from "./fetch";

const urlconver = (json, developeMode) => {
    let result = {};
    for (let keys of json) {
        if (!json.hasOwnProperty(keys)) {
            return;
        }
        let serverItem = json[keys];
        let type = serverItem.type;
        let path = serverItem.path;
        let ipAddress = null;
        if (developeMode) {
            ipAddress = serverItem.Address;
        } else {
            let protocol =
                type === "api"
                    ? window.location.protocol
                    : window.location.protocol === "http:" ? "ws:" : "wss:";
            ipAddress = `${protocol}//${window.location.host}`;
        }

        path = path.startsWith("/") ? path.substring(1, path.length) : path;
        path = path.endsWith("/") ? path.substring(0, path.length - 1) : path;

        let template = `${ipAddress}/${path}`;

        for (let key in serverItem.URL) {
            if (!serverItem.URL.hasOwnProperty(key)) {
                return;
            }

            let urls = serverItem.URL[key];
            urls = urls.startsWith("/") ? urls.substring(1, urls.length) : urls;
            result[key] = `${template}/${urls}`;
        }
    }
    return result;
};

const urlsFunc = async () => {
    let urls = {};
    for (let i of URL_CONFIG_PATH) {
        let url = await Fetch.get(i);
        urls = Object.assign(urls, url);
    }
    return urls;
};

const getUrl = async (urlProvider = urlconver) => {
    let data = sessionStorage.getItem(URL_KEY);
    if (data) {
        return Promise.resolve(JSON.parse(data));
    }

    let urls = await urlsFunc();
    // let settingsConfig = sessionStorage.getItem('ISC-SETTINGS') && JSON.parse(sessionStorage.getItem('ISC-SETTINGS'));
    // let newUrls = urlProvider(urls, settingsConfig && settingsConfig.developeMode);
    let newUrls = urlProvider(urls, true);
    sessionStorage.setItem(URL_KEY, JSON.stringify(newUrls));
    return Promise(newUrls);
};

export default getUrl;
