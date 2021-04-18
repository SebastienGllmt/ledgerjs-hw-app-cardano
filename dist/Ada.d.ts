/// <reference types="node" />
/// <reference types="ledgerhq__hw-transport" />
import type Transport from "@ledgerhq/hw-transport";
import { InvalidDataReason } from "./errors/invalidDataReason";
import type { Interaction, SendParams } from './interactions/common/types';
import type { ParsedAddressParams, ParsedSigningRequest, ValidBIP32Path } from './types/internal';
import type { BIP32Path, DerivedAddress, DeviceCompatibility, DeviceOwnedAddress, ExtendedPublicKey, Network, Serial, SignedTransactionData, SignTransactionRequest, Transaction, Version } from './types/public';
import { AddressType, CertificateType, RelayType, TransactionSigningMode } from "./types/public";
import utils from "./utils";
export * from './errors';
export * from './types/public';
export declare type SendFn = (params: SendParams) => Promise<Buffer>;
export declare class Ada {
    transport: Transport<string>;
    _send: SendFn;
    constructor(transport: Transport<string>, scrambleKey?: string);
    getVersion(): Promise<GetVersionResponse>;
    _getVersion(): Interaction<Version>;
    getSerial(): Promise<GetSerialResponse>;
    _getSerial(): Interaction<GetSerialResponse>;
    runTests(): Promise<void>;
    _runTests(): Interaction<void>;
    getExtendedPublicKeys({ paths }: GetExtendedPublicKeysRequest): Promise<GetExtendedPublicKeysResponse>;
    _getExtendedPublicKeys(paths: ValidBIP32Path[]): Generator<SendParams, ExtendedPublicKey[], Buffer>;
    getExtendedPublicKey({ path }: GetExtendedPublicKeyRequest): Promise<GetExtendedPublicKeyResponse>;
    deriveAddress({ network, address }: DeriveAddressRequest): Promise<DeriveAddressResponse>;
    _deriveAddress(addressParams: ParsedAddressParams): Interaction<DerivedAddress>;
    showAddress({ network, address }: ShowAddressRequest): Promise<void>;
    _showAddress(addressParams: ParsedAddressParams): Interaction<void>;
    signTransaction(request: SignTransactionRequest): Promise<SignTransactionResponse>;
    _signTx(request: ParsedSigningRequest): Interaction<SignedTransactionData>;
}
export declare type GetVersionResponse = {
    version: Version;
    compatibility: DeviceCompatibility;
};
export declare type GetExtendedPublicKeysRequest = {
    paths: BIP32Path[];
};
export declare type GetExtendedPublicKeysResponse = Array<ExtendedPublicKey>;
export declare type GetExtendedPublicKeyRequest = {
    path: BIP32Path;
};
export declare type GetExtendedPublicKeyResponse = ExtendedPublicKey;
export declare type DeriveAddressRequest = {
    network: Network;
    address: DeviceOwnedAddress;
};
export declare type DeriveAddressResponse = DerivedAddress;
export declare type ShowAddressRequest = DeriveAddressRequest;
export declare type GetSerialResponse = Serial;
export declare type SignTransactionResponse = SignedTransactionData;
export type { Transaction, DeviceOwnedAddress };
export { AddressType, CertificateType, RelayType, InvalidDataReason, TransactionSigningMode, utils };
export default Ada;
export declare const Networks: {
    Mainnet: Network;
    Testnet: Network;
};
//# sourceMappingURL=Ada.d.ts.map