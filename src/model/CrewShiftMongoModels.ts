import mongoose from 'mongoose';

const CrewShiftSchema = new mongoose.Schema({
    shift_id: Number,
    startShift: Number,
    finishShift: { type: Number, default: null },
    table_num: String,
    shiftDuration: Number,
    breaks: Number,
    correct: { type: String, default: null },
    monthHours: Number
}, { versionKey: false });

export const CrewShiftModel = mongoose.model('CrewShift', CrewShiftSchema, 'crew_shifts');