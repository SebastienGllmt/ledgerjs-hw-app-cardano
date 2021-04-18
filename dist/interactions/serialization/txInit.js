"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTxInit = void 0;
const internal_1 = require("../../types/internal");
const assert_1 = require("../../utils/assert");
const serialize_1 = require("../../utils/serialize");
const _serializeSigningMode = (mode) => {
    const value = {
        [internal_1.TransactionSigningMode.ORDINARY_TRANSACTION]: 3,
        [internal_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER]: 4,
        [internal_1.TransactionSigningMode.__RESEVED_POOL_REGISTRATION_AS_OPERATOR]: 5,
    }[mode];
    assert_1.assert(value !== undefined, 'Invalid signing mode');
    return serialize_1.uint8_to_buf(value);
};
function _serializeOptionFlag(included) {
    const SignTxIncluded = {
        NO: 1,
        YES: 2,
    };
    const value = included
        ? SignTxIncluded.YES
        : SignTxIncluded.NO;
    return serialize_1.uint8_to_buf(value);
}
function serializeTxInit(tx, signingMode, numWitnesses) {
    return Buffer.concat([
        serialize_1.uint8_to_buf(tx.network.networkId),
        serialize_1.uint32_to_buf(tx.network.protocolMagic),
        _serializeOptionFlag(tx.ttl != null),
        _serializeOptionFlag(tx.auxiliaryData != null),
        _serializeOptionFlag(tx.validityIntervalStart != null),
        _serializeSigningMode(signingMode),
        serialize_1.uint32_to_buf(tx.inputs.length),
        serialize_1.uint32_to_buf(tx.outputs.length),
        serialize_1.uint32_to_buf(tx.certificates.length),
        serialize_1.uint32_to_buf(tx.withdrawals.length),
        serialize_1.uint32_to_buf(numWitnesses),
    ]);
}
exports.serializeTxInit = serializeTxInit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhJbml0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9zZXJpYWxpemF0aW9uL3R4SW5pdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtREFBOEQ7QUFDOUQsK0NBQTRDO0FBQzVDLHFEQUFvRTtBQUVwRSxNQUFNLHFCQUFxQixHQUFHLENBQzFCLElBQTRCLEVBQ3RCLEVBQUU7SUFDUixNQUFNLEtBQUssR0FBRztRQUNWLENBQUMsaUNBQXNCLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFZO1FBQzNELENBQUMsaUNBQXNCLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFZO1FBQ2pFLENBQUMsaUNBQXNCLENBQUMsdUNBQXVDLENBQUMsRUFBRSxDQUFZO0tBQ2pGLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFUixlQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO0lBRW5ELE9BQU8sd0JBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUM7QUFFRixTQUFTLG9CQUFvQixDQUFDLFFBQWlCO0lBQzNDLE1BQU0sY0FBYyxHQUFHO1FBQ25CLEVBQUUsRUFBRSxDQUFZO1FBQ2hCLEdBQUcsRUFBRSxDQUFZO0tBQ3BCLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxRQUFRO1FBQ2xCLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRztRQUNwQixDQUFDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQTtJQUV2QixPQUFPLHdCQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxFQUFxQixFQUFFLFdBQW1DLEVBQUUsWUFBb0I7SUFDNUcsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2pCLHdCQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMseUJBQWEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUN2QyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztRQUNwQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQztRQUM5QyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMscUJBQXFCLElBQUksSUFBSSxDQUFDO1FBQ3RELHFCQUFxQixDQUFDLFdBQVcsQ0FBQztRQUNsQyx5QkFBYSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBa0IsQ0FBQztRQUMzQyx5QkFBYSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBa0IsQ0FBQztRQUM1Qyx5QkFBYSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBa0IsQ0FBQztRQUNqRCx5QkFBYSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBa0IsQ0FBQztRQUNoRCx5QkFBYSxDQUFDLFlBQXdCLENBQUM7S0FDMUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQWRELDBDQWNDIn0=