import HabitLog from "../models/HabitLog.js";   // YE LINE MISS THI


export const logHabit = async (req, res) => {
    try {
        const { name, date, taskCompleted, totalTask } = req.body;

        let status = "missed";
        if (taskCompleted === totalTask) status = "completed";
        else if (taskCompleted > 0) status = "partial";

        const habit = await HabitLog.findOneAndUpdate(
            { name, date: new Date(date) },
            { taskCompleted, totalTask, status },
            { upsert: true, new: true }
        );

        res.json(habit);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const getHabits = async (req, res) => {
    try {
        const data = await HabitLog.find().sort({ date: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
