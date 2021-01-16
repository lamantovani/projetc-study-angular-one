export class ObterTokenCartaoRequest {
    // {{ADICIONE O ID DE SESSÃO}}
    sessionId: string;

    /*
        {{ADICIONE O VALOR}}
        Valor com 2 casas decimais separado por ponto 10.00
    */
    amount: number;

    /*
        {{ADICIONE O NÚMERO DO CARTÃO}}
        Número completo do cartão sem espaços ou pontos
    */
    cardNumber: string;

    // {{ADICIONE A BANDEIRA DO CARTÃO}}
    cardBrand: string;

    /*
        {{ADICIONE O CVV DO CARTÃO}}
        Código de segurança do cartão
     */
    cardCvv: string;

    /*
        {{ADICIONE O MÊS DE EXPIRAÇÃO}}
        2 dígitos
     */
    cardExpirationMonth: string;

    /*
        {{ADICIONE O ANO DE EXPIRAÇÃO}}
        4 dígitos
     */
    cardExpirationYear: string;
}
