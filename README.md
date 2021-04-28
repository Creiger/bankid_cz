# bankid_cz
BankId for Czech republic<br><br>
Only OAuth authorization code method is available at this moment.

###### Basic initialization
```
import {bankIdCz, grantTypes, responseTypes} from 'bankid_cz'

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
###### 1. Retrieving authorizationURI and banks
AuthorizationURI is automatically added to banks list.
```
await bankid.getAuthorizationURI(state?: string);
await bankid.loadBanks(state?: string);
```
###### 2. Exchanging authorization code for token
After redirection to redirectURI, the code is returned as query param.
```
await bankid.exchangeCode(code: string);
```
After this, accessToken is stored in memory and used in future requests.

###### 3. Authorized requests profile and userInfo
Access token is optional. If used, it will be used instead of the stored one by exchangeCode method.
```
await bankid.loadProfile(accessToken?: string);
await bankid.loadUSerinfo(accessToken?: string);
```
