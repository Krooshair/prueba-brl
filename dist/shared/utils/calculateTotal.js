"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateIncomeStatus(totalInvesment, totalAmount) {
    if (totalAmount.gt(totalInvesment)) {
        return 'Ganancia';
    }
    else if (totalAmount.equals(totalInvesment)) {
        return 'Recuperado';
    }
    else {
        return 'Perdida';
    }
}
exports.default = calculateIncomeStatus;
