"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCertificate = void 0;
const errors_1 = require("../errors");
const invalidDataReason_1 = require("../errors/invalidDataReason");
const internal_1 = require("../types/internal");
const parse_1 = require("../utils/parse");
const poolRegistration_1 = require("./poolRegistration");
function parseCertificate(cert) {
    switch (cert.type) {
        case internal_1.CertificateType.STAKE_REGISTRATION:
        case internal_1.CertificateType.STAKE_DEREGISTRATION: {
            parse_1.validate(cert.params.poolKeyHashHex == null, invalidDataReason_1.InvalidDataReason.CERTIFICATE_SUPERFLUOUS_POOL_KEY_HASH);
            return {
                type: cert.type,
                path: parse_1.parseBIP32Path(cert.params.path, invalidDataReason_1.InvalidDataReason.CERTIFICATE_MISSING_PATH)
            };
        }
        case internal_1.CertificateType.STAKE_DELEGATION: {
            return {
                type: cert.type,
                path: parse_1.parseBIP32Path(cert.params.path, invalidDataReason_1.InvalidDataReason.CERTIFICATE_MISSING_PATH),
                poolKeyHashHex: parse_1.parseHexStringOfLength(cert.params.poolKeyHashHex, internal_1.KEY_HASH_LENGTH, invalidDataReason_1.InvalidDataReason.CERTIFICATE_MISSING_POOL_KEY_HASH)
            };
        }
        case internal_1.CertificateType.STAKE_POOL_REGISTRATION: {
            return {
                type: cert.type,
                pool: poolRegistration_1.parsePoolParams(cert.params)
            };
        }
        default:
            throw new errors_1.InvalidData(invalidDataReason_1.InvalidDataReason.CERTIFICATE_INVALID_TYPE);
    }
}
exports.parseCertificate = parseCertificate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VydGlmaWNhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcGFyc2luZy9jZXJ0aWZpY2F0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBd0M7QUFDeEMsbUVBQWdFO0FBRWhFLGdEQUFxRTtBQUVyRSwwQ0FBa0Y7QUFDbEYseURBQXFEO0FBRXJELFNBQWdCLGdCQUFnQixDQUFDLElBQWlCO0lBQzlDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNmLEtBQUssMEJBQWUsQ0FBQyxrQkFBa0IsQ0FBQztRQUN4QyxLQUFLLDBCQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUN2QyxnQkFBUSxDQUFFLElBQUksQ0FBQyxNQUFjLENBQUMsY0FBYyxJQUFJLElBQUksRUFBRSxxQ0FBaUIsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO1lBQy9HLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLElBQUksRUFBRSxzQkFBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHFDQUFpQixDQUFDLHdCQUF3QixDQUFDO2FBQ3JGLENBQUE7U0FDSjtRQUNELEtBQUssMEJBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ25DLE9BQU87Z0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLElBQUksRUFBRSxzQkFBYyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLHFDQUFpQixDQUFDLHdCQUF3QixDQUFDO2dCQUNsRixjQUFjLEVBQUUsOEJBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsMEJBQWUsRUFBRSxxQ0FBaUIsQ0FBQyxpQ0FBaUMsQ0FBQzthQUMzSSxDQUFBO1NBQ0o7UUFDRCxLQUFLLDBCQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUMxQyxPQUFPO2dCQUNILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixJQUFJLEVBQUUsa0NBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3JDLENBQUE7U0FDSjtRQUVEO1lBQ0ksTUFBTSxJQUFJLG9CQUFXLENBQUMscUNBQWlCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztLQUN6RTtBQUNMLENBQUM7QUEzQkQsNENBMkJDIn0=