"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.path_to_buf = exports.buf_to_hex = exports.hex_to_buf = exports.uint64_to_buf = exports.buf_to_uint32 = exports.uint32_to_buf = exports.buf_to_uint16 = exports.uint16_to_buf = exports.uint8_to_buf = void 0;
const base_x_1 = __importDefault(require("base-x"));
const assert_1 = require("./assert");
const parse_1 = require("./parse");
const bs10 = base_x_1.default("0123456789");
function uint8_to_buf(value) {
    assert_1.assert(parse_1.isUint8(value), 'invalid uint8');
    const data = Buffer.alloc(1);
    data.writeUInt8(value, 0);
    return data;
}
exports.uint8_to_buf = uint8_to_buf;
function uint16_to_buf(value) {
    assert_1.assert(parse_1.isUint16(value), 'invalid uint16');
    const data = Buffer.alloc(2);
    data.writeUInt16BE(value, 0);
    return data;
}
exports.uint16_to_buf = uint16_to_buf;
function buf_to_uint16(data) {
    assert_1.assert(data.length === 2, "invalid uint16 buffer");
    return data.readUIntBE(0, 2);
}
exports.buf_to_uint16 = buf_to_uint16;
function uint32_to_buf(value) {
    assert_1.assert(parse_1.isUint32(value), 'invalid uint32');
    const data = Buffer.alloc(4);
    data.writeUInt32BE(value, 0);
    return data;
}
exports.uint32_to_buf = uint32_to_buf;
function buf_to_uint32(data) {
    assert_1.assert(data.length === 4, "invalid uint32 buffer");
    return data.readUIntBE(0, 4);
}
exports.buf_to_uint32 = buf_to_uint32;
function uint64_to_buf(value) {
    assert_1.assert(parse_1.isUint64str(value), 'invalid uint64_str');
    const data = bs10.decode(value);
    assert_1.assert(data.length <= 8, "excessive data");
    const padding = Buffer.alloc(8 - data.length);
    return Buffer.concat([padding, data]);
}
exports.uint64_to_buf = uint64_to_buf;
function hex_to_buf(data) {
    assert_1.assert(parse_1.isHexString(data), "invalid hex string");
    return Buffer.from(data, "hex");
}
exports.hex_to_buf = hex_to_buf;
function buf_to_hex(data) {
    return data.toString("hex");
}
exports.buf_to_hex = buf_to_hex;
function path_to_buf(path) {
    assert_1.assert(parse_1.isValidPath(path), "invalid bip32 path");
    const data = Buffer.alloc(1 + 4 * path.length);
    data.writeUInt8(path.length, 0);
    for (let i = 0; i < path.length; i++) {
        data.writeUInt32BE(path[i], 1 + i * 4);
    }
    return data;
}
exports.path_to_buf = path_to_buf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3NlcmlhbGl6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxvREFBMkI7QUFHM0IscUNBQWlDO0FBQ2pDLG1DQUE2RjtBQUc3RixNQUFNLElBQUksR0FBRyxnQkFBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRWpDLFNBQWdCLFlBQVksQ0FBQyxLQUFjO0lBQ3ZDLGVBQU0sQ0FBQyxlQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBTEQsb0NBS0M7QUFFRCxTQUFnQixhQUFhLENBQUMsS0FBeUI7SUFDbkQsZUFBTSxDQUFDLGdCQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUV6QyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFORCxzQ0FNQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFZO0lBQ3RDLGVBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO0lBRW5ELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFhLENBQUM7QUFDN0MsQ0FBQztBQUpELHNDQUlDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLEtBQW9DO0lBQzlELGVBQU0sQ0FBQyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUE7SUFFekMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3QixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBTkQsc0NBTUM7QUFFRCxTQUFnQixhQUFhLENBQUMsSUFBWTtJQUN0QyxlQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUVuRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBYSxDQUFDO0FBQzdDLENBQUM7QUFKRCxzQ0FJQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxLQUFpQjtJQUMzQyxlQUFNLENBQUMsbUJBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFBO0lBRWhELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsZUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFFM0MsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFSRCxzQ0FRQztBQUVELFNBQWdCLFVBQVUsQ0FBQyxJQUFzQztJQUM3RCxlQUFNLENBQUMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2hELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUhELGdDQUdDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLElBQVk7SUFDbkMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGRCxnQ0FFQztBQUlELFNBQWdCLFdBQVcsQ0FBQyxJQUFtQjtJQUMzQyxlQUFNLENBQUMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBRWhELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWhDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDMUM7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBVkQsa0NBVUMifQ==