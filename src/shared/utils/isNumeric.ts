const isNumeric = (numericId: number): boolean => {
  if (isNaN(numericId)) {
    return false
  }else{
    return true
  }
}

export default isNumeric