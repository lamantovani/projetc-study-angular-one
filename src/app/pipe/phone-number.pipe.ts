import { Pipe, PipeTransform } from '@angular/core';
import { zip } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Pipe({ name: 'phoneNumber' })
export class PhoneNumberPipe implements PipeTransform {

    constructor() { }

    transform(phone: string): any {
        if (!isNullOrUndefined(phone)) {
            let mask: string;
            phone = phone.replace(/\D/g, '');
            if (phone.length === 11) {
                const dd = phone.substr(0, 2);
                const d9 = phone.substr(2, 1);
                const b1 = phone.substr(3, 4);
                const b2 = phone.substr(7, 4);
                mask = `(${dd}) ${d9} ${b1}-${b2}`;
                return mask;
            }
            if (phone.length === 10) {
                const dd = phone.substr(0, 2);
                const b1 = phone.substr(2, 4);
                const b2 = phone.substr(6, 5);
                mask = `(${dd}) ${b1}-${b2}`;
                return mask;
            }
            return phone;
        }
        return '';
    }
}
