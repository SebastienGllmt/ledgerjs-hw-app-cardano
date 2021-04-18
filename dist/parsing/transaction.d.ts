import type { ParsedSigningRequest, ParsedTransaction } from "../types/internal";
import type { SignTransactionRequest, Transaction } from "../types/public";
import { TransactionSigningMode } from "../types/public";
export declare function parseTransaction(tx: Transaction): ParsedTransaction;
export declare function parseSigningMode(mode: TransactionSigningMode): TransactionSigningMode;
export declare function parseSignTransactionRequest(request: SignTransactionRequest): ParsedSigningRequest;
//# sourceMappingURL=transaction.d.ts.map