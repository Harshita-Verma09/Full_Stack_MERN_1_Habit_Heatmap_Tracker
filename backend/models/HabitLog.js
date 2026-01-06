import mongoose from "mongoose";


const habitLogSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        date: {
            type: Date,
            required: true
        },

        taskCompleted: {
            type: Number,
            default: 0
        },

        totalTask: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: ["completed", "partial", "missed"],
            required: true
        }
    },
    { timestamps: true }
);

// Same user, same date → duplicate entry na ho
habitLogSchema.index({ name: 1, date: 1 }, { unique: true });

const HabitLog = mongoose.model("HabitLog", habitLogSchema);
export default HabitLog;
