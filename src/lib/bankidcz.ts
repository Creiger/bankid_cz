import * as Wreck from '@hapi/wreck';
import {bankIdAccessToken, bankIdProductionURI, bankIdSandboxURI, OAuthOptions, OAuth} from './ouath';

export interface bankIdCzOptions {
  OAuth: OAuthOptions,
  isProduction?: boolean
}

export class bankIdCz {
  options: bankIdCzOptions;
  private OAuth?: OAuth;
  private accessToken?: bankIdAccessToken;
  private httpOptions!: any;

  constructor(options: bankIdCzOptions) {
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

  get authorizationURI(): string | undefined {
    return this.OAuth?.getAuthorizationURI() || undefined;
  }

  getBankAuthorizationURI(bankId: string): string {
    return `${this.authorizationURI}&bank_id=${bankId}`;
  }

  private initOAuth(): void {
    this.OAuth = new OAuth(this.options.OAuth);
  }

  async exchangeCode(code: string): Promise<void> {
    this.accessToken = await this.OAuth?.getToken(code);
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

  async loadBanks(): Promise<any> {
    const banks = (await this.requestEndpoint('/api/v1/banks'))?.items || [];
    for (const bank of banks) {
      bank.authorizationURI = this.getBankAuthorizationURI(bank.id);
    }
    return banks;
  }

  private async requestEndpoint(path: string): Promise<any> {
    if (this.httpOptions.headers.Authorization) {
      const {res, payload} = await Wreck.get(path, this.httpOptions);
      return JSON.parse((<Buffer>payload).toString());
    } else {
      throw new Error('Access token not set.');
    }
  }



}
