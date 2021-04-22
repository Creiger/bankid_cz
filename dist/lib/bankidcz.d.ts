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
    private initOAuth;
    authorizeCode(code: string): Promise<void>;
    loadProfile(accessToken?: string): Promise<JSON>;
    loadUserinfo(accessToken?: string): Promise<JSON>;
    private requestEndpoint;
}
