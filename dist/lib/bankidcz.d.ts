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
    get authorizationURI(): string | undefined;
    getBankAuthorizationURI(bankId: string): string;
    private initOAuth;
    exchangeCode(code: string): Promise<void>;
    loadProfile(accessToken?: string): Promise<any>;
    loadUserinfo(accessToken?: string): Promise<any>;
    loadBanks(): Promise<any>;
    private requestEndpoint;
}
