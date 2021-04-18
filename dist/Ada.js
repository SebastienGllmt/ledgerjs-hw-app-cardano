"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Networks = exports.utils = exports.TransactionSigningMode = exports.InvalidDataReason = exports.CertificateType = exports.AddressType = exports.Ada = void 0;
const errors_1 = require("./errors");
const invalidDataReason_1 = require("./errors/invalidDataReason");
Object.defineProperty(exports, "InvalidDataReason", { enumerable: true, get: function () { return invalidDataReason_1.InvalidDataReason; } });
const deriveAddress_1 = require("./interactions/deriveAddress");
const getExtendedPublicKeys_1 = require("./interactions/getExtendedPublicKeys");
const getSerial_1 = require("./interactions/getSerial");
const getVersion_1 = require("./interactions/getVersion");
const runTests_1 = require("./interactions/runTests");
const showAddress_1 = require("./interactions/showAddress");
const signTx_1 = require("./interactions/signTx");
const address_1 = require("./parsing/address");
const transaction_1 = require("./parsing/transaction");
const public_1 = require("./types/public");
Object.defineProperty(exports, "AddressType", { enumerable: true, get: function () { return public_1.AddressType; } });
Object.defineProperty(exports, "CertificateType", { enumerable: true, get: function () { return public_1.CertificateType; } });
Object.defineProperty(exports, "TransactionSigningMode", { enumerable: true, get: function () { return public_1.TransactionSigningMode; } });
const utils_1 = __importDefault(require("./utils"));
exports.utils = utils_1.default;
const assert_1 = require("./utils/assert");
const parse_1 = require("./utils/parse");
__exportStar(require("./errors"), exports);
__exportStar(require("./types/public"), exports);
const CLA = 0xd7;
function wrapConvertDeviceStatusError(fn) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fn(...args);
        }
        catch (e) {
            if (e && e.statusCode) {
                throw new errors_1.DeviceStatusError(e.statusCode);
            }
            throw e;
        }
    });
}
function wrapRetryStillInCall(fn) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        try {
            return yield fn(...args);
        }
        catch (e) {
            if (e &&
                e.statusCode &&
                e.statusCode === errors_1.DeviceStatusCodes.ERR_STILL_IN_CALL) {
                return yield fn(...args);
            }
            throw e;
        }
    });
}
function interact(interaction, send) {
    return __awaiter(this, void 0, void 0, function* () {
        let cursor = interaction.next();
        let first = true;
        while (!cursor.done) {
            const apdu = cursor.value;
            const res = first
                ? yield wrapRetryStillInCall(send)(apdu)
                : yield send(apdu);
            first = false;
            cursor = interaction.next(res);
        }
        return cursor.value;
    });
}
class Ada {
    constructor(transport, scrambleKey = "ADA") {
        this.transport = transport;
        const methods = [
            "getVersion",
            "getSerial",
            "getExtendedPublicKeys",
            "signTransaction",
            "deriveAddress",
            "showAddress",
        ];
        this.transport.decorateAppAPIMethods(this, methods, scrambleKey);
        this._send = (params) => __awaiter(this, void 0, void 0, function* () {
            let response = yield wrapConvertDeviceStatusError(this.transport.send)(CLA, params.ins, params.p1, params.p2, params.data);
            response = utils_1.default.stripRetcodeFromResponse(response);
            if (params.expectedResponseLength != null) {
                assert_1.assert(response.length === params.expectedResponseLength, `unexpected response length: ${response.length} instead of ${params.expectedResponseLength}`);
            }
            return response;
        });
    }
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            const version = yield interact(this._getVersion(), this._send);
            return { version, compatibility: getVersion_1.getCompatibility(version) };
        });
    }
    *_getVersion() {
        return yield* getVersion_1.getVersion();
    }
    getSerial() {
        return __awaiter(this, void 0, void 0, function* () {
            return interact(this._getSerial(), this._send);
        });
    }
    *_getSerial() {
        const version = yield* getVersion_1.getVersion();
        return yield* getSerial_1.getSerial(version);
    }
    runTests() {
        return __awaiter(this, void 0, void 0, function* () {
            return interact(this._runTests(), this._send);
        });
    }
    *_runTests() {
        const version = yield* getVersion_1.getVersion();
        return yield* runTests_1.runTests(version);
    }
    getExtendedPublicKeys({ paths }) {
        return __awaiter(this, void 0, void 0, function* () {
            parse_1.validate(parse_1.isArray(paths), invalidDataReason_1.InvalidDataReason.GET_EXT_PUB_KEY_PATHS_NOT_ARRAY);
            const parsed = paths.map((path) => parse_1.parseBIP32Path(path, invalidDataReason_1.InvalidDataReason.INVALID_PATH));
            return interact(this._getExtendedPublicKeys(parsed), this._send);
        });
    }
    *_getExtendedPublicKeys(paths) {
        const version = yield* getVersion_1.getVersion();
        return yield* getExtendedPublicKeys_1.getExtendedPublicKeys(version, paths);
    }
    getExtendedPublicKey({ path }) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getExtendedPublicKeys({ paths: [path] }))[0];
        });
    }
    deriveAddress({ network, address }) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedParams = address_1.parseAddress(network, address);
            return interact(this._deriveAddress(parsedParams), this._send);
        });
    }
    *_deriveAddress(addressParams) {
        const version = yield* getVersion_1.getVersion();
        return yield* deriveAddress_1.deriveAddress(version, addressParams);
    }
    showAddress({ network, address }) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedParams = address_1.parseAddress(network, address);
            return interact(this._showAddress(parsedParams), this._send);
        });
    }
    *_showAddress(addressParams) {
        const version = yield* getVersion_1.getVersion();
        return yield* showAddress_1.showAddress(version, addressParams);
    }
    signTransaction(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedRequest = transaction_1.parseSignTransactionRequest(request);
            return interact(this._signTx(parsedRequest), this._send);
        });
    }
    *_signTx(request) {
        const version = yield* getVersion_1.getVersion();
        return yield* signTx_1.signTransaction(version, request);
    }
}
exports.Ada = Ada;
exports.default = Ada;
exports.Networks = {
    Mainnet: {
        networkId: 0x01,
        protocolMagic: 764824073,
    },
    Testnet: {
        networkId: 0x00,
        protocolMagic: 42,
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FkYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLHFDQUFnRTtBQUNoRSxrRUFBK0Q7QUE0V2Isa0dBNVd6QyxxQ0FBaUIsT0E0V3lDO0FBMVduRSxnRUFBNkQ7QUFDN0QsZ0ZBQTZFO0FBQzdFLHdEQUFxRDtBQUNyRCwwREFBeUU7QUFDekUsc0RBQW1EO0FBQ25ELDREQUF5RDtBQUN6RCxrREFBd0Q7QUFDeEQsK0NBQWdEO0FBQ2hELHVEQUFvRTtBQU9wRSwyQ0FBZ0c7QUEyVnZGLDRGQTNWQSxvQkFBVyxPQTJWQTtBQUFFLGdHQTNWQSx3QkFBZSxPQTJWQTtBQUFnQyx1R0EzVm5CLCtCQUFzQixPQTJWbUI7QUExVjNGLG9EQUE0QjtBQTBWaUUsZ0JBMVZ0RixlQUFLLENBMFZzRjtBQXpWbEcsMkNBQXVDO0FBQ3ZDLHlDQUFtRTtBQUVuRSwyQ0FBd0I7QUFDeEIsaURBQThCO0FBRTlCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQztBQUVqQixTQUFTLDRCQUE0QixDQUFxQixFQUFLO0lBRTdELE9BQU8sQ0FBTyxHQUFHLElBQUksRUFBRSxFQUFFO1FBQ3ZCLElBQUk7WUFDRixPQUFPLE1BQU0sRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDMUI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSwwQkFBaUIsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUE7YUFDMUM7WUFDRCxNQUFNLENBQUMsQ0FBQztTQUNUO0lBQ0gsQ0FBQyxDQUFBLENBQUM7QUFDSixDQUFDO0FBcUJELFNBQVMsb0JBQW9CLENBQXFCLEVBQUs7SUFFckQsT0FBTyxDQUFPLEdBQUcsSUFBUyxFQUFFLEVBQUU7UUFDNUIsSUFBSTtZQUNGLE9BQU8sTUFB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