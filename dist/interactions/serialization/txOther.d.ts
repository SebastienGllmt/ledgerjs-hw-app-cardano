/// <reference types="node" />
import type { HexString, ParsedInput, ParsedWithdrawal, Uint64_str, ValidBIP32Path } from "../../types/internal";
export declare function serializeTxInput(input: ParsedInput): Buffer;
export declare function serializeTxWithdrawal(withdrawal: ParsedWithdrawal): Buffer;
export declare function serializeTxFee(fee: Uint64_str): Buffer;
export declare function serializeTxTtl(ttl: Uint64_str): Buffer;
export declare function serializeTxAuxiliaryData(auxiliaryDataHashHex: HexString): Buffer;
export declare function serializeTxValidityStart(validityIntervalStart: Uint64_str): Buffer;
export declare function serializeTxWitnessRequest(path: ValidBIP32Path): Buffer;
//# sourceMappingURL=txOther.d.ts.map