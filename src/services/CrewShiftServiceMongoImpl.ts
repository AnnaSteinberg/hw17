import {CrewShiftService} from "./CrewShiftService.js";
import {CrewShift, CurrentCrewShift} from "../model/CrewShift.js";
import {CrewShiftModel} from "../model/CrewShiftMongoModels.js";


class CrewShiftServiceMongoImpl implements CrewShiftService {
    break(tab_n: string, number: number): void {
    }

    correctShift(tab_n_crew: string, tab_n_mng: string, start: number, finish: number, date: number): void {
    }

    finishShift(tab_num: string): { tab_num: string; time: number } {
        return {tab_num: "", time: 0};
    }

    async startShift(tab_num: string): Promise<{ tab_num: string; time: number }> {
        const temp_time = Date.now()
        const time: number = Math.floor(temp_time / 1000);
        const temp = await CrewShiftModel.findOneAndUpdate(
            {table_num: tab_num},
            { $set: { startShift: Date.now() } }, // обновление поля startShift
            { new: true }).then(crewShift => {console.log(crewShift)})
        return {tab_num: tab_num, time: time};
    }

    getCurrentShiftStaff(): { shift: CurrentCrewShift[] } {
        return {shift: []};
    }



}

export const crewShiftServiceMongo = new CrewShiftServiceMongoImpl();