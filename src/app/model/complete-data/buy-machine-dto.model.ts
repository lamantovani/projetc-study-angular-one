import { MachineModel } from '../exports';

export class BuyMachineDTOModel {
    public id: number;
    public amount: number;
    public period: string;
    public sumValue: number;
    public select: MachineModel;

    constructor() {
        this.id = 0;
        this.amount = 0;
        this.period = '';
        this.sumValue = 0;
        this.select = new MachineModel();
    }
}