import Chronogram from "../../models/Chronogram.model";
import Driver from "../../models/Driver.model";
import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "driver_chronogram",
  modelName: "DriverChronogram",
})
class DriverChronogram extends Model<DriverChronogram> {
  @ForeignKey(() => Driver)
  @Column(DataType.UUID)
  driver_id!: string;

  @ForeignKey(() => Chronogram)
  @Column(DataType.UUID)
  chronogram_id!: string;
}

export default DriverChronogram;
