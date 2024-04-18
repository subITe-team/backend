import Remiserie from "../../models/Remiserie.model";
import Driver from "../../models/Driver.model";
import { Column, Model, Table, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: "driver_remiserie",
  modelName: "DriverRemiserie",
})
class DriverRemiserie extends Model<DriverRemiserie> {
  @ForeignKey(() => Driver)
  @Column
  driver_id!: string;

  @ForeignKey(() => Remiserie)
  @Column
  remiserie_id!: string;
}

export default DriverRemiserie;
