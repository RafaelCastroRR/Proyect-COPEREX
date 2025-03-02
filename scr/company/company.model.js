import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    impactLevel: {
        type: String,
        required: true,
    },
    yearsInBusiness: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

const Company = mongoose.model('Company', companySchema)
export default Company
