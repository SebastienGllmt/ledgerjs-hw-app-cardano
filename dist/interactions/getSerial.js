"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSerial = void 0;
const utils_1 = __importDefault(require("../utils"));
const getVersion_1 = require("./getVersion");
const send = (params) => (Object.assign({ ins: 1 }, params));
function* getSerial(version) {
    getVersion_1.ensureLedgerAppVersionCompatible(version);
    const P1_UNUSED = 0x00;
    const P2_UNUSED = 0x00;
    const response = yield send({
        p1: P1_UNUSED,
        p2: P2_UNUSED,
        data: Buffer.alloc(0),
        expectedResponseLength: 7,
    });
    const serial = utils_1.default.buf_to_hex(response);
    return { serial };
}
exports.getSerial = getSerial;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U2VyaWFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9nZXRTZXJpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEscURBQTZCO0FBRzdCLDZDQUFnRTtBQUVoRSxNQUFNLElBQUksR0FBRyxDQUFDLE1BS2IsRUFBYyxFQUFFLENBQUMsaUJBQUcsR0FBRyxPQUFxQixNQUFNLEVBQUcsQ0FBQTtBQUd0RCxRQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBZ0I7SUFDekMsNkNBQWdDLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQztJQUN2QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQztRQUMxQixFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxTQUFTO1FBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLHNCQUFzQixFQUFFLENBQUM7S0FDMUIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxNQUFNLEdBQUcsZUFBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDcEIsQ0FBQztBQWRELDhCQWNDIn0=