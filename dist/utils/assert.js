"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unreachable = exports.assert = void 0;
const errorBase_1 = require("../errors/errorBase");
function assert(cond, errMsg) {
    if (!cond)
        throw new errorBase_1.ErrorBase('Assertion failed' + errMsg ? ': ' + errMsg : '');
}
exports.assert = assert;
function unreachable(_val) {
    assert(false, 'Unreachable code hit');
}
exports.unreachable = unreachable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2Fzc2VydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBK0M7QUFFL0MsU0FBZ0IsTUFBTSxDQUFDLElBQWEsRUFBRSxNQUFjO0lBQ2hELElBQUksQ0FBQyxJQUFJO1FBQUUsTUFBTSxJQUFJLHFCQUFTLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDO0FBRkQsd0JBRUM7QUFFRCxTQUFnQixXQUFXLENBQUMsSUFBVztJQUNuQyxNQUFNLENBQUMsS0FBSyxFQUFFLHNCQUFzQixDQUFDLENBQUE7QUFDekMsQ0FBQztBQUZELGtDQUVDIn0=