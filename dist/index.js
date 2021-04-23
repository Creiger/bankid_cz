"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseTypes = exports.grantTypes = exports.bankIdCz = void 0;
var bankidcz_1 = require("./lib/bankidcz");
Object.defineProperty(exports, "bankIdCz", { enumerable: true, get: function () { return bankidcz_1.bankIdCz; } });
var ouath_1 = require("./lib/ouath");
Object.defineProperty(exports, "grantTypes", { enumerable: true, get: function () { return ouath_1.grantTypes; } });
Object.defineProperty(exports, "responseTypes", { enumerable: true, get: function () { return ouath_1.responseTypes; } });
