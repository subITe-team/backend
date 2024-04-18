import Car from "../../models/Car.model";
import Driver from "../../models/Driver.model";
import { Column, Model, Table, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: "driver_car",
  modelName: "DriverCar",
})
class DriverCar extends Model<DriverCar> {
  @ForeignKey(() => Driver)
  @Column
  driver_id!: string;

  @ForeignKey(() => Car)
  @Column
  car_id!: string;
}

export default DriverCar;
