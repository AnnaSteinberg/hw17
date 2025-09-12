import mongoose from 'mongoose';

const CrewShiftSchema = new mongoose.Schema({
    _id: {type: Number, require: true},
    startShift: {type:Number,require: true},
    finishShift: { type: Number, default: null },
    table_num: {type:String , require: true},
    shiftDuration: {type:Number , default: 0},
    breaks: {type:Number, default: null},
    correct: { type: String, default: null },
    monthHours: {type:Number,default: 0}
}, { versionKey: false });

export const CrewShiftModel = mongoose.model('CrewShift', CrewShiftSchema, 'crew_shifts');