/// <reference types="node" />
import { assert } from "./utils/assert";
export declare function str_to_path(data: string): Array<number>;
export declare function chunkBy(data: Buffer, chunkLengths: Array<number>): Buffer[];
export declare function stripRetcodeFromResponse(response: Buffer): Buffer;
export declare function base58_encode(data: Buffer): string;
export declare function base58_decode(data: string): Buffer;
export declare function bech32_encodeAddress(data: Buffer): string;
export declare function bech32_decodeAddress(data: string): Buffer;
declare const _default: {
    hex_to_buf: (data: any) => Buffer;
    buf_to_hex: (data: any) => string;
    path_to_buf: (data: any) => Buffer;
    uint32_to_buf: (data: any) => Buffer;
    assert: typeof assert;
    str_to_path: typeof str_to_path;
    base58_encode: typeof base58_encode;
    base58_decode: typeof base58_decode;
    bech32_encodeAddress: typeof bech32_encodeAddress;
    bech32_decodeAddress: typeof bech32_decodeAddress;
    chunkBy: typeof chunkBy;
    stripRetcodeFromResponse: typeof stripRetcodeFromResponse;
};
export default _default;
//# sourceMappingURL=utils.d.ts.map