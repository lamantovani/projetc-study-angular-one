import { ClientData, AddressModel, BuyMachineDTOModel, BuyPlanDTOModel, CardModel } from '../exports';
import { FormGroup } from '@angular/forms';

export class ContractDTOModel {

    public cardModel: CardModel;
    public address: AddressModel;
    public isHaveMachine: string;
    public clientData: ClientData;
    public buyPlanDTOModel: BuyPlanDTOModel;
    public selectMachine: BuyMachineDTOModel[] = [];

    constructor() {
        this.cardModel = new CardModel(new FormGroup({}));
        this.address = new AddressModel(new FormGroup({}));
        this.clientData = new ClientData(new FormGroup({}));
        this.buyPlanDTOModel = new BuyPlanDTOModel();
    }

}
