import Client from "./Client";

export default class User {
    readonly httpClient: Client;
    route: string = "/user";

    constructor(httpClient: Client) {
        this.httpClient = httpClient;
    }

    async createUser(personalData: {
        firstName: string;
        lastName: string;
        street: string;
        houseNr: string;
        zipCode: string;
        city: string;
    }) {
        return await this.httpClient.post("/create", {
            personalData
        }).then((body) => body);
    }


}

export const fetchRandomUser = () => {
    return async () => {
        try {
          const result =  await fetch("https://randomuser.me/api/").then((response) => response.json())
            console.log(result)
            return Promise.resolve(result)
        } catch (error) {
            Promise.reject(error)
        }
    }
}

