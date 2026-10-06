import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    stripeEventId: {
        type: String,
        required: true,
        unique: true
    },
    stripeSessionId: {
        type: String,
        required: true,
        unique: true
    },
    paymentIntentId: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["paid", "failed", "pending"],
        default: "pending"
    }
}, { timestamps: true });

const PaymentModel = mongoose.model("Payment", paymentSchema);

export default PaymentModel;