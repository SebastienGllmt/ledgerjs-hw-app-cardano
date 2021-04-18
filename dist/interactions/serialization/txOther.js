"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTxWitnessRequest = exports.serializeTxValidityStart = exports.serializeTxAuxiliaryData = exports.serializeTxTtl = exports.serializeTxFee = exports.serializeTxWithdrawal = exports.serializeTxInput = void 0;
const serialize_1 = require("../../utils/serialize");
function serializeTxInput(input) {
    return Buffer.concat([
        serialize_1.hex_to_buf(input.txHashHex),
        serialize_1.uint32_to_buf(input.outputIndex),
    ]);
}
exports.serializeTxInput = serializeTxInput;
function serializeTxWithdrawal(withdrawal) {
    return Buffer.concat([
        serialize_1.uint64_to_buf(withdrawal.amount),
        serialize_1.path_to_buf(withdrawal.path),
    ]);
}
exports.serializeTxWithdrawal = serializeTxWithdrawal;
function serializeTxFee(fee) {
    return Buffer.concat([
        serialize_1.uint64_to_buf(fee)
    ]);
}
exports.serializeTxFee = serializeTxFee;
function serializeTxTtl(ttl) {
    return Buffer.concat([
        serialize_1.uint64_to_buf(ttl)
    ]);
}
exports.serializeTxTtl = serializeTxTtl;
function serializeTxAuxiliaryData(auxiliaryDataHashHex) {
    return Buffer.concat([
        serialize_1.hex_to_buf(auxiliaryDataHashHex)
    ]);
}
exports.serializeTxAuxiliaryData = serializeTxAuxiliaryData;
function serializeTxValidityStart(validityIntervalStart) {
    return Buffer.concat([
        serialize_1.uint64_to_buf(validityIntervalStart)
    ]);
}
exports.serializeTxValidityStart = serializeTxValidityStart;
function serializeTxWitnessRequest(path) {
    return Buffer.concat([
        serialize_1.path_to_buf(path)
    ]);
}
exports.serializeTxWitnessRequest = serializeTxWitnessRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhPdGhlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnRlcmFjdGlvbnMvc2VyaWFsaXphdGlvbi90eE90aGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHFEQUE4RjtBQUU5RixTQUFnQixnQkFBZ0IsQ0FDNUIsS0FBa0I7SUFFbEIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pCLHNCQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMzQix5QkFBYSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7S0FDbkMsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQVBELDRDQU9DO0FBRUQsU0FBZ0IscUJBQXFCLENBQ2pDLFVBQTRCO0lBRTVCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNqQix5QkFBYSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDaEMsdUJBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO0tBQy9CLENBQUMsQ0FBQztBQUNQLENBQUM7QUFQRCxzREFPQztBQUVELFNBQWdCLGNBQWMsQ0FDMUIsR0FBZTtJQUVmLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNqQix5QkFBYSxDQUFDLEdBQUcsQ0FBQztLQUNyQixDQUFDLENBQUM7QUFDUCxDQUFDO0FBTkQsd0NBTUM7QUFFRCxTQUFnQixjQUFjLENBQzFCLEdBQWU7SUFFZixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakIseUJBQWEsQ0FBQyxHQUFHLENBQUM7S0FDckIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQU5ELHdDQU1DO0FBRUQsU0FBZ0Isd0JBQXdCLENBQ3BDLG9CQUErQjtJQUUvQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakIsc0JBQVUsQ0FBQyxvQkFBb0IsQ0FBQztLQUNuQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBTkQsNERBTUM7QUFFRCxTQUFnQix3QkFBd0IsQ0FDcEMscUJBQWlDO0lBRWpDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNqQix5QkFBYSxDQUFDLHFCQUFxQixDQUFDO0tBQ3ZDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFORCw0REFNQztBQUVELFNBQWdCLHlCQUF5QixDQUNyQyxJQUFvQjtJQUVwQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakIsdUJBQVcsQ0FBQyxJQUFJLENBQUM7S0FDcEIsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQU5ELDhEQU1DIn0=