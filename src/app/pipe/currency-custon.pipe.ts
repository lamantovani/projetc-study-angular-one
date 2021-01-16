import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';

@Pipe({ name: 'currencyCuston' })
export class CurrencyCustonPipe implements PipeTransform {

    constructor(
        @Inject(LOCALE_ID) public locale: string
    ) { }

    transform(strNumber: any, simbol: string, text?: string): any {

        let nValue: number;
        if (strNumber !== null && strNumber !== '' && strNumber !== undefined) {
            nValue = Number(strNumber);
        }

        // tslint:disable-next-line:max-line-length
        return text ? simbol.concat(' ').concat(Intl.NumberFormat(this.locale, { minimumFractionDigits: 2 }).format(Number(nValue.toFixed(2)))).concat(text)
        : simbol.concat(' ').concat(Intl.NumberFormat(this.locale, { minimumFractionDigits: 2 }).format(Number(nValue.toFixed(2))));

    }
}
