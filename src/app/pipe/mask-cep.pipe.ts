import { Pipe, PipeTransform } from '@angular/core';
import { zip } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Pipe({ name: 'maskCep' })
export class MasckCep implements PipeTransform {

    constructor() { }

    transform(cep: string): any {
        // 42.296.113/0001-26
        if (!isNullOrUndefined(cep)) {
            let mask: string;
            cep = cep.replace(/\D/g, '');
            if (cep.length === 8) {
                const b1 = cep.substr(0, 5);
                const b2 = cep.substr(5, 3);
                mask = `${b1}-${b2}`;
                return mask;
            }
            return cep;
        }
        return '';
    }
}
