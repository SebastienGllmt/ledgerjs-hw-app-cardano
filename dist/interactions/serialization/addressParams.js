"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeAddressParams = void 0;
const internal_1 = require("../../types/internal");
const serialize_1 = require("../../utils/serialize");
function serializeStakingChoice(stakingChoice) {
    const stakingChoicesEncoding = {
        ["no_staking"]: 0x11,
        ["staking_key_path"]: 0x22,
        ["staking_key_hash"]: 0x33,
        ["blockchain_pointer"]: 0x44,
    };
    switch (stakingChoice.type) {
        case "no_staking": {
            return Buffer.concat([
                serialize_1.uint8_to_buf(stakingChoicesEncoding[stakingChoice.type])
            ]);
        }
        case "staking_key_hash": {
            return Buffer.concat([
                serialize_1.uint8_to_buf(stakingChoicesEncoding[stakingChoice.type]),
                serialize_1.hex_to_buf(stakingChoice.hashHex)
            ]);
        }
        case "staking_key_path": {
            return Buffer.concat([
                serialize_1.uint8_to_buf(stakingChoicesEncoding[stakingChoice.type]),
                serialize_1.path_to_buf(stakingChoice.path)
            ]);
        }
        case "blockchain_pointer": {
            return Buffer.concat([
                serialize_1.uint8_to_buf(stakingChoicesEncoding[stakingChoice.type]),
                serialize_1.uint32_to_buf(stakingChoice.pointer.blockIndex),
                serialize_1.uint32_to_buf(stakingChoice.pointer.txIndex),
                serialize_1.uint32_to_buf(stakingChoice.pointer.certificateIndex)
            ]);
        }
    }
}
function serializeAddressParams(params) {
    return Buffer.concat([
        serialize_1.uint8_to_buf(params.type),
        params.type === internal_1.AddressType.BYRON
            ? serialize_1.uint32_to_buf(params.protocolMagic)
            : serialize_1.uint8_to_buf(params.networkId),
        serialize_1.path_to_buf(params.spendingPath),
        serializeStakingChoice(params.stakingChoice)
    ]);
}
exports.serializeAddressParams = serializeAddressParams;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc1BhcmFtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnRlcmFjdGlvbnMvc2VyaWFsaXphdGlvbi9hZGRyZXNzUGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1EQUF1RTtBQUN2RSxxREFBOEY7QUFFOUYsU0FBUyxzQkFBc0IsQ0FBQyxhQUE0QjtJQUN4RCxNQUFNLHNCQUFzQixHQUFHO1FBQzNCLGNBQThCLEVBQUUsSUFBSTtRQUNwQyxvQkFBb0MsRUFBRSxJQUFJO1FBQzFDLG9CQUFvQyxFQUFFLElBQUk7UUFDMUMsc0JBQXNDLEVBQUUsSUFBSTtLQUN0QyxDQUFDO0lBRVgsUUFBUSxhQUFhLENBQUMsSUFBSSxFQUFFO1FBQ3hCLGlCQUFpQyxDQUFDLENBQUM7WUFDL0IsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNqQix3QkFBWSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQVksQ0FBQzthQUN0RSxDQUFDLENBQUE7U0FDTDtRQUNELHVCQUF1QyxDQUFDLENBQUM7WUFDckMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNqQix3QkFBWSxDQUFDLHNCQUFzQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQVksQ0FBQztnQkFDbkUsc0JBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO2FBQ3BDLENBQUMsQ0FBQTtTQUNMO1FBQ0QsdUJBQXVDLENBQUMsQ0FBQztZQUNyQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLHdCQUFZLENBQUMsc0JBQXNCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBWSxDQUFDO2dCQUNuRSx1QkFBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7YUFDbEMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCx5QkFBeUMsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDakIsd0JBQVksQ0FBQyxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFZLENBQUM7Z0JBQ25FLHlCQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7Z0JBQy9DLHlCQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQzVDLHlCQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQzthQUN4RCxDQUFDLENBQUE7U0FDTDtLQUNKO0FBQ0wsQ0FBQztBQUVELFNBQWdCLHNCQUFzQixDQUNsQyxNQUEyQjtJQUUzQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakIsd0JBQVksQ0FBQyxNQUFNLENBQUMsSUFBZSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLEtBQUssc0JBQVcsQ0FBQyxLQUFLO1lBQzdCLENBQUMsQ0FBQyx5QkFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7WUFDckMsQ0FBQyxDQUFDLHdCQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNwQyx1QkFBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDaEMsc0JBQXNCLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztLQUMvQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBWEQsd0RBV0MifQ==