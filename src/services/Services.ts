import Client from "./Client";
import User from "../services/User";

class ServicesContainer {
    httpClient!: Client;
    user!: User;

    init() {
        this.httpClient = new Client(process.env.REACT_APP_API_BASE_URL || "");
        this.user = new User(this.httpClient);


    }
}

const Services = new ServicesContainer();

export default Services;