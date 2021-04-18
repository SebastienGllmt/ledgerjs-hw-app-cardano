export declare type bigint_like = number | bigint | string;
export declare enum AddressType {
    BASE = 0,
    POINTER = 4,
    ENTERPRISE = 6,
    BYRON = 8,
    REWARD = 14
}
export declare enum CertificateType {
    STAKE_REGISTRATION = 0,
    STAKE_DEREGISTRATION = 1,
    STAKE_DELEGATION = 2,
    STAKE_POOL_REGISTRATION = 3
}
export declare const enum RelayType {
    SINGLE_HOST_IP_ADDR = 0,
    SINGLE_HOST_HOSTNAME = 1,
    MULTI_HOST = 2
}
export declare const HARDENED = 2147483648;
export declare type BIP32Path = Array<number>;
export declare type Network = {
    protocolMagic: number;
    networkId: number;
};
export declare type DeviceOwnedAddress = {
    type: AddressType.BYRON;
    params: AddressParamsByron;
} | {
    type: AddressType.BASE;
    params: AddressParamsBase;
} | {
    type: AddressType.ENTERPRISE;
    params: AddressParamsEnterprise;
} | {
    type: AddressType.POINTER;
    params: AddressParamsPointer;
} | {
    type: AddressType.REWARD;
    params: AddressParamsReward;
};
export declare type AddressParamsByron = {
    spendingPath: BIP32Path;
};
export declare type AddressParamsBase = {
    spendingPath: BIP32Path;
} & AddressParamsBaseStaking;
export declare type AddressParamsBaseStaking = {
    stakingPath: BIP32Path;
} | {
    stakingKeyHashHex: string;
};
export declare type AddressParamsEnterprise = {
    spendingPath: BIP32Path;
};
export declare type AddressParamsPointer = {
    spendingPath: BIP32Path;
    stakingBlockchainPointer: BlockchainPointer;
};
export declare type AddressParamsReward = {
    spendingPath: BIP32Path;
};
export declare type TxInput = {
    txHashHex: string;
    outputIndex: number;
    path: BIP32Path | null;
};
export declare type Token = {
    assetNameHex: string;
    amount: bigint_like;
};
export declare type AssetGroup = {
    policyIdHex: string;
    tokens: Array<Token>;
};
export declare type TxOutput = {
    amount: bigint_like;
    tokenBundle?: Array<AssetGroup> | null;
    destination: TxOutputDestination;
};
export declare enum TxOutputDestinationType {
    THIRD_PARTY = "third_party",
    DEVICE_OWNED = "device_owned"
}
export declare type ThirdPartyAddressParams = {
    addressHex: string;
};
export declare type TxOutputDestination = {
    type: TxOutputDestinationType.THIRD_PARTY;
    params: ThirdPartyAddressParams;
} | {
    type: TxOutputDestinationType.DEVICE_OWNED;
    params: DeviceOwnedAddress;
};
export declare type BlockchainPointer = {
    blockIndex: number;
    txIndex: number;
    certificateIndex: number;
};
export declare enum PoolOwnerType {
    THIRD_PARTY = "third_party",
    DEVICE_OWNED = "device_owned"
}
export declare type PoolOwner = {
    type: PoolOwnerType.THIRD_PARTY;
    params: PoolOwnerThirdPartyParams;
} | {
    type: PoolOwnerType.DEVICE_OWNED;
    params: PoolOwnerDeviceOwnedParams;
};
export declare type PoolOwnerThirdPartyParams = {
    stakingKeyHashHex: string;
};
export declare type PoolOwnerDeviceOwnedParams = {
    stakingPath: BIP32Path;
};
export declare type SingleHostIpAddrRelayParams = {
    portNumber?: number | null;
    ipv4?: string | null;
    ipv6?: string | null;
};
export declare type SingleHostHostnameRelayParams = {
    portNumber?: number | null;
    dnsName: string;
};
export declare type MultiHostRelayParams = {
    dnsName: string;
};
export declare type Relay = {
    type: RelayType.SINGLE_HOST_IP_ADDR;
    params: SingleHostIpAddrRelayParams;
} | {
    type: RelayType.SINGLE_HOST_HOSTNAME;
    params: SingleHostHostnameRelayParams;
} | {
    type: RelayType.MULTI_HOST;
    params: MultiHostRelayParams;
};
export declare type PoolMetadataParams = {
    metadataUrl: string;
    metadataHashHex: string;
};
export declare type Margin = {
    numerator: bigint_like;
    denominator: bigint_like;
};
export declare type PoolRegistrationParams = {
    poolKeyHashHex: string;
    vrfKeyHashHex: string;
    pledge: bigint_like;
    cost: bigint_like;
    margin: Margin;
    rewardAccountHex: string;
    poolOwners: Array<PoolOwner>;
    relays: Array<Relay>;
    metadata?: PoolMetadataParams | null;
};
export declare type StakeRegistrationParams = {
    path: BIP32Path;
};
export declare type StakeDeregistrationParams = {
    path: BIP32Path;
};
export declare type StakeDelegationParams = {
    path: BIP32Path;
    poolKeyHashHex: string;
};
export declare type Certificate = {
    type: CertificateType.STAKE_REGISTRATION;
    params: StakeRegistrationParams;
} | {
    type: CertificateType.STAKE_DEREGISTRATION;
    params: StakeDeregistrationParams;
} | {
    type: CertificateType.STAKE_DELEGATION;
    params: StakeDelegationParams;
} | {
    type: CertificateType.STAKE_POOL_REGISTRATION;
    params: PoolRegistrationParams;
};
export declare type Withdrawal = {
    path: BIP32Path;
    amount: bigint_like;
};
export declare type Flags = {
    isDebug: boolean;
};
export declare type Version = {
    major: number;
    minor: number;
    patch: number;
    flags: Flags;
};
export declare type DeviceCompatibility = {
    isCompatible: boolean;
    recommendedVersion: string | null;
    supportsMary: boolean;
};
export declare type Serial = {
    serial: string;
};
export declare type DerivedAddress = {
    addressHex: string;
};
export declare type ExtendedPublicKey = {
    publicKeyHex: string;
    chainCodeHex: string;
};
export declare type Witness = {
    path: BIP32Path;
    witnessSignatureHex: string;
};
export declare type SignedTransactionData = {
    txHashHex: string;
    witnesses: Array<Witness>;
};
export declare enum TxAuxiliaryDataType {
    ARBITRARY_HASH = "arbitrary_hash"
}
export declare type TxAuxiliaryData = {
    type: TxAuxiliaryDataType.ARBITRARY_HASH;
    params: TxAuxiliaryDataArbitraryHashParams;
};
export declare type TxAuxiliaryDataArbitraryHashParams = {
    hashHex: string;
};
export declare type Transaction = {
    network: Network;
    inputs: Array<TxInput>;
    outputs: Array<TxOutput>;
    fee: bigint_like;
    ttl?: bigint_like | null;
    certificates?: Array<Certificate> | null;
    withdrawals?: Array<Withdrawal> | null;
    auxiliaryData?: TxAuxiliaryData | null;
    validityIntervalStart?: bigint_like | null;
};
export declare enum TransactionSigningMode {
    ORDINARY_TRANSACTION = "ordinary_transaction",
    POOL_REGISTRATION_AS_OWNER = "pool_registration_as_owner",
    __RESEVED_POOL_REGISTRATION_AS_OPERATOR = "__pool_registration_as_operator"
}
export declare type SignTransactionRequest = {
    signingMode: TransactionSigningMode;
    tx: Transaction;
};
//# sourceMappingURL=public.d.ts.map