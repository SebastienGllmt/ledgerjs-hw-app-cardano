/// <reference types="node" />
import type { FixlenHexString, HexString, Uint8_t, Uint16_t, Uint32_t, Uint64_str } from "../types/internal";
export declare function uint8_to_buf(value: Uint8_t): Buffer;
export declare function uint16_to_buf(value: Uint16_t | Uint8_t): Buffer;
export declare function buf_to_uint16(data: Buffer): Uint16_t;
export declare function uint32_to_buf(value: Uint32_t | Uint16_t | Uint8_t): Buffer;
export declare function buf_to_uint32(data: Buffer): Uint32_t;
export declare function uint64_to_buf(value: Uint64_str): Buffer;
export declare function hex_to_buf(data: HexString | FixlenHexString<any>): Buffer;
export declare function buf_to_hex(data: Buffer): string;
export declare function path_to_buf(path: Array<number>): Buffer;
//# sourceMappingURL=serialize.d.ts.map