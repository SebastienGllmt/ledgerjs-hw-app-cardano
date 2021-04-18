import type { DeviceCompatibility, Version } from "../types/internal";
import type { Interaction } from "./common/types";
export declare function getVersion(): Interaction<Version>;
export declare function getCompatibility(version: Version): DeviceCompatibility;
export declare function isLedgerAppVersionAtLeast(version: Version, minMajor: number, minMinor: number): boolean;
export declare function isLedgerAppVersionAtMost(version: Version, maxMajor: number, maxMinor: number): boolean;
export declare function ensureLedgerAppVersionCompatible(version: Version): void;
//# sourceMappingURL=getVersion.d.ts.map