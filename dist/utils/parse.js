"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseIntFromStr = exports.parseBIP32Path = exports.parseUint8_t = exports.parseUint16_t = exports.parseUint32_t = exports.parseUint64_str = exports.parseHexStringOfLength = exports.parseHexString = exports.parseAscii = exports.validate = exports.isUintStr = exports.isUint64Bigint = exports.isUint64Number = exports.isUint64str = exports.isValidPath = exports.isHexStringOfLength = exports.isHexString = exports.isUint8 = exports.isUint16 = exports.isUint32 = exports.isBuffer = exports.isArray = exports.isInteger = exports.isString = exports.MAX_UINT_64_STR = void 0;
const errors_1 = require("../errors");
exports.MAX_UINT_64_STR = "18446744073709551615";
const isString = (data) => typeof data === "string";
exports.isString = isString;
const isInteger = (data) => Number.isInteger(data);
exports.isInteger = isInteger;
const isArray = (data) => Array.isArray(data);
exports.isArray = isArray;
const isBuffer = (data) => Buffer.isBuffer(data);
exports.isBuffer = isBuffer;
const isUint32 = (data) => exports.isInteger(data) && data >= 0 && data <= 4294967295;
exports.isUint32 = isUint32;
const isUint16 = (data) => exports.isInteger(data) && data >= 0 && data <= 65535;
exports.isUint16 = isUint16;
const isUint8 = (data) => exports.isInteger(data) && data >= 0 && data <= 255;
exports.isUint8 = isUint8;
const isHexString = (data) => exports.isString(data) && data.length % 2 === 0 && /^[0-9a-fA-F]*$/.test(data);
exports.isHexString = isHexString;
const isHexStringOfLength = (data, expectedByteLength) => exports.isHexString(data) && data.length === expectedByteLength * 2;
exports.isHexStringOfLength = isHexStringOfLength;
const isValidPath = (data) => exports.isArray(data) && data.every(x => exports.isUint32(x)) && data.length < 10;
exports.isValidPath = isValidPath;
const isUint64str = (data) => exports.isUintStr(data, {});
exports.isUint64str = isUint64str;
const isUint64Number = (data) => exports.isInteger(data) && data >= 0 && data <= Number.MAX_SAFE_INTEGER;
exports.isUint64Number = isUint64Number;
const isUint64Bigint = (data) => (typeof data === 'bigint') && exports.isUint64str(data.toString());
exports.isUint64Bigint = isUint64Bigint;
const isUintStr = (data, constraints) => {
    var _a, _b;
    const min = (_a = constraints.min) !== null && _a !== void 0 ? _a : "0";
    const max = (_b = constraints.max) !== null && _b !== void 0 ? _b : exports.MAX_UINT_64_STR;
    return exports.isString(data)
        && /^[0-9]*$/.test(data)
        && data.length > 0
        && data.length <= max.length
        && (data.length === 0 || data[0] !== "0")
        && (data.length < max.length ||
            data <= max) && (data.length > min.length ||
        data >= min);
};
exports.isUintStr = isUintStr;
function validate(cond, errMsg) {
    if (!cond)
        throw new errors_1.InvalidData(errMsg);
}
exports.validate = validate;
function parseAscii(str, errMsg) {
    validate(exports.isString(str), errMsg);
    validate(str.split("").every((c) => c.charCodeAt(0) >= 32 && c.charCodeAt(0) <= 126), errMsg);
    return str;
}
exports.parseAscii = parseAscii;
function parseHexString(str, errMsg) {
    validate(exports.isHexString(str), errMsg);
    return str;
}
exports.parseHexString = parseHexString;
function parseHexStringOfLength(str, length, errMsg) {
    validate(exports.isHexStringOfLength(str, length), errMsg);
    return str;
}
exports.parseHexStringOfLength = parseHexStringOfLength;
function parseUint64_str(val, constraints, errMsg) {
    switch (typeof val) {
        case 'string':
            validate(exports.isUint64str(val) && exports.isUintStr(val, constraints), errMsg);
            return val;
        case 'number':
            validate(exports.isUint64Number(val) && exports.isUintStr(val.toString(), constraints), errMsg);
            return val.toString();
        case 'bigint':
            validate(exports.isUint64Bigint(val) && exports.isUintStr(val.toString(), constraints), errMsg);
            return val.toString();
        default:
            validate(false, errMsg);
    }
}
exports.parseUint64_str = parseUint64_str;
function parseUint32_t(value, errMsg) {
    validate(exports.isUint32(value), errMsg);
    return value;
}
exports.parseUint32_t = parseUint32_t;
function parseUint16_t(value, errMsg) {
    validate(exports.isUint16(value), errMsg);
    return value;
}
exports.parseUint16_t = parseUint16_t;
function parseUint8_t(value, errMsg) {
    validate(exports.isUint8(value), errMsg);
    return value;
}
exports.parseUint8_t = parseUint8_t;
function parseBIP32Path(value, errMsg) {
    validate(exports.isValidPath(value), errMsg);
    return value;
}
exports.parseBIP32Path = parseBIP32Path;
function parseIntFromStr(str, errMsg) {
    validate(exports.isString(str), errMsg);
    const i = parseInt(str);
    validate("" + i === str, errMsg);
    validate(!isNaN(i), errMsg);
    validate(exports.isInteger(i), errMsg);
    return i;
}
exports.parseIntFromStr = parseIntFromStr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcGFyc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0NBQXdDO0FBRzNCLFFBQUEsZUFBZSxHQUFHLHNCQUFzQixDQUFDO0FBRS9DLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBYSxFQUFrQixFQUFFLENBQ3RELE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQTtBQURmLFFBQUEsUUFBUSxZQUNPO0FBRXJCLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBYSxFQUFrQixFQUFFLENBQ3ZELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7QUFEYixRQUFBLFNBQVMsYUFDSTtBQUVuQixNQUFNLE9BQU8sR0FBRyxDQUFDLElBQWEsRUFBMEIsRUFBRSxDQUM3RCxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBRFYsUUFBQSxPQUFPLFdBQ0c7QUFFaEIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFhLEVBQWtCLEVBQUUsQ0FDdEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQURaLFFBQUEsUUFBUSxZQUNJO0FBRWxCLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBYSxFQUFvQixFQUFFLENBQ3hELGlCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksVUFBVSxDQUFBO0FBRHpDLFFBQUEsUUFBUSxZQUNpQztBQUUvQyxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQWEsRUFBb0IsRUFBRSxDQUN4RCxpQkFBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQTtBQURwQyxRQUFBLFFBQVEsWUFDNEI7QUFFMUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFhLEVBQW1CLEVBQUUsQ0FDdEQsaUJBQVMsQ0FBQyxJQUFJLENBQUMs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