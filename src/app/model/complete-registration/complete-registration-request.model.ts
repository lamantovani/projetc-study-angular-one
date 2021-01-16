export class CompleteRegistrationRequest {
    // tslint:disable-next-line: variable-name
    external_registration_token: string;
    // tslint:disable-next-line: variable-name
    payment_registration_card_token: string;
    identity: string;
    // tslint:disable-next-line: variable-name
    plan_id: number;
    // tslint:disable-next-line: variable-name
    selected_payment_terminals: SelectedPaymentTerminal[] = new Array<SelectedPaymentTerminal>();
    email: string;
    address: Address;
    // tslint:disable-next-line: variable-name
    company_name: string;
    // tslint:disable-next-line: variable-name
    trading_name: string;
    // tslint:disable-next-line: variable-name
    phone_number: string;
    // tslint:disable-next-line: variable-name
    responsible_name: string;
}

export class SelectedPaymentTerminal {
    quantity: number;
    // tslint:disable-next-line:variable-name
    payment_terminal_id: number;
}

export class Address {
    complement: string;
    city: string;
    state: string;
    // tslint:disable-next-line: variable-name
    postal_code: string;
    // tslint:disable-next-line: variable-name
    street_name: string;
    // tslint:disable-next-line: variable-name
    street_number: string;
}


