// export type DriversMap = Map<string, WeeksMap>;

export type DriversMap = { [driver: string]: WeeksMap };

// export type WeeksMap = Map<number, DaysMap>;
export type WeeksMap = { [week: number]: DaysMap };

// export type DaysMap = Map<number, HoursMap>;
export type DaysMap = { [day: number]: HoursMap };

// export type HoursMap = Map<number, {}>;
export type HoursMap = { [hour: number]: TaskDetails };

export type TaskDetails = {
  endHour: number;
  task: Tasks;
  location: string;
  additionalInfo: string;
};

export type Tasks = "pickup" | "dropoff" | "other";
