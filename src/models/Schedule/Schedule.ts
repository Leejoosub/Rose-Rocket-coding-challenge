export type DriversMap = Map<string, WeeksMap>;

export type WeeksMap = Map<number, DaysMap>;

export type DaysMap = Map<number, HoursMap>;

export type HoursMap = Map<number, {}>

export type TaskDetails = { 
  endHour: number;
  task: Tasks;
  location: string;
  additionalInfo: string;
}

export type Tasks = "pickup" | "dropoff" | "other"

