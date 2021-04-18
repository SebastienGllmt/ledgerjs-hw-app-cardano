"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSignTransactionRequest = exports.parseSigningMode = exports.parseTransaction = void 0;
const errors_1 = require("../errors");
const invalidDataReason_1 = require("../errors/invalidDataReason");
const internal_1 = require("../types/internal");
const public_1 = require("../types/public");
const assert_1 = require("../utils/assert");
const parse_1 = require("../utils/parse");
const parse_2 = require("../utils/parse");
const address_1 = require("./address");
const certificate_1 = require("./certificate");
const constants_1 = require("./constants");
const network_1 = require("./network");
function parseCertificates(certificates) {
    parse_1.validate(parse_1.isArray(certificates), invalidDataReason_1.InvalidDataReason.CERTIFICATES_NOT_ARRAY);
    const parsed = certificates.map(cert => certificate_1.parseCertificate(cert));
    return parsed;
}
function parseToken(token) {
    const assetNameHex = parse_2.parseHexString(token.assetNameHex, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ASSET_NAME);
    parse_1.validate(token.assetNameHex.length <= internal_1.ASSET_NAME_LENGTH_MAX * 2, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ASSET_NAME);
    const amount = parse_2.parseUint64_str(token.amount, {}, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_AMOUNT);
    return {
        assetNameHex,
        amount,
    };
}
function parseAssetGroup(assetGroup) {
    parse_1.validate(parse_1.isArray(assetGroup.tokens), invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ASSET_GROUP_TOKENS_NOT_ARRAY);
    parse_1.validate(assetGroup.tokens.length <= constants_1.TOKENS_IN_GROUP_MAX, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ASSET_GROUP_TOKENS_TOO_LARGE);
    return {
        policyIdHex: parse_2.parseHexStringOfLength(assetGroup.policyIdHex, internal_1.TOKEN_POLICY_LENGTH, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_TOKEN_POLICY),
        tokens: assetGroup.tokens.map(t => parseToken(t))
    };
}
function parseAuxiliaryData(auxiliaryData) {
    switch (auxiliaryData.type) {
        case public_1.TxAuxiliaryDataType.ARBITRARY_HASH: {
            return {
                type: public_1.TxAuxiliaryDataType.ARBITRARY_HASH,
                hashHex: parse_2.parseHexStringOfLength(auxiliaryData.params.hashHex, 32, invalidDataReason_1.InvalidDataReason.AUXILIARY_DATA_INVALID_HASH)
            };
        }
        default:
            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.AUXILIARY_DATA_UNKNOWN_TYPE);
    }
}
function parseTransaction(tx) {
    var _a, _b, _c, _d;
    const network = network_1.parseNetwork(tx.network);
    parse_1.validate(parse_1.isArray(tx.inputs), invalidDataReason_1.InvalidDataReason.INPUTS_NOT_ARRAY);
    const inputs = tx.inputs.map(inp => parseTxInput(inp));
    parse_1.validate(parse_1.isArray(tx.outputs), invalidDataReason_1.InvalidDataReason.OUTPUTS_NOT_ARRAY);
    const outputs = tx.outputs.map(o => parseTxOutput(o, tx.network));
    const fee = parse_2.parseUint64_str(tx.fee, { max: constants_1.MAX_LOVELACE_SUPPLY_STR }, invalidDataReason_1.InvalidDataReason.FEE_INVALID);
    const ttl = tx.ttl == null
        ? null
        : parse_2.parseUint64_str(tx.ttl, { min: "1" }, invalidDataReason_1.InvalidDataReason.TTL_INVALID);
    parse_1.validate(parse_1.isArray((_a = tx.certificates) !== null && _a !== void 0 ? _a : []), invalidDataReason_1.InvalidDataReason.CERTIFICATES_NOT_ARRAY);
    const certificates = parseCertificates((_b = tx.certificates) !== null && _b !== void 0 ? _b : []);
    parse_1.validate(parse_1.isArray((_c = tx.withdrawals) !== null && _c !== void 0 ? _c : []), invalidDataReason_1.InvalidDataReason.WITHDRAWALS_NOT_ARRAY);
    const withdrawals = ((_d = tx.withdrawals) !== null && _d !== void 0 ? _d : []).map(w => parseWithdrawal(w));
    const auxiliaryData = tx.auxiliaryData == null
        ? null
        : parseAuxiliaryData(tx.auxiliaryData);
    const validityIntervalStart = tx.validityIntervalStart == null
        ? null
        : parse_2.parseUint64_str(tx.validityIntervalStart, { min: "1" }, invalidDataReason_1.InvalidDataReason.VALIDITY_INTERVAL_START_INVALID);
    return {
        network,
        inputs,
        outputs,
        ttl,
        auxiliaryData,
        validityIntervalStart,
        withdrawals,
        certificates,
        fee,
    };
}
exports.parseTransaction = parseTransaction;
function parseTxInput(input) {
    const txHashHex = parse_2.parseHexStringOfLength(input.txHashHex, internal_1.TX_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.INPUT_INVALID_TX_HASH);
    const outputIndex = parse_2.parseUint32_t(input.outputIndex, invalidDataReason_1.InvalidDataReason.INPUT_INVALID_UTXO_INDEX);
    return {
        txHashHex,
        outputIndex,
        path: input.path != null ? parse_1.parseBIP32Path(input.path, invalidDataReason_1.InvalidDataReason.INPUT_INVALID_PATH) : null
    };
}
function parseWithdrawal(params) {
    return {
        amount: parse_2.parseUint64_str(params.amount, { max: constants_1.MAX_LOVELACE_SUPPLY_STR }, invalidDataReason_1.InvalidDataReason.WITHDRAWAL_INVALID_AMOUNT),
        path: parse_1.parseBIP32Path(params.path, invalidDataReason_1.InvalidDataReason.WITHDRAWAL_INVALID_PATH)
    };
}
function parseTxDestination(network, destination) {
    switch (destination.type) {
        case public_1.TxOutputDestinationType.THIRD_PARTY: {
            const params = destination.params;
            const addressHex = parse_2.parseHexString(params.addressHex, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ADDRESS);
            parse_1.validate(params.addressHex.length <= 128 * 2, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_ADDRESS);
            return {
                type: public_1.TxOutputDestinationType.THIRD_PARTY,
                addressHex,
            };
        }
        case public_1.TxOutputDestinationType.DEVICE_OWNED: {
            const params = destination.params;
            return {
                type: public_1.TxOutputDestinationType.DEVICE_OWNED,
                addressParams: address_1.parseAddress(network, params)
            };
        }
        default:
            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.ADDRESS_UNKNOWN_TYPE);
    }
}
function parseTxOutput(output, network) {
    var _a, _b, _c;
    const amount = parse_2.parseUint64_str(output.amount, { max: constants_1.MAX_LOVELACE_SUPPLY_STR }, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_AMOUNT);
    parse_1.validate(parse_1.isArray((_a = output.tokenBundle) !== null && _a !== void 0 ? _a : []), invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_TOKEN_BUNDLE);
    parse_1.validate(((_b = output.tokenBundle) !== null && _b !== void 0 ? _b : []).length <= constants_1.ASSET_GROUPS_MAX, invalidDataReason_1.InvalidDataReason.OUTPUT_INVALID_TOKEN_BUNDLE_TOO_LARGE);
    const tokenBundle = ((_c = output.tokenBundle) !== null && _c !== void 0 ? _c : []).map((ag) => parseAssetGroup(ag));
    const destination = parseTxDestination(network, output.destination);
    return {
        amount,
        tokenBundle,
        destination
    };
}
function parseSigningMode(mode) {
    switch (mode) {
        case public_1.TransactionSigningMode.ORDINARY_TRANSACTION:
        case public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER:
            return mode;
        default:
            throw new Error('TODO');
    }
}
exports.parseSigningMode = parseSigningMode;
function parseSignTransactionRequest(request) {
    const tx = parseTransaction(request.tx);
    const signingMode = parseSigningMode(request.signingMode);
    switch (signingMode) {
        case public_1.TransactionSigningMode.ORDINARY_TRANSACTION: {
            parse_1.validate(tx.certificates.every(certificate => certificate.type !== internal_1.CertificateType.STAKE_POOL_REGISTRATION), invalidDataReason_1.InvalidDataReason.SIGN_MODE_ORDINARY__POOL_REGISTRATION_NOT_ALLOWED);
            break;
        }
        case public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER: {
            parse_1.validate(tx.inputs.every(inp => inp.path == null), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__INPUT_WITH_PATH_NOT_ALLOWED);
            parse_1.validate(tx.outputs.every(out => out.destination.type === public_1.TxOutputDestinationType.THIRD_PARTY), invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__DEVICE_OWNED_ADDRESS_NOT_ALLOWED);
            parse_1.validate(tx.certificates.length === 1, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__SINGLE_POOL_REG_CERTIFICATE_REQUIRED);
            tx.certificates.forEach(certificate => {
                parse_1.validate(certificate.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__SINGLE_POOL_REG_CERTIFICATE_REQUIRED);
                parse_1.validate(certificate.pool.owners.filter(o => o.type === public_1.PoolOwnerType.DEVICE_OWNED).length === 1, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__SINGLE_DEVICE_OWNER_REQUIRED);
            });
            parse_1.validate(tx.withdrawals.length === 0, invalidDataReason_1.InvalidDataReason.SIGN_MODE_POOL_OWNER__WITHDRAWALS_NOT_ALLOWED);
            break;
        }
        case public_1.TransactionSigningMode.__RESEVED_POOL_REGISTRATION_AS_OPERATOR: {
            assert_1.assert(false, "Not implemented");
            break;
        }
        default:
            assert_1.unreachable(signingMode);
    }
    return { tx, signingMode };
}
exports.parseSignTransactionRequest = parseSignTransactionRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNhY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFyc2luZy90cmFuc2FjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBd0M7QUFDeEMsbUVBQWdFO0FBRWhFLGdEQUFnSDtBQWNoSCw0Q0FLeUI7QUFDekIsNENBQXNEO0FBQ3RELDBDQUFtRTtBQUNuRSwwQ0FBd0c7QUFDeEcsdUNBQXlDO0FBQ3pDLCtDQUFpRDtBQUNqRCwyQ0FBNkY7QUFDN0YsdUNBQXlDO0FBRXpDLFNBQVMsaUJBQWlCLENBQUMsWUFBZ0M7SUFDdkQsZ0JBQVEsQ0FBQyxlQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUscUNBQWlCLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUUxRSxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsOEJBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtJQUUvRCxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO0FBR0QsU0FBUyxVQUFVLENBQUMsS0FBWTtJQUM1QixNQUFNLFlBQVksR0FBRyxzQkFBYyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUscUNBQWlCLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNyRyxnQkFBUSxDQUNKLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLGdDQUFxQixHQUFHLENBQUMsRUFDdEQscUNBQWlCLENBQUMseUJBQXlCLENBQzlDLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBRyx1QkFBZSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLHFDQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDekYsT0FBTztRQUNILFlBQVk7UUFDWixNQUFNO0tBQ1QsQ0FBQTtBQUNMLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxVQUFzQjtJQUMzQyxnQkFBUSxDQUFDLGVBQU8sQ0FBQyxVQUFVLENB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