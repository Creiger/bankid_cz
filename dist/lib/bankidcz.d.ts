import { OAuthOptions } from './ouath';
export interface bankIdCzOptions {
    OAuth: OAuthOptions;
    isProduction?: boolean;
}
export declare class bankIdCz {
    options: bankIdCzOptions;
    private OAuth?;
    private accessToken?;
    private httpOptions;
    constructor(options: bankIdCzOptions);
    getAuthorizationURI(state?: string): string;
    getBankAuthorizationURI(bankId: string, state?: string): string;
    private initOAuth;
    exchangeCode(code: string): Promise<void>;
    loadProfile(accessToken?: string): Promise<any>;
    loadUserinfo(accessToken?: string): Promise<any>;
    loadBanks(state?: string): Promise<any>;
    private requestEndpoint;
}
