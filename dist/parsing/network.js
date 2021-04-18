"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNetwork = void 0;
const invalidDataReason_1 = require("../errors/invalidDataReason");
const parse_1 = require("../utils/parse");
const parse_2 = require("../utils/parse");
function parseNetwork(network) {
    const parsed = {
        protocolMagic: parse_2.parseUint32_t(network.protocolMagic, invalidDataReason_1.InvalidDataReason.NETWORK_INVALID_PROTOCOL_MAGIC),
        networkId: parse_2.parseUint8_t(network.networkId, invalidDataReason_1.InvalidDataReason.NETWORK_INVALID_NETWORK_ID)
    };
    parse_1.validate(parsed.networkId <= 0b00001111, invalidDataReason_1.InvalidDataReason.NETWORK_INVALID_NETWORK_ID);
    return parsed;
}
exports.parseNetwork = parseNetwork;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzaW5nL25ldHdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUVBQWdFO0FBR2hFLDBDQUEwQztBQUMxQywwQ0FBNkQ7QUFFN0QsU0FBZ0IsWUFBWSxDQUFDLE9BQWdCO0lBQ3pDLE1BQU0sTUFBTSxHQUFHO1FBQ1gsYUFBYSxFQUFFLHFCQUFhLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxxQ0FBaUIsQ0FBQyw4QkFBOEIsQ0FBQztRQUNyRyxTQUFTLEVBQUUsb0JBQVksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLHFDQUFpQixDQUFDLDBCQUEwQixDQUFDO0tBQzNGLENBQUE7SUFDRCxnQkFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksVUFBVSxFQUFFLHFDQUFpQixDQUFDLDBCQUEwQixDQUFDLENBQUE7SUFDdEYsT0FBTyxNQUFNLENBQUE7QUFDakIsQ0FBQztBQVBELG9DQU9DIn0=