"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bech32_decodeAddress = exports.bech32_encodeAddress = exports.base58_decode = exports.base58_encode = exports.stripRetcodeFromResponse = exports.chunkBy = exports.str_to_path = void 0;
const base_x_1 = __importDefault(require("base-x"));
const bech32_1 = __importDefault(require("bech32"));
const errors_1 = require("./errors");
const internal_1 = require("./types/internal");
const public_1 = require("./types/public");
const assert_1 = require("./utils/assert");
const parse_1 = require("./utils/parse");
const serialize_1 = require("./utils/serialize");
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
const sum = (arr) => arr.reduce((x, y) => x + y, 0);
function chunkBy(data, chunkLengths) {
    assert_1.assert(parse_1.isBuffer(data), "invalid buffer");
    assert_1.assert(parse_1.isArray(chunkLengths), "invalid chunks");
    for (const len of chunkLengths) {
        assert_1.assert(parse_1.isInteger(len), "bad chunk length");
        assert_1.assert(len > 0, "bad chunk length");
    }
    assert_1.assert(data.length <= sum(chunkLengths), "data too short");
    let offset = 0;
    const result = [];
    const restLength = data.length - sum(chunkLengths);
    for (let c of [...chunkLengths, restLength]) {
        result.push(data.slice(offset, offset + c));
        offset += c;
    }
    return result;
}
exports.chunkBy = chunkBy;
function stripRetcodeFromResponse(response) {
    assert_1.assert(parse_1.isBuffer(response), "invalid buffer");
    assert_1.assert(response.length >= 2, "response too short");
    const L = response.length - 2;
    const retcode = serialize_1.buf_to_uint16(response.slice(L, L + 2));
    assert_1.assert(retcode === 0x9000, `Invalid retcode ${retcode}`);
    return response.slice(0, L);
}
exports.stripRetcodeFromResponse = stripRetcodeFromResponse;
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
        case internal_1.AddressType.REWARD:
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
exports.default = {
    hex_to_buf: (data) => serialize_1.hex_to_buf(data),
    buf_to_hex: (data) => serialize_1.buf_to_hex(data),
    path_to_buf: (data) => serialize_1.path_to_buf(data),
    uint32_to_buf: (data) => serialize_1.uint32_to_buf(data),
    assert: assert_1.assert,
    str_to_path,
    base58_encode,
    base58_decode,
    bech32_encodeAddress,
    bech32_decodeAddress,
    chunkBy,
    stripRetcodeFromResponse,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsb0RBQTJCO0FBQzNCLG9EQUE0QjtBQUU1QixxQ0FBNkM7QUFDN0MsK0NBQStDO0FBQy9DLDJDQUEwQztBQUMxQywyQ0FBd0M7QUFDeEMseUNBQWtHO0FBQ2xHLGlEQUFxRztBQUVyRyxNQUFNLGVBQWUsR0FDbkIsNERBQTRELENBQUM7QUFDL0QsTUFBTSxJQUFJLEdBQUcsZ0JBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVwQyxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUVoQyxTQUFTLGVBQWUsQ0FBQyxHQUFXLEVBQUUsTUFBeUI7SUFDN0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksR0FBRyxpQkFBUSxDQUFDO0tBQ2pCO0lBQ0QsTUFBTSxDQUFDLEdBQUcsdUJBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsZ0JBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLGdCQUFRLENBQUMsQ0FBQyxHQUFHLGlCQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0IsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFnQixXQUFXLENBQUMsSUFBWTtJQUN0QyxNQUFNLE1BQU0sR0FBRywwQkFBaUIsQ0FBQyxZQUFZLENBQUE7SUFDN0MsZ0JBQVEsQ0FBQyxnQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLGdCQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FB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