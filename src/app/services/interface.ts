export class registrationModel {
    firstName!: String;
    lastName!: String;
    email!: String;
    password!: String;
}

export class loginModel {
    email!: String;
    password!: String;
}

export interface partyModel {
    name: string;
    sku: string;
    alias: string;
    type: string;
    email: string;
    contactNo: string;
    adharcardNo: string;
    pancardNo: string;
    gstNo: string;
    address: string;
    state: string;
    city: string;
}

export interface productModel {
    name: string;
    sku: string;
    alias: string;
    description: string;
    purchaseRate: string;
    sellRate: string;
    sizes: Array<[]>;
    colors: Array<[]>;
}

export interface responseProductModel {
    body: object;
    headers: any;
    ok: boolean;
    status: number;
    statusText: string;
    type: number;
    url: string;

}