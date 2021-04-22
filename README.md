# bankid_cz
BankId for Czech republic
Only OAuth authorization code method is available at this moment.

Basic configuration:
```
const bankid = new bankIdCz({
  isProduction: true,
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
```
