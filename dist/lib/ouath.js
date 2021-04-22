"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuth = exports.responseTypes = exports.grantTypes = exports.tokenEndpointAuthMethod = exports.bankIdRequiredScope = exports.bankIdProductionURI = exports.bankIdSandboxURI = void 0;
const simple_oauth2_1 = require("simple-oauth2");
exports.bankIdSandboxURI = 'https://oidc.sandbox.bankid.cz';
exports.bankIdProductionURI = 'https://oidc.sandbox.bankid.cz';
exports.bankIdRequiredScope = ['openid'];
var tokenEndpointAuthMethod;
(function (tokenEndpointAuthMethod) {
    tokenEndpointAuthMethod["client_secret_jwt"] = "Client Secret JWT";
    tokenEndpointAuthMethod["client_secret_post"] = "Client Secret POST";
    tokenEndpointAuthMethod["private_key_jwt"] = "Private Key JWT";
})(tokenEndpointAuthMethod = exports.tokenEndpointAuthMethod || (exports.tokenEndpointAuthMethod = {}));
var grantTypes;
(function (grantTypes) {
    grantTypes["refresh_token"] = "refresh_token";
    grantTypes["authorization_code"] = "authorization_code";
    grantTypes["implicit"] = "implicit";
})(grantTypes = exports.grantTypes || (exports.grantTypes = {}));
var responseTypes;
(function (responseTypes) {
    responseTypes["id_token"] = "id_token";
    responseTypes["token"] = "token";
    responseTypes["code"] = "code";
})(responseTypes = exports.responseTypes || (exports.responseTypes = {}));
class OAuth {
    constructor(options, isProduction = false) {
        var _a;
        this.options = options;
        this.options.scope = [...new Set([...exports.bankIdRequiredScope, ...(this.options.scope || [])])];
        this.config = {
            client: {
                id: this.options.clientId,
                secret: this.options.clientSecret
            },
            auth: {
                tokenHost: isProduction ? exports.bankIdProductionURI : exports.bankIdSandboxURI,
                authorizePath: '/auth',
                tokenPath: '/token'
            },
            options: {
                authorizationMethod: 'body'
            }
        };
        if ((_a = this.options.grantTypes) === null || _a === void 0 ? void 0 : _a.includes(grantTypes.authorization_code)) {
            this.client = new simple_oauth2_1.AuthorizationCode(this.config);
        }
    }
    getAuthorizationURI() {
        var _a;
        if ((_a = this.options.grantTypes) === null || _a === void 0 ? void 0 : _a.includes(grantTypes.authorization_code)) {
            return this.client.authorizeURL({
                redirect_uri: this.options.redirectURI,
                scope: this.options.scope
            });
        }
        return null;
    }
    async getToken(code) {
        const tokenParams = {
            code,
            redirect_uri: this.options.redirectURI,
            scope: this.options.scope
        };
        const accessToken = await this.client.getToken(tokenParams);
        return accessToken;
    }
}
exports.OAuth = OAuth;
//# sourceMappingURL=ouath.js.map