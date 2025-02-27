import * as Wreck from '@hapi/wreck';
import {BankIdAccessToken, bankIdProductionURI, bankIdSandboxURI, OAuthOptions, OAuth} from './ouath';

export interface BankIdCzOptions {
  OAuth: OAuthOptions,
  isProduction?: boolean
}

export class BankIdCz {
  options: BankIdCzOptions;
  private OAuth?: OAuth;
  private accessToken?: BankIdAccessToken;
  private httpOptions!: any;

  constructor(options: BankIdCzOptions) {
    this.options = options;
    this.initOAuth();
    this.httpOptions = {
      baseUrl: this.options.isProduction ? bankIdProductionURI : bankIdSandboxURI,
      headers: { /* http headers */ },
      redirects: 3,
      timeout: 3000,
      rejectUnauthorized: true
    };
  }

  getAuthorizationURI(nonce: string, state: string): string {
    return `${this.OAuth?.getAuthorizationURI() || ''}&nonce=${nonce}&state=${state}`;
  }

  getBankAuthorizationURI(bankId: string, nonce: string, state: string): string {
    return `${this.getAuthorizationURI(nonce, state)}&bank_id=${bankId}`;
  }

  private initOAuth(): void {
    this.OAuth = new OAuth(this.options.OAuth, this.options.isProduction);
  }

  async exchangeCode(code: string, nonce: string, state: string): Promise<void> {
    this.accessToken = await this.OAuth?.getToken(code, nonce, state);
    this.httpOptions.headers.Authorization = 'Bearer ' + this.accessToken?.token.access_token;
  }

  async loadProfile(accessToken?: string): Promise<any> {
    if (accessToken) {
      this.httpOptions.headers.Authorization = 'Bearer ' + accessToken;
    }
    return await this.requestEndpoint('/profile');
  }

  async loadUserinfo(accessToken?: string): Promise<any> {
    if (accessToken) {
      this.httpOptions.headers.Authorization = 'Bearer ' + accessToken;
    }
    return await this.requestEndpoint('/userinfo');
  }

  async loadBanks(nonce: string, state: string): Promise<any> {
    const banks = (await this.requestEndpoint('/api/v1/banks?client_id=' + this.options.OAuth.clientId))?.items || [];
    for (const bank of banks) {
      bank.authorizationURI = this.getBankAuthorizationURI(bank.id, nonce, state);
    }
    return banks;
  }

  private async requestEndpoint(path: string): Promise<any> {
    if (path.startsWith('/api/v1/banks') || this.httpOptions.headers.Authorization) {
      const {res, payload} = await Wreck.get(path, this.httpOptions);
      return JSON.parse((<Buffer>payload).toString());
    } else {
      throw new Error('Access token not set.');
    }
  }



}
