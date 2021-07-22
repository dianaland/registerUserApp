import {httpClient} from "./httpClient";

export default class Client {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    get(path: string, params?: {}): Promise<any> {
        return this.request(httpClient().get(path, {params}));
    }

    post(path: string, body: {} = {}): Promise<any> {
        return this.request(httpClient().post(path, body));
    }

    put(path: string, body: {} = {}): Promise<any> {
        return this.request(httpClient().put(path, body));
    }

    request(method: any) {
        return new Promise<any>((resolve, reject) =>
            method
                .then((response: any) => resolve(response.data))
                .catch((error: any) => reject({error}))
        );
    }
}

