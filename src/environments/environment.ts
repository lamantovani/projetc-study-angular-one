// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url_voice: 'viacep.com.br',
  name_ouath_token: 'oauthToken',
  url_oauth_token: '/oauth/token',
  url_uol: 'https://df.uol.com.br',
  url_obter_token_do_cartao: '/v2/cards',
  url_checkout: '/api/v1/external/checkout',
  url_host: 'http://posone-homolog.gingaone.com',
  url_payment_terminals: '/api/v1/payment-terminals',
  url_token_pagseguro: '/api/v1/external/token/pagseguro',
  url_registration: '/api/v1/external/nuvemshop/registration',
  url_payment_token: '/api/v1/external/nuvemshop/registration/payment/token',
  url_complete_registration: '/api/v1/external/nuvemshop/registration/complete'
};
