import { FormGroup } from '@angular/forms';
import { from } from 'rxjs';

export class ClientData {
    public cnpj: string;
    public email: string;
    public companyName: string;
    public phoneNumber: string;
    public responsibleName: string;
    public cnpjReadonly: boolean;

    constructor(form: FormGroup) {
        this.cnpj = form.value.cnpj ? form.value.cnpj.replace(/\D/g, '') : form.value.cnpj;
        this.email = form.value.email;
        this.companyName = form.value.companyName;
        this.phoneNumber = form.value.phoneNumber ? form.value.phoneNumber.replace(/\D/g, '') : form.value.phoneNumber;
        this.responsibleName = form.value.responsibleName;
        this.cnpjReadonly = form.value.cnpjReadonly;
    }
}
