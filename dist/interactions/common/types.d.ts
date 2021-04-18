/// <reference types="node" />
export declare type SendParams = {
    ins: number;
    p1: number;
    p2: number;
    data: Buffer;
    expectedResponseLength?: number;
};
export declare type Interaction<RetValue> = Generator<SendParams, RetValue, Buffer>;
//# sourceMappingURL=types.d.ts.map