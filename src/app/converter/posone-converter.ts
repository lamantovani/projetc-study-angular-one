import { ClientData, AddressModel, BuyPlanDTOModel, BuyMachineDTOModel, Address, ContractDTOModel, AddressInterface } from '../model/exports';
import { FormGroup } from '@angular/forms';
import { POSOneEnum } from '../enumerator/posone.enum';
import { RegistrationResponse } from '../model/registration/registration-response.model';
import { ConfirmationDTO } from '../payment/payment.component';
// tslint:disable-next-line:max-line-length
import { CompleteRegistrationRequest, Address as AddressCompleteRegistration, SelectedPaymentTerminal } from '../model/complete-registration/complete-registration-request.model';
import { ObterTokenCartaoRequest } from '../model/pag-seguro/obter-token-cartao-request.model';

export class POSOneConverter {
    static mountObterTokenCartaoPagSeguro(contract: ContractDTOModel, brandCardName: string, sessionId: string): ObterTokenCartaoRequest {
        const requestPagSeguro = new ObterTokenCartaoRequest();
        requestPagSeguro.amount = contract.buyPlanDTOModel.sumValue;
        requestPagSeguro.cardBrand = brandCardName;
        requestPagSeguro.cardCvv = contract.cardModel.CVVCVC;
        requestPagSeguro.cardExpirationMonth = contract.cardModel.expiration.substr(0, 2);
        requestPagSeguro.cardExpirationYear = contract.cardModel.expiration.substr(3, 6);
        requestPagSeguro.cardNumber = contract.cardModel.cardNumber;
        requestPagSeguro.sessionId = sessionId;
        return requestPagSeguro;
    }

    static mountCompleteRegistrationRequest(contractDTOModel: ContractDTOModel, guid: string, token: string): CompleteRegistrationRequest {
      const request = new CompleteRegistrationRequest();
      request.address = new AddressCompleteRegistration();
      request.address.city = contractDTOModel.address.city;
      request.address.complement = contractDTOModel.address.complement;
      request.address.postal_code = contractDTOModel.address.zipcode;
      request.address.state = contractDTOModel.address.state.code;
      request.address.street_name = contractDTOModel.address.address;
      request.address.street_number = contractDTOModel.address.number;
      request.company_name = contractDTOModel.clientData.companyName;
      request.email = contractDTOModel.clientData.email;
      request.external_registration_token = localStorage.getItem(POSOneEnum.REDIRECT_BY_GUID);
      request.identity = contractDTOModel.clientData.cnpj;
      request.payment_registration_card_token = token;
      request.phone_number = contractDTOModel.clientData.phoneNumber;
      request.plan_id = contractDTOModel.buyPlanDTOModel.select.id;
      request.responsible_name = contractDTOModel.clientData.responsibleName;
      contractDTOModel.selectMachine.forEach(machine => {
        const terminal = new SelectedPaymentTerminal();
        terminal.payment_terminal_id = machine.id;
        terminal.quantity = machine.amount;
        request.selected_payment_terminals.push(terminal);
      });
      request.trading_name = contractDTOModel.buyPlanDTOModel.select.description;
      return request;
    }

    static mountListConfirmatioByContract(buyPlanDTOModel: BuyPlanDTOModel, selectMachine: BuyMachineDTOModel[]): ConfirmationDTO[] {
        const list: ConfirmationDTO[] = [];
        const plan = new ConfirmationDTO();
        plan.quantity = buyPlanDTOModel.amount;
        plan.name = buyPlanDTOModel.select.name;
        plan.sumValue = buyPlanDTOModel.sumValue;
        plan.img = '../../assets/logo-pos-one.jpeg';
        plan.type = 'Plano';
        plan.description = this.getDescriptionPlan(plan.name);
        list.push(plan);

        const imgSmart = '../../assets/moderninha-smart.png';
        const imgModernX = '../../assets/moderninha-x.png';

        selectMachine.forEach((machine: BuyMachineDTOModel) => {
            const viwerMachine = new ConfirmationDTO();
            viwerMachine.quantity = machine.amount;
            viwerMachine.name = machine.select.description;
            viwerMachine.sumValue = machine.sumValue * machine.amount;
            viwerMachine.img = machine.select.description === POSOneEnum.NAME_MACHINE_SMART ? imgSmart : imgModernX;
            viwerMachine.type = 'Modelo';
            viwerMachine.description = this.getDescriptionMachine(viwerMachine.name);
            list.push(viwerMachine);
        });
        return list;
    }

