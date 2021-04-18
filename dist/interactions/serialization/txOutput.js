"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeToken = exports.serializeAssetGroup = exports.serializeTxOutputBasicParams = void 0;
const internal_1 = require("../../types/internal");
const assert_1 = require("../../utils/assert");
const serialize_1 = require("../../utils/serialize");
const addressParams_1 = require("./addressParams");
function serializeTxOutputDestination(destination) {
    const typeEncoding = {
        [internal_1.TxOutputDestinationType.THIRD_PARTY]: 1,
        [internal_1.TxOutputDestinationType.DEVICE_OWNED]: 2,
    };
    switch (destination.type) {
        case internal_1.TxOutputDestinationType.THIRD_PARTY:
            return Buffer.concat([
                serialize_1.uint8_to_buf(typeEncoding[destination.type]),
                serialize_1.uint32_to_buf(destination.addressHex.length / 2),
                serialize_1.hex_to_buf(destination.addressHex)
            ]);
        case internal_1.TxOutputDestinationType.DEVICE_OWNED:
            return Buffer.concat([
                serialize_1.uint8_to_buf(typeEncoding[destination.type]),
                addressParams_1.serializeAddressParams(destination.addressParams)
            ]);
        default:
            assert_1.unreachable(destination);
    }
}
function serializeTxOutputBasicParams(output) {
    return Buffer.concat([
        serializeTxOutputDestination(output.destination),
        serialize_1.uint64_to_buf(output.amount),
        serialize_1.uint32_to_buf(output.tokenBundle.length),
    ]);
}
exports.serializeTxOutputBasicParams = serializeTxOutputBasicParams;
function serializeAssetGroup(assetGroup) {
    return Buffer.concat([
        serialize_1.hex_to_buf(assetGroup.policyIdHex),
        serialize_1.uint32_to_buf(assetGroup.tokens.length),
    ]);
}
exports.serializeAssetGroup = serializeAssetGroup;
function serializeToken(token) {
    return Buffer.concat([
        serialize_1.uint32_to_buf(token.assetNameHex.length / 2),
        serialize_1.hex_to_buf(token.assetNameHex),
        serialize_1.uint64_to_buf(token.amount),
    ]);
}
exports.serializeToken = serializeToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhPdXRwdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW50ZXJhY3Rpb25zL3NlcmlhbGl6YXRpb24vdHhPdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbURBQStEO0FBQy9ELCtDQUFpRDtBQUNqRCxxREFBK0Y7QUFDL0YsbURBQXlEO0FBRXpELFNBQVMsNEJBQTRCLENBQUMsV0FBOEI7SUFDbEUsTUFBTSxZQUFZLEdBQUc7UUFDbkIsQ0FBQyxrQ0FBdUIsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFZO1FBQ25ELENBQUMsa0NBQXVCLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBWTtLQUNyRCxDQUFBO0lBRUQsUUFBUSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ3hCLEtBQUssa0NBQXVCLENBQUMsV0FBVztZQUN0QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ25CLHdCQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMseUJBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFhLENBQUM7Z0JBQzVELHNCQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQzthQUNuQyxDQUFDLENBQUE7UUFDSixLQUFLLGtDQUF1QixDQUFDLFlBQVk7WUFDdkMsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUNuQix3QkFBWSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLHNDQUFzQixDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7YUFDbEQsQ0FBQyxDQUFBO1FBQ0o7WUFDRSxvQkFBVyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0tBQzNCO0FBQ0gsQ0FBQztBQUVELFNBQWdCLDRCQUE0QixDQUMxQyxNQUFvQjtJQUVwQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkIsNEJBQTRCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNoRCx5QkFBYSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIseUJBQWEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQWtCLENBQUM7S0FDckQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELG9FQVFDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQ2pDLFVBQTRCO0lBRTVCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNuQixzQkFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDbEMseUJBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQWtCLENBQUM7S0FDcEQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVBELGtEQU9DO0FBRUQsU0FBZ0IsY0FBYyxDQUM1QixLQUFrQjtJQUVsQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkIseUJBQWEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFhLENBQUM7UUFDeEQsc0JBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1FBQzlCLHlCQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztLQUM1QixDQUFDLENBQUM7QUFDTCxDQUFDO0FBUkQsd0NBUUMifQ==