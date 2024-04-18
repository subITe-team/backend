export interface RequestBody {
  driver_id: string;
  passenger_id: string;
  car_id: string;
  start_time: Date;
  origin: string;
  destiny: string;
  review_id?: string;
}
