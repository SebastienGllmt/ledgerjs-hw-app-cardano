"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bech32_decodeAddress = exports.bech32_encodeAddress = exports.base58_decode = exports.base58_encode = exports.str_to_path = void 0;
const base_x_1 = __importDefault(require("base-x"));
const bech32_1 = __importDefault(require("bech32"));
const errors_1 = require("../errors");
const public_1 = require("../types/public");
const assert_1 = require("../utils/assert");
const parse_1 = require("./parse");
const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const bs58 = base_x_1.default(BASE58_ALPHABET);
const TESTNET_NETWORK_ID = 0x00;
function parseBIP32Index(str, errMsg) {
    let base = 0;
    if (str.endsWith("'")) {
        str = str.slice(0, -1);
        base = public_1.HARDENED;
    }
    const i = parse_1.parseIntFromStr(str, errMsg);
    parse_1.validate(i >= 0, errMsg);
    parse_1.validate(i < public_1.HARDENED, errMsg);
    return base + i;
}
function str_to_path(data) {
    const errMsg = errors_1.InvalidDataReason.INVALID_PATH;
    parse_1.validate(parse_1.isString(data), errMsg);
    parse_1.validate(data.length > 0, errMsg);
    return data.split("/").map(function (x) {
        return parseBIP32Index(x, errMsg);
    });
}
exports.str_to_path = str_to_path;
function base58_encode(data) {
    assert_1.assert(parse_1.isBuffer(data), "invalid buffer");
    return bs58.encode(data);
}
exports.base58_encode = base58_encode;
const isValidBase58 = (data) => parse_1.isString(data) && [...data].every(c => BASE58_ALPHABET.includes(c));
function base58_decode(data) {
    assert_1.assert(isValidBase58(data), "invalid base58 string");
    return bs58.decode(data);
}
exports.base58_decode = base58_decode;
function bech32_encodeAddress(data) {
    assert_1.assert(parse_1.isBuffer(data), "invalid buffer");
    const data5bit = bech32_1.default.toWords(data);
    const MAX_HUMAN_ADDRESS_LENGTH = 150;
    return bech32_1.default.encode(getShelleyAddressPrefix(data), data5bit, MAX_HUMAN_ADDRESS_LENGTH);
}
exports.bech32_encodeAddress = bech32_encodeAddress;
function getShelleyAddressPrefix(data) {
    let result = "";
    const addressType = (data[0] & 0b11110000) >> 4;
    switch (addressType) {
        case public_1.AddressType.REWARD:
            result = "stake";
            break;
        default:
            result = "addr";
    }
    const networkId = data[0] & 0b00001111;
    if (networkId === TESTNET_NETWORK_ID) {
        result += "_test";
    }
    return result;
}
function bech32_decodeAddress(data) {
    const { words } = bech32_1.default.decode(data, 1000);
    return Buffer.from(bech32_1.default.fromWords(words));
}
exports.bech32_decodeAddress = bech32_decodeAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUEyQjtBQUMzQixvREFBNEI7QUFFNUIsc0NBQThDO0FBQzlDLDRDQUF3RDtBQUN4RCw0Q0FBeUM7QUFDekMsbUNBQXdFO0FBRXhFLE1BQU0sZUFBZSxHQUNqQiw0REFBNEQsQ0FBQztBQUNqRSxNQUFNLElBQUksR0FBRyxnQkFBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXBDLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDO0FBRWhDLFNBQVMsZUFBZSxDQUFDLEdBQVcsRUFBRSxNQUF5QjtJQUMzRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7SUFDYixJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbkIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsSUFBSSxHQUFHLGlCQUFRLENBQUM7S0FDbkI7SUFDRCxNQUFNLENBQUMsR0FBRyx1QkFBZSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxnQkFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekIsZ0JBQVEsQ0FBQyxDQUFDLEdBQUcsaUJBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvQixPQUFPLElBQUksR0FBRyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUVELFNBQWdCLFdBQVcsQ0FBQyxJQUFZO0lBQ3BDLE1BQU0sTUFBTSxHQUFHLDBCQUFpQixDQUFDLFlBQVksQ0FBQTtJQUM3QyxnQkFBUSxDQUFDLGdCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakMsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxN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