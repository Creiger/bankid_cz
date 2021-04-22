import { ModuleOptions, AccessToken } from 'simple-oauth2';
export declare const bankIdSandboxURI: string;
export declare const bankIdProductionURI: string;
export declare const bankIdRequiredScope: string[];
export declare enum tokenEndpointAuthMethod {
    client_secret_jwt = "Client Secret JWT",
    client_secret_post = "Client Secret POST",
    private_key_jwt = "Private Key JWT"
}
export declare enum grantTypes {
    refresh_token = "refresh_token",
    authorization_code = "authorization_code",
    implicit = "implicit"
}
export declare enum responseTypes {
    id_token = "id_token",
    token = "token",
    code = "code"
}
export interface OAuthOptions {
    grantTypes?: grantTypes[];
    tokenEndpointAuthMethod?: tokenEndpointAuthMethod;
    clientId: string;
    clientSecret: string;
    redirectURI: string;
    responseTypes?: responseTypes[];
    scope?: string[];
}
export interface bankIdAccessToken extends AccessToken {
    token: {
        access_token: string;
        token_type: string;
        expires_in: number;
        scope: string;
        id_token: string;
        expires_at: Date;
    };
}
export declare class OAuth {
    options: OAuthOptions;
    config: ModuleOptions;
    client: any;
    constructor(options: OAuthOptions, isProduction?: boolean);
    getAuthorizationURI(): string | null;
    getToken(code: string): Promise<bankIdAccessToken>;
}
