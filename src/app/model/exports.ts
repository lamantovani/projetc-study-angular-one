export { BuyPlanDTOModel } from './complete-data/buy-plan-dto.model';
export { ContractDTOModel } from './complete-data/contract-dto.model';
export { BuyMachineDTOModel } from './complete-data/buy-machine-dto.model';
export { OauthTokenResponse } from './oauth-token/oauth-token-response.model';
export { RegistrationRequest } from './registration/registration-request.model';
export { RegistrationResponse } from './registration/registration-response.model';
export { PaymentTokenResponse } from './payment-token/payment-token-response.model';
export { Content, PaymentTerminalsResponse } from './payment-terminals/payment-terminals-response.model';
export { CompleteRegistrationRequest, Address, SelectedPaymentTerminal } from './complete-registration/complete-registration-request.model';

export { State } from './state.model';
export { Machine } from './machine';
export { License } from './license.model';
export { PlanModel } from './plan.model';
export { CardModel } from './card.model';
export { AddressModel } from './address.model';
export { MachineModel } from './machine.model';
export { ClientData } from './client-data.model';
export { Brand, BrandCards } from './brand-cards.model';

export interface AddressInterface {
    bairro: string;
    cep: string;
    complemento: string;
    gia: string
    ibge: string;
    localidade: string;
    logradouro: string;
    uf: string;
    unidade: string;
}