"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripRetcodeFromResponse = exports.chunkBy = void 0;
const assert_1 = require("./assert");
const parse_1 = require("./parse");
const serialize_1 = require("./serialize");
const sum = (arr) => arr.reduce((x, y) => x + y, 0);
function chunkBy(data, chunkLengths) {
    assert_1.assert(parse_1.isBuffer(data), "invalid buffer");
    assert_1.assert(parse_1.isArray(chunkLengths), "invalid chunks");
    for (const len of chunkLengths) {
        assert_1.assert(parse_1.isInteger(len), "bad chunk length");
        assert_1.assert(len > 0, "bad chunk length");
    }
    assert_1.assert(data.length <= sum(chunkLengths), "data too short");
    let offset = 0;
    const result = [];
    const restLength = data.length - sum(chunkLengths);
    for (let c of [...chunkLengths, restLength]) {
        result.push(data.slice(offset, offset + c));
        offset += c;
    }
    return result;
}
exports.chunkBy = chunkBy;
function stripRetcodeFromResponse(response) {
    assert_1.assert(parse_1.isBuffer(response), "invalid buffer");
    assert_1.assert(response.length >= 2, "response too short");
    const L = response.length - 2;
    const retcode = serialize_1.buf_to_uint16(response.slice(L, L + 2));
    assert_1.assert(retcode === 0x9000, `Invalid retcode ${retcode}`);
    return response.slice(0, L);
}
exports.stripRetcodeFromResponse = stripRetcodeFromResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW9IZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2lvSGVscGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBa0M7QUFDbEMsbUNBQXVEO0FBQ3ZELDJDQUE0QztBQUU1QyxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQWtCLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBRW5FLFNBQWdCLE9BQU8sQ0FBQyxJQUFZLEVBQUUsWUFBMkI7SUFDN0QsZUFBTSxDQUFDLGdCQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN6QyxlQUFNLENBQUMsZUFBTyxDQUFDLFlBQVksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDaEQsS0FBSyxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUU7UUFDNUIsZUFBTSxDQUFDLGlCQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMzQyxlQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0tBQ3ZDO0lBQ0QsZUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFFM0QsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBRWxCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRW5ELEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksRUFBRSxVQUFVLENBQUMsRUFBRTtRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVDLE1BQU0sSUFBSSxDQUFDLENBQUM7S0FDZjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFyQkQsMEJBcUJDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsUUFBZ0I7SUFDckQsZUFBTSxDQUFDLGdCQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM3QyxlQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUVuRCxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUM5QixNQUFNLE9BQU8sR0FBRyx5QkFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELGVBQU0sQ0FBQyxPQUFPLEtBQUssTUFBTSxFQUFFLG1CQUFtQixPQUFPLEVBQUUsQ0FBQyxDQUFBO0lBQ3hELE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQVJELDREQVFDIn0=