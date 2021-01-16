import { PlanModel } from '../plan.model'

export class BuyPlanDTOModel {
    public amount: number;
    public sumValue: number;
    public select: PlanModel;

    constructor() {
        this.amount = 0;
        this.sumValue = 0;
        this.select = new PlanModel();
    }
}
