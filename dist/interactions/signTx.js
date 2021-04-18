"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTransaction = void 0;
const internal_1 = require("../types/internal");
const public_1 = require("../types/public");
const assert_1 = require("../utils/assert");
const serialize_1 = require("../utils/serialize");
const getVersion_1 = require("./getVersion");
const poolRegistrationCertificate_1 = require("./serialization/poolRegistrationCertificate");
const txCertificate_1 = require("./serialization/txCertificate");
const txInit_1 = require("./serialization/txInit");
const txOther_1 = require("./serialization/txOther");
const txOutput_1 = require("./serialization/txOutput");
const send = (params) => (Object.assign({ ins: 33 }, params));
function* signTx_init(tx, signingMode, wittnessPaths) {
    const _response = yield send({
        p1: 1,
        p2: 0,
        data: txInit_1.serializeTxInit(tx, signingMode, wittnessPaths.length),
        expectedResponseLength: 0,
    });
}
function* signTx_addInput(input) {
    yield send({
        p1: 2,
        p2: 0,
        data: txOther_1.serializeTxInput(input),
        expectedResponseLength: 0,
    });
}
function* signTx_addOutput(output) {
    {
        yield send({
            p1: 3,
            p2: 48,
            data: txOutput_1.serializeTxOutputBasicParams(output),
            expectedResponseLength: 0,
        });
    }
    for (const assetGroup of output.tokenBundle) {
        yield send({
            p1: 3,
            p2: 49,
            data: txOutput_1.serializeAssetGroup(assetGroup),
            expectedResponseLength: 0,
        });
        for (const token of assetGroup.tokens) {
            yield send({
                p1: 3,
                p2: 50,
                data: txOutput_1.serializeToken(token),
                expectedResponseLength: 0,
            });
        }
    }
    yield send({
        p1: 3,
        p2: 51,
        data: Buffer.alloc(0),
        expectedResponseLength: 0,
    });
}
function* signTx_addCertificate(certificate) {
    yield send({
        p1: 6,
        p2: 0,
        data: txCertificate_1.serializeTxCertificate(certificate),
        expectedResponseLength: 0,
    });
    if (certificate.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION) {
        const pool = certificate.pool;
        yield send({
            p1: 6,
            p2: 48,
            data: poolRegistrationCertificate_1.serializePoolInitialParams(pool),
            expectedResponseLength: 0,
        });
        for (const owner of pool.owners) {
            yield send({
                p1: 6,
                p2: 49,
                data: poolRegistrationCertificate_1.serializePoolOwner(owner),
                expectedResponseLength: 0,
            });
        }
        for (const relay of pool.relays) {
            yield send({
                p1: 6,
                p2: 50,
                data: poolRegistrationCertificate_1.serializePoolRelay(relay),
                expectedResponseLength: 0,
            });
        }
        yield send({
            p1: 6,
            p2: 51,
            data: poolRegistrationCertificate_1.serializePoolMetadata(pool.metadata),
            expectedResponseLength: 0,
        });
        yield send({
            p1: 6,
            p2: 52,
            data: Buffer.alloc(0),
            expectedResponseLength: 0,
        });
    }
}
function* signTx_addWithdrawal(withdrawal) {
    yield send({
        p1: 7,
        p2: 0,
        data: txOther_1.serializeTxWithdrawal(withdrawal),
        expectedResponseLength: 0,
    });
}
function* signTx_setFee(fee) {
    yield send({
        p1: 4,
        p2: 0,
        data: txOther_1.serializeTxFee(fee),
        expectedResponseLength: 0,
    });
}
function* signTx_setTtl(ttl) {
    yield send({
        p1: 5,
        p2: 0,
        data: txOther_1.serializeTxTtl(ttl),
        expectedResponseLength: 0,
    });
}
function* signTx_setAuxiliaryData(auxiliaryData) {
    assert_1.assert(auxiliaryData.type === public_1.TxAuxiliaryDataType.ARBITRARY_HASH, 'Auxiliary data type not implemented');
    yield send({
        p1: 8,
        p2: 0,
        data: txOther_1.serializeTxAuxiliaryData(auxiliaryData.hashHex),
        expectedResponseLength: 0,
    });
}
function* signTx_setValidityIntervalStart(validityIntervalStartStr) {
    yield send({
        p1: 9,
        p2: 0,
        data: txOther_1.serializeTxValidityStart(validityIntervalStartStr),
    });
}
function* signTx_awaitConfirm() {
    const response = yield send({
        p1: 10,
        p2: 0,
        data: Buffer.alloc(0),
        expectedResponseLength: internal_1.TX_HASH_LENGTH,
    });
    return {
        txHashHex: response.toString("hex"),
    };
}
function* signTx_getWitness(path) {
    const response = yield send({
        p1: 15,
        p2: 0,
        data: txOther_1.serializeTxWitnessRequest(path),
        expectedResponseLength: 64,
    });
    return {
        path: path,
        witnessSignatureHex: serialize_1.buf_to_hex(response),
    };
}
function generateWitnessPaths(request) {
    const { tx, signingMode } = request;
    switch (signingMode) {
        case public_1.TransactionSigningMode.ORDINARY_TRANSACTION: {
            const witnessPaths = {};
            function _insert(path) {
                const pathKey = JSON.stringify(path);
                witnessPaths[pathKey] = path;
            }
            for (const input of tx.inputs) {
                assert_1.assert(input.path != null, "input missing path");
                _insert(input.path);
            }
            for (const cert of tx.certificates) {
                assert_1.assert(cert.type !== internal_1.CertificateType.STAKE_POOL_REGISTRATION, "wrong cert type");
                _insert(cert.path);
            }
            for (const withdrawal of tx.withdrawals) {
                _insert(withdrawal.path);
            }
            return Object.values(witnessPaths);
        }
        case public_1.TransactionSigningMode.POOL_REGISTRATION_AS_OWNER: {
            assert_1.assert(tx.certificates.length == 1, "bad certificates length");
            const cert = tx.certificates[0];
            assert_1.assert(cert.type === internal_1.CertificateType.STAKE_POOL_REGISTRATION, "bad certificate type");
            const witnessOwner = cert.pool.owners.find((owner) => owner.type === internal_1.PoolOwnerType.DEVICE_OWNED);
            assert_1.assert(witnessOwner != null, "missing witness owner");
            assert_1.assert(witnessOwner.type === internal_1.PoolOwnerType.DEVICE_OWNED, "bad witness owner type");
            return [witnessOwner.path];
        }
        default: {
            assert_1.assert(false, 'Bad signing mode');
        }
    }
}
function* signTransaction(version, request) {
    getVersion_1.ensureLedgerAppVersionCompatible(version);
    const witnessPaths = generateWitnessPaths(request);
    const { tx, signingMode } = request;
    yield* signTx_init(tx, signingMode, witnessPaths);
    for (const input of tx.inputs) {
        yield* signTx_addInput(input);
    }
    for (const output of tx.outputs) {
        yield* signTx_addOutput(output);
    }
    yield* signTx_setFee(tx.fee);
    if (tx.ttl != null) {
        yield* signTx_setTtl(tx.ttl);
    }
    for (const certificate of tx.certificates) {
        yield* signTx_addCertificate(certificate);
    }
    for (const withdrawal of tx.withdrawals) {
        yield* signTx_addWithdrawal(withdrawal);
    }
    if (tx.auxiliaryData != null) {
        yield* signTx_setAuxiliaryData(tx.auxiliaryData);
    }
    if (tx.validityIntervalStart != null) {
        yield* signTx_setValidityIntervalStart(tx.validityIntervalStart);
    }
    const { txHashHex } = yield* signTx_awaitConfirm();
    const witnesses = [];
    for (const path of witnessPaths) {
        const witness = yield* signTx_getWitness(path);
        witnesses.push(witness);
    }
    return {
        txHashHex,
        witnesses,
    };
}
exports.signTransaction = signTransaction;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnblR4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9zaWduVHgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsZ0RBQW1GO0FBRW5GLDRDQUE2RTtBQUM3RSw0Q0FBeUM7QUFDekMsa0RBQWlEO0FBR2pELDZDQUFnRTtBQUNoRSw2RkFBd0o7QUFDeEosaUVBQXVFO0FBQ3ZFLG1EQUF5RDtBQUN6RCxxREFBaU07QUFDak0sdURBQTZHO0FBZ0I3RyxNQUFNLElBQUksR0FBRyxDQUFDLE1BS2IsRUFBYyxFQUFFLENBQUMsaUJBQUcsR0FBRyxRQUFrQixNQUFNLEVBQUcsQ0FBQTtBQUduRCxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQ25CLEVBQXFCLEVBQ3JCLFdBQW1DLEVBQ25DLGFBQStCO0lBTS9CLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDO1FBQzNCLEVBQUUsR0FBZTtRQUNqQixFQUFFLEdBQVc7UUFDYixJQUFJLEVBQUUsd0JBQWUsQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDNUQsc0JBQXNCLEVBQUUsQ0FBQztLQUMxQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUN2QixLQUFrQjtJQU1sQixNQUFNLElBQUksQ0FBQztRQUNULEVBQUUsR0FBaUI7UUFDbkIsRUFBRSxHQUFXO1FBQ2IsSUFBSSxFQUFFLDBCQUFnQixDQUFDLEtBQUssQ0FBQztRQUM3QixzQkFBc0IsRUFBRSxDQUFDO0tBQzFCLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FDeEIsTUFBb0I7SUFVcEI7UUFDRSxNQUFNLElBQUksQ0FBQztZQUNULEVBQUUsR0FBa0I7WUFDcEIsRUFBRSxJQUFlO1lBQ2pCLElBQUksRUFBRSx1Q0FBNEIsQ0FBQyxNQUFNLENBQUM7WUFDMUMsc0JBQXNCLEVB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