import { DateType } from './date-type.enum';


export class BasicUtils {

    public static isEmpty(value: any) {
        return value === null || value === undefined || value === '';
    }

    public static isEmptyNumber(value: number) {
        return this.isEmpty(value) || value === 0;
    }

    public static isNotEmpty(value: any) {
        return !this.isEmpty(value);
    }

    public static isNotEmptyObj(value: any): boolean {
        return (this.isNotEmpty(value) && value !== {});
    }

    public static isNotEmptyList(value) {
        if (value === null || value === undefined || value === '' || value === 'undefined' || value === 'null' || value.length === 0) {
            return false;
        }
        return true;
    }

    public static isEmptyList(value) {
        if (value === null || value === undefined || value === '' || value === 'undefined' || value === 'null' || value.length === 0) {
            return true;
        }
        return false;
    }

    public static complementeValueLeft(valor: string, size: number, complement: string) {
        for (let i = valor.length; i < size; i++) {
            valor = `${complement}${valor}`;
        }
        return valor.toString();
    }

    public static complementeValueRigth(valor, size: number, complement: string) {
        for (let i = valor.length; i < size; i++) {
            valor = `${valor}${complement}`;
        }
        return valor.toString();
    }

    public static formatDate(date: Date, mask: string) {
        if (!this.isEmpty(date) && !this.isEmpty(mask)) {
            let day = date.getDate().toString();
            day = this.complementeValueLeft(day, 2, '0');
            let month = (date.getMonth() + 1).toString();
            month = this.complementeValueLeft(month, 2, '0');
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            if (mask.toUpperCase() === DateType.DATE_TYPE_DD_MM_YYYY_1) {
                return `${day}/${month}/${year}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_DD_MM_YYYY_2) {
                return `${day}-${month}-${year}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_YYYY_MM_DD_1) {
                return `${year}/${month}/${day}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_YYYY_MM_DD_2) {
                return `${year}-${month}-${day}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_YYYY_MM_DD_HH_MM_SS_1) {
                return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_YYYY_MM_DD_HH_MM_SS_2) {
                return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_YYYYMMDDHHMMSS) {
                return `${year}${month}${day}${hours}${minutes}${seconds}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_DDMMYYYYHHMMSS) {
                return `${day}${month}${year}${hours}${minutes}${seconds}`;
            }
            if (mask.toUpperCase() === DateType.DATE_TYPE_DD_MM_YYYY_HH_MM_SS_2) {
                // DATE_TYPE_DD_MM_YYYY_HH_MM_SS_2 = 'DD-MM-YYYY HH:MM:SS',
                return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
            }
            if (mask.toUpperCase() === DateType.HH_MM_1) {
                return `${hours}:${minutes}`;
            }

        }
        return null;
    }

    public static isEmail(search: string): boolean {
        const regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
        return regexp.test(search);
    }

    complementeValueLeft(valor: string, size: number, complement: string) {
        for (let i = valor.length; i < size; i++) {
            valor = `${complement}${valor}`;
        }
        return valor.toString();
    }

    complementeValueRigth(valor, size: number, complement: string) {
        for (let i = valor.length; i < size; i++) {
            valor = `${valor}${complement}`;
        }
        return valor.toString();
    }
}
