// interest_app/backend/index.js
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json({ limit: '8mb' }))

// Optional: quiet a mongoose strictQuery warning in modern versions
mongoose.set('strictQuery', true)

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/interest_app_dev'
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connected'))
  .catch(err => console.error('Mongo connection error:', err))

/* ----------------------
   Models
   ---------------------- */
const Profile = mongoose.model('Profile', new mongoose.Schema({
  name: { type: String, required: true, index: true },
  phone: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
}))

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  amount: { type: Number, default: 0 },
  interestRate: { type: Number, default: 0 },
  interestType: { type: String, enum: ['Simple','Compound'], default: 'Simple' },
  frequency: { type: String, enum: ['Monthly','Yearly'], default: 'Monthly' },
  startDate: Date,
  periodCount: Number,
  payments: [{ date: Date, amount: Number }],
  screenshot: String,
  totalInterest: Number,
  totalPayable: Number,
  createdAt: { type: Date, default: Date.now }
}))

/* ----------------------
   Utilities
   ---------------------- */
function computeInterest({ amount = 0, rate = 0, periods = 0, interestType = 'Simple', frequency = 'Monthly' }) {
  const principal = Number(amount || 0)
  let r = Number(rate || 0) / 100
  if (frequency === 'Monthly') r = r / 12

  if (interestType === 'Simple') {
    const totalInterest = principal * r * Number(periods || 0)
    const totalPayable = principal + totalInterest
    return { totalInterest, totalPayable }
  } else {
    const totalPayable = principal * Math.pow(1 + r, Number(periods || 0))
    const totalInterest = totalPayable - principal
    return { totalInterest, totalPayable }
  }
}

function computeOutstanding(tx) {
  const totalPayable = Number(tx.totalPayable || 0)
  const paid = (tx.payments || []).reduce((s, p) => s + Number(p.amount || 0), 0)
  return Math.max(0, totalPayable - paid)
}

/* ----------------------
   Routes
   ---------------------- */

// Summary: total profiles, transactions, and outstanding across all transactions
app.get('/api/summary', async (req, res) => {
  try {
    const profilesCount = await Profile.countDocuments()
    const transactionsCount = await Transaction.countDocuments()
    const txs = await Transaction.find().lean()
    let totalOutstanding = 0
    for (const t of txs) {
      const paid = (t.payments || []).reduce((s, p) => s + (p.amount || 0), 0)
      const outstanding = (t.totalPayable || 0) - paid
      totalOutstanding += outstanding
    }
    return res.json({ profilesCount, transactionsCount, totalOutstanding })
  } catch (err) {
    console.error('GET /api/summary error', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// List profiles
app.get('/api/profiles', async (req, res) => {
  try {
    const list = await Profile.find().lean()
    return res.json(list)
  } catch (err) {
    console.error('GET /api/profiles error', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// Create transaction (find-or-create profile by name for dev convenience)
app.post('/api/transactions', async (req, res) => {
  try {
    const { profileName, amount, interestRate, interestType = 'Simple', frequency = 'Monthly', startDate, periodCount = 0, screenshot } = req.body

    if (!profileName || !amount) {
      return res.status(400).json({ message: 'profileName and amount are required' })
    }

    // find or create profile
    let profile = await Profile.findOne({ name: profileName })
    if (!profile) profile = await new Profile({ name: profileName }).save()

    const numericAmount = Number(amount || 0)
    const numericRate = Number(interestRate || 0)
    const numericPeriods = Number(periodCount || 0)

    const { totalInterest, totalPayable } = computeInterest({
      amount: numericAmount, rate: numericRate, periods: numericPeriods, interestType, frequency
    })

    const tx = new Transaction({
      profileId: profile._id,
      amount: numericAmount,
      interestRate: numericRate,
      interestType,
      frequency,
      startDate: startDate ? new Date(startDate) : new Date(),
      periodCount: numericPeriods,
      screenshot,
      totalInterest: Number(totalInterest.toFixed(2)),
      totalPayable: Number(totalPayable.toFixed(2))
    })

    await tx.save()
    return res.json(tx)
  } catch (err) {
    console.error('POST /api/transactions error', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// List transactions (optional profileId query)
app.get('/api/transactions', async (req, res) => {
  try {
    const { profileId } = req.query
    const q = profileId ? { profileId } : {}
    const list = await Transaction.find(q).populate('profileId').lean()
    return res.json(list)
  } catch (err) {
    console.error('GET /api/transactions error', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

// Add payment to a transaction
app.post('/api/transactions/:id/payments', async (req, res) => {
  try {
    const { id } = req.params
    const { amount, date } = req.body
    if (!amount || Number(amount) <= 0) return res.status(400).json({ message: 'Invalid amount' })

    const tx = await Transaction.findById(id)
    if (!tx) return res.status(404).json({ message: 'Transaction not found' })

    tx.payments = tx.payments || []
    tx.payments.push({ amount: Number(amount), date: date ? new Date(date) : new Date() })
    await tx.save()

    const paid = tx.payments.reduce((s, p) => s + (p.amount || 0), 0)
    const outstanding = Math.max(0, (tx.totalPayable || 0) - paid)

    return res.json({ transaction: tx, outstanding })
  } catch (err) {
    console.error('POST /api/transactions/:id/payments error', err)
    return res.status(500).json({ message: 'Server error' })
  }
})

/* ----------------------
   Server start
   ---------------------- */
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('API running on', PORT))
