"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankIdCz = void 0;
const Wreck = require("@hapi/wreck");
const ouath_1 = require("./ouath");
class bankIdCz {
    constructor(options) {
        this.options = options;
        this.initOAuth();
        this.httpOptions = {
            baseUrl: this.options.isProduction ? ouath_1.bankIdProductionURI : ouath_1.bankIdSandboxURI,
            headers: { /* http headers */},
            redirects: 3,
            timeout: 3000,
            rejectUnauthorized: true
        };
    }
    get authorizationURI() {
        var _a;
        return ((_a = this.OAuth) === null || _a === void 0 ? void 0 : _a.getAuthorizationURI()) || undefined;
    }
    getBankAuthorizationURI(bankId) {
        return `${this.authorizationURI}&bank_id=${bankId}`;
    }
    initOAuth() {
        this.OAuth = new ouath_1.OAuth(this.options.OAuth);
    }
    async exchangeCode(code) {
        var _a, _b;
        this.accessToken = await ((_a = this.OAuth) === null || _a === void 0 ? void 0 : _a.getToken(code));
        this.httpOptions.headers.Authorization = 'Bearer ' + ((_b = this.accessToken) === null || _b === void 0 ? void 0 : _b.token.access_token);
    }
    async loadProfile(accessToken) {
        if (accessToken) {
            this.httpOptions.headers.Authorization = 'Bearer ' + accessToken;
        }
        return await this.requestEndpoint('/profile');
    }
    async loadUserinfo(accessToken) {
        if (accessToken) {
            this.httpOptions.headers.Authorization = 'Bearer ' + accessToken;
        }
        return await this.requestEndpoint('/userinfo');
    }
    async loadBanks() {
        var _a;
        const banks = ((_a = (await this.requestEndpoint('/api/v1/banks'))) === null || _a === void 0 ? void 0 : _a.items) || [];
        for (const bank of banks) {
            bank.authorizationURI = this.getBankAuthorizationURI(bank.id);
        }
        return banks;
    }
    async requestEndpoint(path) {
        if (this.httpOptions.headers.Authorization) {
            const { res, payload } = await Wreck.get(path, this.httpOptions);
            return JSON.parse(payload.toString());
        }
        else {
            throw new Error('Access token not set.');
        }
    }
}
exports.bankIdCz = bankIdCz;
