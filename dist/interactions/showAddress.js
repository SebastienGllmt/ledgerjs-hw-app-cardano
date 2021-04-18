"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAddress = void 0;
const getVersion_1 = require("./getVersion");
const addressParams_1 = require("./serialization/addressParams");
const send = (params) => (Object.assign({ ins: 17 }, params));
function* showAddress(version, addressParams) {
    getVersion_1.ensureLedgerAppVersionCompatible(version);
    const P1_DISPLAY = 0x02;
    const P2_UNUSED = 0x00;
    yield send({
        p1: P1_DISPLAY,
        p2: P2_UNUSED,
        data: addressParams_1.serializeAddressParams(addressParams),
        expectedResponseLength: 0,
    });
}
exports.showAddress = showAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvd0FkZHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZXJhY3Rpb25zL3Nob3dBZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLDZDQUFnRTtBQUNoRSxpRUFBdUU7QUFFdkUsTUFBTSxJQUFJLEdBQUcsQ0FBQyxNQUtiLEVBQWMsRUFBRSxDQUFDLGlCQUFHLEdBQUcsUUFBeUIsTUFBTSxFQUFHLENBQUE7QUFHMUQsUUFBZSxDQUFDLENBQUMsV0FBVyxDQUMxQixPQUFnQixFQUNoQixhQUFrQztJQUVsQyw2Q0FBZ0MsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN6QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDeEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXZCLE1BQU0sSUFBSSxDQUFDO1FBQ1QsRUFBRSxFQUFFLFVBQVU7UUFDZCxFQUFFLEVBQUUsU0FBUztRQUNiLElBQUksRUFBRSxzQ0FBc0IsQ0FBQyxhQUFhLENBQUM7UUFDM0Msc0JBQXNCLEVBQUUsQ0FBQztLQUMxQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBZEQsa0NBY0MifQ==