import {CrewShift, CurrentCrewShift} from "../model/CrewShift.js";


export interface CrewShiftService {
    startShift: (tab_num: string) => Promise<{ tab_num: string, time: number }>;
    finishShift: (tab_num: string) => { tab_num: string, time: number };
    break: (tab_n: string, number: number) => void
    correctShift: (tab_n_crew: string, tab_n_mng: string, start: number, finish: number, date: number) => void
    getCurrentShiftStaff:() => { shift: CurrentCrewShift[] };
}