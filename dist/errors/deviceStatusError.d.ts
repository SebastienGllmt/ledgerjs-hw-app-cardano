import { ErrorBase } from "./errorBase";
export declare const DeviceStatusCodes: {
    ERR_STILL_IN_CALL: 28164;
    ERR_INVALID_DATA: 28167;
    ERR_INVALID_BIP_PATH: 28168;
    ERR_REJECTED_BY_USER: 28169;
    ERR_REJECTED_BY_POLICY: 28176;
    ERR_DEVICE_LOCKED: 28177;
    ERR_UNSUPPORTED_ADDRESS_TYPE: 28178;
    ERR_CLA_NOT_SUPPORTED: 28160;
};
export declare class DeviceStatusError extends ErrorBase {
    code: number;
    constructor(code: number);
}
//# sourceMappingURL=deviceStatusError.d.ts.map