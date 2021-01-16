export class PlanModel {
    public id: number;
    public name: string;
    public value: number;
    public period: string;
    public benefits: string[];
    public description: string;
    public transactionCode: string;

    constructor() {
        this.id = 0;
        this.name = '';
        this.value = 0;
        this.period = '';
        this.benefits = [];
        this.description = '';
        this.transactionCode = '';
    }
}