    public static getDescriptionPlan(planName: string): string {
        switch (planName) {
            case (POSOneEnum.PLAN_NAME_1): {
                return POSOneEnum.DESCRIPTION_PLAN_NAME_1;
            }
            case (POSOneEnum.PLAN_NAME_2): {
                return POSOneEnum.DESCRIPTION_PLAN_NAME_2;
            }
            case (POSOneEnum.PLAN_NAME_3): {
                return POSOneEnum.DESCRIPTION_PLAN_NAME_3;
            }
        }
    }

    public static getDescriptionMachine(machineName: string): string {
        switch (machineName) {
            case (POSOneEnum.NAME_MACHINE_MODERN_X): {
                return POSOneEnum.DESCRIPTION_MACHINE_MODERN_X;
            }
            case (POSOneEnum.NAME_MACHINE_SMART): {
                return POSOneEnum.DESCRIPTION_MACHINE_SMART;
            }
        }
    }

    public static mountAddressByAutoComplete(address: AddressInterface, nameState: string): any {
        const values = {
            state: { code: address.uf, name: nameState },
            city: address.localidade,
            address: address.logradouro,
            complement: address.complemento
        };
        return values;
    }

    public static mountRegisterByPreOrder(resp: RegistrationResponse, nameState): any {
        const values = {
            phoneNumber: resp.phone_number,
            cnpj: resp.identity,
            email: resp.email,
            companyName: resp.company_name,
            responsibleName: resp.responsible_name,
            complement: resp.address.complement,
            city: resp.address.city,
            state: { code: resp.address.state, name: nameState },
            number: resp.address.street_number,
            zipcode: resp.address.postal_code,
            address: resp.address.street_name,
            cnpjReadonly: true
        };
        return values;
    }
    public static mountSelectedMachine(selectMachine: BuyMachineDTOModel[]): any {
        let modernXValue = 0;
        let smartValue = 0;
        // tslint:disable-next-line:max-line-length
        selectMachine.map(machine => machine.select.description === POSOneEnum.NAME_MACHINE_MODERN_X ? modernXValue = machine.amount : null);
        // tslint:disable-next-line:max-line-length
        selectMachine.map(machine => machine.select.description === POSOneEnum.NAME_MACHINE_SMART ? smartValue = machine.amount : null);
        const values = {
            smart: { value: smartValue, label: String(smartValue) },
            modernX: { value: modernXValue, label: String(modernXValue) }
        };
        return values;
    }

    public static mountFormValuesClientDataAndAddress(clientData: ClientData, address: AddressModel): any {
        const values = {
            phoneNumber: clientData.phoneNumber,
            cnpj: clientData.cnpj,
            email: clientData.email,
            companyName: clientData.companyName,
            responsibleName: clientData.responsibleName,
            cnpjReadonly: clientData.cnpjReadonly,
            complement: address.complement,
            city: address.city,
            state: address.state,
            number: address.number,
            zipcode: address.zipcode,
            address: address.address
        };
        return values;
    }

    public static mountFormValuesBuyPlanDTOModel(buyPlanDTOModel: BuyPlanDTOModel): any {
        const values = {
            license: { quantity: buyPlanDTOModel.amount ? buyPlanDTOModel.amount : 1},
            model: buyPlanDTOModel.select.name
        };
        return values;
    }
}
