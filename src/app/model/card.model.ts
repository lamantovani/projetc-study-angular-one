import { FormGroup } from '@angular/forms';

export class CardModel {
    public name: string;
    public cardNumber: string;
    public CVVCVC: string;
    public expiration: string;

    constructor(form: FormGroup) {
        this.name = form.value.name;
        this.CVVCVC = form.value.CVV;
        this.cardNumber = form.value.cardNumber ? form.value.cardNumber.replace(/\D/g, '') : form.value.cardNumber;
        this.expiration = form.value.date;
    }
}
