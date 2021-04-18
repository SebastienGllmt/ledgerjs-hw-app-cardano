"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTests = void 0;
const send = (params) => (Object.assign({ ins: 240 }, params));
function* runTests(_version) {
    yield send({
        p1: 0x00,
        p2: 0x00,
        data: Buffer.alloc(0),
        expectedResponseLength: 0,
    });
}
exports.runTests = runTests;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuVGVzdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW50ZXJhY3Rpb25zL3J1blRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFLYixFQUFjLEVBQUUsQ0FBQyxpQkFBRyxHQUFHLFNBQW9CLE1BQU0sRUFBRyxDQUFBO0FBR3JELFFBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFpQjtJQUN6QyxNQUFNLElBQUksQ0FBQztRQUNULEVBQUUsRUFBRSxJQUFJO1FBQ1IsRUFBRSxFQUFFLElBQUk7UUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckIsc0JBQXNCLEVBQUUsQ0FBQztLQUMxQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBUEQsNEJBT0MifQ==