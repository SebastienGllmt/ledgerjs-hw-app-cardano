"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveAddress = void 0;
const addressParams_1 = require("./serialization/addressParams");
const send = (params) => (Object.assign({ ins: 17 }, params));
function* deriveAddress(_version, addressParams) {
    const P1_RETURN = 0x01;
    const P2_UNUSED = 0x00;
    const response = yield send({
        p1: P1_RETURN,
        p2: P2_UNUSED,
        data: addressParams_1.serializeAddressParams(addressParams),
    });
    return {
        addressHex: response.toString("hex"),
    };
}
exports.deriveAddress = deriveAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVyaXZlQWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnRlcmFjdGlvbnMvZGVyaXZlQWRkcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxpRUFBdUU7QUFFdkUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUtiLEVBQWMsRUFBRSxDQUFDLGlCQUFHLEdBQUcsUUFBeUIsTUFBTSxFQUFHLENBQUE7QUFFMUQsUUFBZSxDQUFDLENBQUMsYUFBYSxDQUM1QixRQUFpQixFQUNqQixhQUFrQztJQUVsQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDO1FBQzFCLEVBQUUsRUFBRSxTQUFTO1FBQ2IsRUFBRSxFQUFFLFNBQVM7UUFDYixJQUFJLEVBQUUsc0NBQXNCLENBQUMsYUFBYSxDQUFDO0tBQzVDLENBQUMsQ0FBQztJQUVILE9BQU87UUFDTCxVQUFVLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7S0FDckMsQ0FBQztBQUNKLENBQUM7QUFoQkQsc0NBZ0JDIn0=