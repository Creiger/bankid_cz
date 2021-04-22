import {AuthorizationCode, ModuleOptions, AccessToken} from 'simple-oauth2';

export const bankIdSandboxURI: string = 'https://oidc.sandbox.bankid.cz';
export const bankIdProductionURI: string = 'https://oidc.sandbox.bankid.cz';
export const bankIdRequiredScope: string[] = ['openid'];

export enum tokenEndpointAuthMethod {
  client_secret_jwt = 'Client Secret JWT',
  client_secret_post = 'Client Secret POST',
  private_key_jwt = 'Private Key JWT',
}

export enum grantTypes {
  refresh_token = 'refresh_token',
  authorization_code = 'authorization_code',
  implicit = 'implicit',
}

export enum responseTypes {
  id_token = 'id_token',
  token = 'token',
  code = 'code'
}

export interface OAuthOptions {
  grantTypes?: grantTypes[],
  tokenEndpointAuthMethod?: tokenEndpointAuthMethod,
  clientId: string,
  clientSecret: string,
  redirectURI: string,
  responseTypes?: responseTypes[],
  scope?: string[]
}

export interface bankIdAccessToken extends AccessToken {
  token: {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    id_token: string,
    expires_at: Date
  }
}

export class OAuth {
  options!: OAuthOptions;
  config!: ModuleOptions;
  client: any;

  constructor(options: OAuthOptions, isProduction: boolean = false) {
    this.options = options;
    this.options.scope = [...new Set([...bankIdRequiredScope, ...(this.options.scope || [])])];
    this.config = {
      client: {
        id: this.options.clientId,
        secret: this.options.clientSecret
      },
      auth: {
        tokenHost: isProduction ? bankIdProductionURI : bankIdSandboxURI,
        authorizePath: '/auth',
        tokenPath: '/token'
      },
      options: {
        authorizationMethod: 'body'
      }
    }
    if (this.options.grantTypes?.includes(grantTypes.authorization_code)) {
      this.client = new AuthorizationCode(this.config);
    }
  }

  getAuthorizationURI(): string | null {
    if (this.options.grantTypes?.includes(grantTypes.authorization_code)) {
      return this.client.authorizeURL({
        redirect_uri: this.options.redirectURI,
        scope: this.options.scope
      });
    }
    return null;
  }

  async getToken(code: string): Promise<bankIdAccessToken> {
    const tokenParams = {
      code,
      redirect_uri: this.options.redirectURI,
      scope: this.options.scope
    };
    const accessToken = await this.client.getToken(tokenParams);
    return accessToken;
  }
}
