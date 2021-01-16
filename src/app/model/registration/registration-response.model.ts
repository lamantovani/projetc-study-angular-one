export class RegistrationResponse {
    identity: string;
    email: string;
    address: Address = new Address();
    // tslint:disable-next-line: variable-name
    company_name: string;
    // tslint:disable-next-line: variable-name
    trading_name: string;
    // tslint:disable-next-line: variable-name
    phone_number: string;
    // tslint:disable-next-line:variable-name
    responsible_name: string;
}

export class Address {
    complement: string;
    city: string;
    state: string;
    // tslint:disable-next-line:variable-name
    postal_code: string;
    // tslint:disable-next-line
    street_name: string;
    // tslint:disable-next-line: variable-name
    street_number: string;
}
