
export interface PersonalData {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    houseNr: string;
    zipCode: string;
    city: string;
}

/**
 * Domain entity class User
 * which represents a user account
 */
export default class User {
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    houseNr: string;
    zipCode: string;
    city: string;


    constructor(obj: any) {
        this.firstName = obj.firstName || "";
        this.lastName = obj.lastName || "";
        this.email = obj.email|| "";
        this.street = obj.street|| "";
        this.houseNr = obj.houseNr|| "";
        this.zipCode = obj.zipCode|| "";
        this.city = obj.city|| "";
    }

}
