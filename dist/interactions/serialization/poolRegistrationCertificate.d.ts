/// <reference types="node" />
import type { ParsedPoolMetadata, ParsedPoolOwner, ParsedPoolParams, ParsedPoolRelay } from "../../types/internal";
export declare function serializePoolInitialParams(pool: ParsedPoolParams): Buffer;
export declare function serializePoolOwner(owner: ParsedPoolOwner): Buffer;
export declare function serializePoolRelay(relay: ParsedPoolRelay): Buffer;
export declare function serializePoolMetadata(metadata: ParsedPoolMetadata | null): Buffer;
//# sourceMappingURL=poolRegistrationCertificate.d.ts.map