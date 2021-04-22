# bankid_cz
BankId for Czech republic (OAuth - authorization_code)
`
import {bankIdCz} from './index';
import {grantTypes, responseTypes} from './index';

const bankid = new bankIdCz({
  OAuth: {
    clientId: <client_id>,
    clientSecret: <client_secret>,
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
`
