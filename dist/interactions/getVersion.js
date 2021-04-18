"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureLedgerAppVersionCompatible = exports.isLedgerAppVersionAtMost = exports.isLedgerAppVersionAtLeast = exports.getCompatibility = exports.getVersion = void 0;
const errors_1 = require("../errors");
const send = (params) => (Object.assign({ ins: 0 }, params));
function* getVersion() {
    const P1_UNUSED = 0x00;
    const P2_UNUSED = 0x00;
    const response = yield send({
        p1: P1_UNUSED,
        p2: P2_UNUSED,
        data: Buffer.alloc(0),
        expectedResponseLength: 4,
    });
    const [major, minor, patch, flags_value] = response;
    const FLAG_IS_DEBUG = 1;
    const flags = {
        isDebug: (flags_value & FLAG_IS_DEBUG) === FLAG_IS_DEBUG,
    };
    return { major, minor, patch, flags };
}
exports.getVersion = getVersion;
function getCompatibility(version) {
    const v2_2 = isLedgerAppVersionAtLeast(version, 2, 2) && isLedgerAppVersionAtMost(version, 2, Infinity);
    return {
        isCompatible: v2_2,
        recommendedVersion: v2_2 ? null : '2.2.0',
        supportsMary: v2_2,
    };
}
exports.getCompatibility = getCompatibility;
function isLedgerAppVersionAtLeast(version, minMajor, minMinor) {
    const { major, minor } = version;
    return major > minMajor || (major === minMajor && minor >= minMinor);
}
exports.isLedgerAppVersionAtLeast = isLedgerAppVersionAtLeast;
function isLedgerAppVersionAtMost(version, maxMajor, maxMinor) {
    const { major, minor } = version;
    return major < maxMajor || (major === maxMajor && minor <= maxMinor);
}
exports.isLedgerAppVersionAtMost = isLedgerAppVersionAtMost;
function ensureLedgerAppVersionCompatible(version) {
    const { isCompatible, recommendedVersion } = getCompatibility(version);
    if (!isCompatible) {
        throw new errors_1.DeviceVersionUnsupported(`Device app version unsupported. Please upgrade to ${recommendedVersion}.`);
    }
}
exports.ensureLedgerAppVersionCompatible = ensureLedgerAppVersionCompatible;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmFjdGlvbnMvZ2V0VmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBcUQ7QUFLckQsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUtiLEVBQWMsRUFBRSxDQUFDLGlCQUFHLEdBQUcsT0FBc0IsTUFBTSxFQUFHLENBQUE7QUFHdkQsUUFBZSxDQUFDLENBQUMsVUFBVTtJQUt6QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDO1FBQzFCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsRUFBRSxFQUFFLFNBQVM7UUFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckIsc0JBQXNCLEVBQUUsQ0FBQztLQUMxQixDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDO0lBRXBELE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQztJQUd4QixNQUFNLEtBQUssR0FBRztRQUNaLE9BQU8sRUFBRSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUMsS0FBSyxhQUFhO0tBQ3pELENBQUM7SUFDRixPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEMsQ0FBQztBQXRCRCxnQ0FzQkM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxPQUFnQjtJQUUvQyxNQUFNLElBQUksR0FBRyx5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLHdCQUF3QixDQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFdkcsT0FBTztRQUNMLFlBQVksRUFBRSxJQUFJO1FBQ2xCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPO1FBQ3pDLFlBQVksRUFBRSxJQUFJO0tBRW5CLENBQUE7QUFDSCxDQUFDO0FBVkQsNENBVUM7QUFFRCxTQUFnQix5QkFBeUIsQ0FDdkMsT0FBZ0IsRUFDaEIsUUFBZ0IsRUFDaEIsUUFBZ0I7SUFFaEIsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFakMsT0FBTyxLQUFLLEdBQUcsUUFBUSxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLENBQUM7QUFDdkUsQ0FBQztBQVJELDhEQVFDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQ3RDLE9BQWdCLEVBQ2hCLFFBQWdCLEVBQ2hCLFFBQWdCO0lBRWhCLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRWpDLE9BQU8sS0FBSyxHQUFHLFFBQVEsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFSRCw0REFRQztBQUVELFNBQWdCLGdDQUFnQyxDQUM5QyxPQUFnQjtJQUVoQixNQUFNLEVBQUUsWUFBWSxFQUFFLGtCQUFrQixFQUFFLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFdEUsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixNQUFNLElBQUksaUNBQXdCLENBQUMscURBQXFELGtCQUFrQixHQUFHLENBQUMsQ0FBQztLQUNoSDtBQUNILENBQUM7QUFSRCw0RUFRQyJ9