"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNumeric = (numericId) => {
    if (isNaN(numericId)) {
        return false;
    }
    else {
        return true;
    }
};
exports.default = isNumeric;
