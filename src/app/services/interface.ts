
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
export interface dataResponseParty {
    vendors: object;
    totalRecords: number;
}

export interface responsePartyModel {
    data: dataResponseParty;
    status: boolean;
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

export interface dataResponseProduct {
    products: object;
    totalRecords: number;
}

export interface responseProductModel {
    data: dataResponseProduct;
    status: boolean;
}

export interface orderModel {

    colors: Array<any>;
    date: string;
    discount: string;
    name: string;
    orderId: number;
    partySku: string;
    paymentMode: string;
    paymentStatus: string;
    productSku: string;
    quantity: number
    rate: number
    shippingMode: string;
    sizes: Array<any>;
    total: number;
}
export interface dataResponseOrder {
    order: object;
    buyerPartySKU: Array<object>;
    productSKU: Array<object>;
    sellerPartySKU: Array<object>;
    totalRecords: number;
}

export interface responseOrderModel {
    data: dataResponseOrder;
    status: boolean;
}

export interface ViewModel {
    data: object;
    status: boolean;
}

export interface courierModel {
    companyName: string;
    fromAddress: object;
    orderId: string;
    paymentMode: string;
    shippingCharge: string;
    toAddress: object;
    trackingId: string;
}

export interface dataResponseCourier {
    courier: object;
    totalRecords: number;
    orderId: Array<object>;
}

export interface responseCourierModel {
    data: dataResponseCourier;
    status: boolean;
}