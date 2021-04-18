"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAddress = void 0;
const errors_1 = require("../errors");
const invalidDataReason_1 = require("../errors/invalidDataReason");
const internal_1 = require("../types/internal");
const parse_1 = require("../utils/parse");
const network_1 = require("./network");
function parseAddress(network, address) {
    const parsedNetwork = network_1.parseNetwork(network);
    const params = address.params;
    if (address.type === internal_1.AddressType.BYRON) {
        parse_1.validate(params.stakingBlockchainPointer == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
        parse_1.validate(params.stakingKeyHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
        parse_1.validate(params.stakingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
        return {
            type: address.type,
            protocolMagic: parsedNetwork.protocolMagic,
            spendingPath: parse_1.parseBIP32Path(address.params.spendingPath, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_PATH),
            stakingChoice: { type: "no_staking" }
        };
    }
    const networkId = parsedNetwork.networkId;
    const spendingPath = parse_1.parseBIP32Path(address.params.spendingPath, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_SPENDING_PATH);
    switch (address.type) {
        case internal_1.AddressType.BASE: {
            parse_1.validate(params.stakingBlockchainPointer == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            const _hash = params.stakingKeyHashHex != null ? 'hash' : '';
            const _path = params.stakingPath != null ? 'path' : '';
            switch (_hash + _path) {
                case 'hash': {
                    const hashHex = parse_1.parseHexStringOfLength(params.stakingKeyHashHex, internal_1.KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_KEY_HASH);
                    return {
                        type: address.type,
                        networkId,
                        spendingPath,
                        stakingChoice: {
                            type: "staking_key_hash",
                            hashHex,
                        }
                    };
                }
                case 'path': {
                    const path = parse_1.parseBIP32Path(params.stakingPath, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_KEY_PATH);
                    return {
                        type: address.type,
                        networkId,
                        spendingPath,
                        stakingChoice: {
                            type: "staking_key_path",
                            path,
                        }
                    };
                }
                default:
                    throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            }
        }
        case internal_1.AddressType.ENTERPRISE: {
            parse_1.validate(params.stakingBlockchainPointer == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            parse_1.validate(params.stakingKeyHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            parse_1.validate(params.stakingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            return {
                type: address.type,
                networkId,
                spendingPath,
                stakingChoice: {
                    type: "no_staking",
                }
            };
        }
        case internal_1.AddressType.POINTER: {
            parse_1.validate(params.stakingKeyHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            parse_1.validate(params.stakingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            parse_1.validate(params.stakingBlockchainPointer != null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_BLOCKCHAIN_POINTER);
            const pointer = params.stakingBlockchainPointer;
            return {
                type: address.type,
                networkId,
                spendingPath,
                stakingChoice: {
                    type: "blockchain_pointer",
                    pointer: {
                        blockIndex: parse_1.parseUint32_t(pointer.blockIndex, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_BLOCKCHAIN_POINTER),
                        txIndex: parse_1.parseUint32_t(pointer.txIndex, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_BLOCKCHAIN_POINTER),
                        certificateIndex: parse_1.parseUint32_t(pointer.certificateIndex, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_BLOCKCHAIN_POINTER)
                    },
                }
            };
        }
        case internal_1.AddressType.REWARD: {
            parse_1.validate(params.stakingBlockchainPointer == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            parse_1.validate(params.stakingKeyHashHex == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            parse_1.validate(params.stakingPath == null, invalidDataReason_1.InvalidDataReason.ADDRESS_INVALID_STAKING_INFO);
            return {
                type: address.type,
                networkId,
                spendingPath,
                stakingChoice: {
                    type: "no_staking"
                }
            };
        }
        default:
            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.ADDRESS_UNKNOWN_TYPE);
    }
}
exports.parseAddress = parseAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzaW5nL2FkZHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0NBQXdDO0FBQ3hDLG1FQUFnRTtBQUVoRSxnREFBb0Y7QUFFcEYsMENBQWlHO0FBQ2pHLHVDQUF5QztBQUV6QyxTQUFnQixZQUFZLENBQ3hCLE9BQWdCLEVBQ2hCLE9BQTJCO0lBRTNCLE1BQU0sYUFBYSxHQUFHLHNCQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7SUFHM0MsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BSXRCLENBQUE7SUFFRCxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssc0JBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDcEMsZ0JBQVEsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLElBQUksSUFBSSxFQUFFLHFDQUFpQixDQUFDLDRCQUE0QixDQUFDLENBQUE7UUFDakcsZ0JBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLElBQUksSUFBSSxFQUFFLHFDQUFpQixDQUFDLDRCQUE0QixDQUFDLENBQUE7UUFDMUYsZ0JBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLElBQUksRUFBRSxxQ0FBaUIsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1FBRXBGLE9BQU87WUFDSCxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7WUFDbEIsYUFBYSxFQUFFLGFBQWEsQ0FBQyxhQUFhO1lBQzFDLFlBQVksRUFBRSxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLHFDQUFpQixDQUFDLDZCQUE2QixDQUFDO1lBQzFHLGFBQWEsRUFBRSxFQUFFLElBQUksY0FBOEIsRUFBRTtTQUN4RCxDQUFBO0tBQ0o7SUFFRCxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFBO0lBQ3pDLE1BQU0sWUFBWSxHQUFHLHNCQUFjLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVB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