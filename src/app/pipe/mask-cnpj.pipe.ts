import { Pipe, PipeTransform } from '@angular/core';
import { zip } from 'rxjs';
import { isNullOrUndefined } from 'util';

@Pipe({ name: 'maskCnpj' })
export class MasckCnpj implements PipeTransform {

    constructor() { }

    transform(cnpj: string): any {
        // 42.296.113/0001-26
        if (!isNullOrUndefined(cnpj)) {
            let mask: string;
            cnpj = cnpj.replace(/\D/g, '');
            if (cnpj.length === 14) {
                const b1 = cnpj.substr(0, 2);
                const b2 = cnpj.substr(2, 3);
                const b3 = cnpj.substr(5, 3);
                const b4 = cnpj.substr(8, 4);
                const d1 = cnpj.substr(12, 2);
                mask = `${b1}.${b2}.${b4}/${b4}-${d1}`;
                return mask;
            }
            return cnpj;
        }
        return '';
    }
}
