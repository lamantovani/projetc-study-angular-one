export class PaymentTerminalsResponse {
    content: Content[];
    // tslint:disable-next-line:variable-name
    total_pages: number;
    // tslint:disable-next-line:variable-name
    total_elements: number;
}

export class Content {
    id: string;
    alias: string;
    type: string;
    price: number;
    active: boolean;
    // tslint:disable-next-line:variable-name
    serial_number: string;
}
