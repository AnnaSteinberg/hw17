
export type CrewShift = {
    shift_id: number,
    startShift: number, //timestamp shift start time
    finishShift: number|null , //timestamp shift finish time
    table_num: string,
    shiftDuration: number,
    breaks: number, // решили, что это просто накопление перерывов, длительность которых фиксирована и может быть  = 15 или 30
    correct: string|null, //mng table_num
    monthHours: number // накопление рабочего времени с начала месяца
}

export type CurrentCrewShift = {
    table_num: string
}