require('dotenv').config()
const mongoose = require('mongoose')

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/interest_app_dev'
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('Mongo connected'))
  .catch(e=>{ console.error('Mongo connect failed:', e.message || e); process.exit(1) })

const Profile = mongoose.model('Profile', new mongoose.Schema({
  name: String, phone: String, notes: String, createdAt: { type: Date, default: Date.now }
}))

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  amount: Number,
  interestRate: Number,
  interestType: String,
  frequency: String,
  startDate: Date,
  periodCount: Number,
  payments: [{ date: Date, amount: Number }],
  totalInterest: Number,
  totalPayable: Number,
  createdAt: { type: Date, default: Date.now }
}))

async function seed() {
  try {
    await Profile.deleteMany({})
    await Transaction.deleteMany({})

    const p1 = await new Profile({ name: 'Alu' }).save()
    const p2 = await new Profile({ name: 'Riya' }).save()

    async function computeAndSave(profileId, amount, rate, type, frequency, periods, payments = []) {
      let r = rate / 100
      if (frequency === 'Monthly') r = r / 12
      let totalPayable = 0
      if (type === 'Simple') totalPayable = amount + (amount * r * periods)
      else totalPayable = amount * Math.pow(1 + r, periods)
      const tx = new Transaction({
        profileId,
        amount,
        interestRate: rate,
        interestType: type,
        frequency,
        startDate: new Date(),
        periodCount: periods,
        payments,
        totalInterest: Number((totalPayable - amount).toFixed(2)),
        totalPayable: Number(totalPayable.toFixed(2))
      })
      return tx.save()
    }

    await computeAndSave(p1._id, 10000, 12, 'Simple', 'Monthly', 6, [{ amount: 2000, date: new Date() }])
    await computeAndSave(p2._id, 50000, 10, 'Compound', 'Yearly', 1, [])
    await computeAndSave(p1._id, 20000, 8, 'Simple', 'Monthly', 12, [])

    console.log('Seed complete')
    process.exit(0)
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
}

seed()
