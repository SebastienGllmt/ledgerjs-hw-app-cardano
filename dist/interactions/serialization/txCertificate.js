"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeTxCertificate = void 0;
const internal_1 = require("../../types/internal");
const assert_1 = require("../../utils/assert");
const serialize_1 = require("../../utils/serialize");
function serializeTxCertificate(certificate) {
    switch (certificate.type) {
        case internal_1.CertificateType.STAKE_REGISTRATION:
        case internal_1.CertificateType.STAKE_DEREGISTRATION: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(certificate.type),
                serialize_1.path_to_buf(certificate.path)
            ]);
        }
        case internal_1.CertificateType.STAKE_DELEGATION: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(certificate.type),
                serialize_1.path_to_buf(certificate.path),
                serialize_1.hex_to_buf(certificate.poolKeyHashHex)
            ]);
        }
        case internal_1.CertificateType.STAKE_POOL_REGISTRATION: {
            return Buffer.concat([
                serialize_1.uint8_to_buf(certificate.type),
            ]);
        }
        default:
            assert_1.unreachable(certificate);
    }
}
exports.serializeTxCertificate = serializeTxCertificate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHhDZXJ0aWZpY2F0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbnRlcmFjdGlvbnMvc2VyaWFsaXphdGlvbi90eENlcnRpZmljYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1EQUF1RDtBQUN2RCwrQ0FBaUQ7QUFDakQscURBQThFO0FBRTlFLFNBQWdCLHNCQUFzQixDQUNsQyxXQUE4QjtJQUc5QixRQUFRLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDdEIsS0FBSywwQkFBZSxDQUFDLGtCQUFrQixDQUFDO1FBQ3hDLEtBQUssMEJBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDakIsd0JBQVksQ0FBQyxXQUFXLENBQUMsSUFBZSxDQUFDO2dCQUN6Qyx1QkFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7YUFDaEMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxLQUFLLDBCQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNuQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLHdCQUFZLENBQUMsV0FBVyxDQUFDLElBQWUsQ0FBQztnQkFDekMsdUJBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUM3QixzQkFBVSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUM7YUFDekMsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxLQUFLLDBCQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUMxQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLHdCQUFZLENBQUMsV0FBVyxDQUFDLElBQWUsQ0FBQzthQUM1QyxDQUFDLENBQUE7U0FDTDtRQUNEO1lBQ0ksb0JBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtLQUMvQjtBQUNMLENBQUM7QUEzQkQsd0RBMkJDIn0=