import { FormGroup } from '@angular/forms';
import { State } from './state.model';

export class AddressModel {

    public city: string;
    public complement: string;
    public number: string;
    public address: string;
    public zipcode: string;
    public state: State = new State();

    constructor(form: FormGroup) {
        this.city = form.value.city;
        // tslint:disable-next-line:max-line-length
        this.state = form.value.state ? {name: form.value.state.name ? form.value.state.name : null, code: form.value.state.code ? form.value.state.code : null} : null;
        this.number = form.value.number;
        this.complement = form.value.complement;
        this.zipcode = form.value.zipcode ? form.value.zipcode.replace(/\D/g, '') : form.value.zipcode;
        this.address = form.value.address;
    }
}


