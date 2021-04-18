"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtendedPublicKeys = void 0;
const assert_1 = require("../utils/assert");
const ioHelpers_1 = require("../utils/ioHelpers");
const serialize_1 = require("../utils/serialize");
const getVersion_1 = require("./getVersion");
const send = (params) => (Object.assign({ ins: 16 }, params));
function* getExtendedPublicKeys(version, paths) {
    getVersion_1.ensureLedgerAppVersionCompatible(version);
    const result = [];
    for (let i = 0; i < paths.length; i++) {
        const pathData = Buffer.concat([
            serialize_1.path_to_buf(paths[i]),
        ]);
        let response;
        if (i === 0) {
            const remainingKeysData = paths.length > 1
                ? serialize_1.uint32_to_buf(paths.length - 1)
                : Buffer.from([]);
            response = yield send({
                p1: 0,
                p2: 0,
                data: Buffer.concat([pathData, remainingKeysData]),
                expectedResponseLength: 64,
            });
        }
        else {
            response = yield send({
                p1: 1,
                p2: 0,
                data: pathData,
                expectedResponseLength: 64,
            });
        }
        const [publicKey, chainCode, rest] = ioHelpers_1.chunkBy(response, [32, 32]);
        assert_1.assert(rest.length === 0, "invalid response length");
        result.push({
            publicKeyHex: publicKey.toString("hex"),
            chainCodeHex: chainCode.toString("hex"),
        });
    }
    return result;
}
exports.getExtendedPublicKeys = getExtendedPublicKeys;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5kZWRQdWJsaWNLZXlzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ludGVyYWN0aW9ucy9nZXRFeHRlbmRlZFB1YmxpY0tleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNENBQXlDO0FBQ3pDLGtEQUE2QztBQUM3QyxrREFBZ0U7QUFHaEUsNkNBQWdFO0FBR2hFLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFLYixFQUFjLEVBQUUsQ0FBQyxpQkFBRyxHQUFHLFFBQTZCLE1BQU0sRUFBRyxDQUFBO0FBRzlELFFBQWUsQ0FBQyxDQUFDLHFCQUFxQixDQUNwQyxPQUFnQixFQUNoQixLQUE0QjtJQUU1Qiw2Q0FBZ0MsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQVMxQyxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM3Qix1QkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLFFBQWdCLENBQUM7UUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBS1gsTUFBTSxpQkFBaUIsR0FDckIsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUNkLENBQUMsQ0FBQyx5QkFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBYSxDQUFDO2dCQUM3QyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUV0QixRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUM7Z0JBQ3BCLEVBQUUsR0FBUztnQkFDWCxFQUFFLEdBQVc7Z0JBQ2IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztnQkFDbEQsc0JBQXNCLEVBQUUsRUFBRTthQUMzQixDQUFDLENBQUM7U0FDSjthQUFNO1lBRUwsUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDO2dCQUNwQixFQUFFLEdBQWE7Z0JBQ2YsRUFBRSxHQUFXO2dCQUNiLElBQUksRUFBRSxRQUFRO2dCQUNkLHNCQUFzQixFQUFFLEVBQUU7YUFDM0IsQ0FBQyxDQUFDO1NBQ0o7UUFFRCxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsR0FBRyxtQkFBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pFLGVBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO1FBRXJELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixZQUFZLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDdkMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQ3hDLENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQXpERCxzREF5REMifQ==