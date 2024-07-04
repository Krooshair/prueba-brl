import { Decimal } from "@prisma/client/runtime/library";

function calculateIncomeStatus(totalInvesment: Decimal, totalAmount: Decimal): 'Ganancia' | 'Recuperado' | 'Perdida' {
  if (totalAmount.gt(totalInvesment)) {
    return 'Ganancia';
  } else if (totalAmount.equals(totalInvesment)) {
    return 'Recuperado';
  } else {
    return 'Perdida';
  }
}

export default calculateIncomeStatus