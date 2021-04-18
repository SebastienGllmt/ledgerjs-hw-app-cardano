/// <reference types="node" />
import type { InvalidDataReason } from "../errors/index";
import type { _Uint64_bigint, _Uint64_num, FixlenHexString, HexString, Uint8_t, Uint16_t, Uint32_t, Uint64_str, ValidBIP32Path, VarlenAsciiString } from "../types/internal";
export declare const MAX_UINT_64_STR = "18446744073709551615";
export declare const isString: (data: unknown) => data is string;
export declare const isInteger: (data: unknown) => data is number;
export declare const isArray: (data: unknown) => data is unknown[];
export declare const isBuffer: (data: unknown) => data is Buffer;
export declare const isUint32: (data: unknown) => data is Uint32_t;
export declare const isUint16: (data: unknown) => data is Uint16_t;
export declare const isUint8: (data: unknown) => data is Uint8_t;
export declare const isHexString: (data: unknown) => data is HexString;
export declare const isHexStringOfLength: <L extends number>(data: unknown, expectedByteLength: L) => data is FixlenHexString<L>;
export declare const isValidPath: (data: unknown) => data is ValidBIP32Path;
export declare const isUint64str: (data: unknown) => data is Uint64_str;
export declare const isUint64Number: (data: unknown) => data is _Uint64_num;
export declare const isUint64Bigint: (data: unknown) => data is _Uint64_bigint;
export declare const isUintStr: (data: unknown, constraints: {
    min?: string;
    max?: string;
}) => data is string;
export declare function validate(cond: boolean, errMsg: InvalidDataReason): asserts cond;
export declare function parseAscii(str: unknown, errMsg: InvalidDataReason): VarlenAsciiString;
export declare function parseHexString(str: unknown, errMsg: InvalidDataReason): HexString;
export declare function parseHexStringOfLength<L extends number>(str: unknown, length: L, errMsg: InvalidDataReason): FixlenHexString<L>;
export declare function parseUint64_str(val: unknown, constraints: {
    min?: string;
    max?: string;
}, errMsg: InvalidDataReason): Uint64_str;
export declare function parseUint32_t(value: unknown, errMsg: InvalidDataReason): Uint32_t;
export declare function parseUint16_t(value: unknown, errMsg: InvalidDataReason): Uint16_t;
export declare function parseUint8_t(value: number, errMsg: InvalidDataReason): Uint8_t;
export declare function parseBIP32Path(value: unknown, errMsg: InvalidDataReason): ValidBIP32Path;
export declare function parseIntFromStr(str: string, errMsg: InvalidDataReason): number;
//# sourceMappingURL=parse.d.ts.map