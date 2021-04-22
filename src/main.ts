import {bankIdCz} from './lib/bankidcz';
import {grantTypes, responseTypes} from './lib/oauth';

const bankid = new bankIdCz({
  OAuth: {
    clientId: 'd61e8192-d333-4fe4-8753-3ecaf6aeb6b9',
    clientSecret: 'Q2dcWm8px1HQo2TqkOhuA6pQu_YfCduTzAFochTI40gkKOonja6JLGltEnhqJZu3JyuUaznCaBA_piolWmP6Kw',
    redirectURI: 'http://localhost:3030/oauth/callback',
    grantTypes: [grantTypes.authorization_code],
    responseTypes: [responseTypes.code],
    scope: [
      'profile.addresses',
      'profile.birthdate',
      'profile.birthnumber',
      'profile.birthplaceNationality',
      'profile.email',
      'profile.gender',
      'profile.idcards',
      'profile.legalstatus',
      'profile.locale',
      'profile.maritalstatus',
      'profile.name',
      'profile.paymentAccounts',
      'profile.phonenumber',
      'profile.titles',
      'profile.updatedat',
      'profile.zoneinfo',
      'profile.verification'
    ]
  }
});

const authUri = bankid.authorizationURI;
console.log(authUri);


