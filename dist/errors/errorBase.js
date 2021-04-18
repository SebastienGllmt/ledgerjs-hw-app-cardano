"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorBase = void 0;
class ErrorBase extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ErrorBase = ErrorBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JCYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Vycm9ycy9lcnJvckJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsTUFBYSxTQUFVLFNBQVEsS0FBSztJQUNoQyxZQUFtQixPQUFlO1FBQzlCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7SUFDckMsQ0FBQztDQUNKO0FBTEQsOEJBS0MifQ==