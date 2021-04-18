"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializePoolMetadata = exports.serializePoolRelay = exports.serializePoolOwner = exports.serializePoolInitialParams = void 0;
const internal_1 = require("../../types/internal");
const assert_1 = require("../../utils/assert");
const serialize_1 = require("../../utils/serialize");
const SignTxIncluded = Object.freeze({
    SIGN_TX_INCLUDED_NO: 1,
    SIGN_TX_INCLUDED_YES: 2,
});
function serializePoolInitialParams(pool) {
    return Buffer.concat([
        serialize_1.hex_to_buf(pool.keyHashHex),
        serialize_1.hex_to_buf(pool.vrfHashHex),
        serialize_1.uint64_to_buf(pool.pledge),
        serialize_1.uint64_to_buf(pool.cost),
        serialize_1.uint64_to_buf(pool.margin.numerator),
        serialize_1.uint64_to_buf(pool.margin.denominator),
        serialize_1.hex_to_buf(pool.rewardAccountHex),
        serialize_1.uint32_to_buf(pool.owners.length),
        serialize_1.uint32_to_buf(pool.relays.length),
    ]);
}
exports.serializePoolInitialParams = serializePoolInitialParams;
function serializePoolOwner(owner) {
    const typeHeader = {
        [internal_1.PoolOwnerType.DEVICE_OWNED]: 1,
        [internal_1.PoolOwnerType.THIRD_PARTY]: 2,
    };
    switch (owner.type) {
        case internal_1.PoolOwnerType.DEVICE_OWNED: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(typeHeader[owner.type]),
                serialize_1.path_to_buf(owner.path)
            ]);
        }
        case internal_1.PoolOwnerType.THIRD_PARTY: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(typeHeader[owner.type]),
                serialize_1.hex_to_buf(owner.hashHex)
            ]);
        }
        default:
            assert_1.unreachable(owner);
    }
}
exports.serializePoolOwner = serializePoolOwner;
function serializePoolRelay(relay) {
    function serializeOptional(x, cb) {
        if (x == null) {
            return serialize_1.uint8_to_buf(1);
        }
        else {
            return Buffer.concat([
                serialize_1.uint8_to_buf(2),
                cb(x)
            ]);
        }
    }
    switch (relay.type) {
        case 0: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(relay.type),
                serializeOptional(relay.port, port => serialize_1.uint16_to_buf(port)),
                serializeOptional(relay.ipv4, ipv4 => ipv4),
                serializeOptional(relay.ipv6, ipv6 => ipv6)
            ]);
        }
        case 1: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(relay.type),
                serializeOptional(relay.port, port => serialize_1.uint16_to_buf(port)),
                Buffer.from(relay.dnsName, "ascii")
            ]);
        }
        case 2: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(relay.type),
                Buffer.from(relay.dnsName, "ascii")
            ]);
        }
        default:
            assert_1.unreachable(relay);
    }
}
exports.serializePoolRelay = serializePoolRelay;
function serializePoolMetadata(metadata) {
    if (metadata == null) {
        return Buffer.concat([
            serialize_1.uint8_to_buf(SignTxIncluded.SIGN_TX_INCLUDED_NO)
        ]);
    }
    else {
        return Buffer.concat([
            serialize_1.uint8_to_buf(SignTxIncluded.SIGN_TX_INCLUDED_YES),
            serialize_1.hex_to_buf(metadata.hashHex),
            Buffer.from(metadata.url, 'ascii')
        ]);
    }
}
exports.serializePoolMetadata = serializePoolMetadata;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbFJlZ2lzdHJhdGlvbkNlcnRpZmljYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9zZXJpYWxpemF0aW9uL3Bvb2xSZWdpc3RyYXRpb25DZXJ0aWZpY2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtREFBZ0U7QUFDaEUsK0NBQWlEO0FBQ2pELHFEQUEySDtBQUczSCxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2pDLG1CQUFtQixFQUFFLENBQUM7SUFDdEIsb0JBQW9CLEVBQUUsQ0FBQztDQUMxQixDQUFDLENBQUM7QUFHSCxTQUFnQiwwQkFBMEIsQ0FBQyxJQUFzQjtJQUM3RCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakIsc0JBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLHNCQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQix5QkFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIseUJBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3hCLHlCQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDcEMseUJBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN0QyxzQkFBVSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqQyx5QkFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBa0IsQ0FBQztRQUM3Qyx5QkFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBa0IsQ0FBQztLQUNoRCxDQUFDLENBQUM7QUFDUCxDQUFDO0FBWkQsZ0VBWUM7QUFFRCxTQUFnQixrQkFBa0IsQ0FBQyxLQUFzQjtJQUNyRCxNQUFNLFVBQVUsR0FBbUM7UUFDL0MsQ0FBQyx3QkFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQVk7UUFDMUMsQ0FBQyx3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