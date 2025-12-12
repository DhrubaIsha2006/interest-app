// helpers/finance.js
// Utilities to compute interest and help with payments
// Keep it simple & explicit — accurate enough for the MVP.

function computeInterest({ amount = 0, rate = 0, periods = 0, interestType = 'Simple', frequency = 'Monthly' }) {
  const principal = Number(amount || 0)
  let r = Number(rate || 0) / 100
  // If frequency is monthly, convert annual rate to monthly
  if (frequency === 'Monthly') r = r / 12

  if (interestType === 'Simple') {
    // Simple interest: I = P * r * n ; periods interpreted as number of periods at the frequency
    const totalInterest = principal * r * Number(periods || 0)
    const totalPayable = principal + totalInterest
    return { totalInterest, totalPayable }
  } else {
    // Compound interest: A = P (1 + r)^n
    const totalPayable = principal * Math.pow(1 + r, Number(periods || 0))
    const totalInterest = totalPayable - principal
    return { totalInterest, totalPayable }
  }
}

// compute outstanding given transaction doc (assumes transaction stores totalPayable and payments array)
function computeOutstanding(tx) {
  const totalPayable = Number(tx.totalPayable || 0)
  const paid = (tx.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0)
  const outstanding = totalPayable - paid
  return Math.max(0, outstanding)
}

module.exports = { computeInterest, computeOutstanding }
