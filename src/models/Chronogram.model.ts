import {
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import Driver from "./Driver.model";
import Remiserie from "./Remiserie.model";
import DriverChronogram from "./intermediate/DriverChronogram";

@Table({
  timestamps: true,
  tableName: "chronograms",
  modelName: "Chronogram",
})
class Chronogram extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Driver)
  @Column(DataType.UUID)
  driver_id!: string;

  @ForeignKey(() => Remiserie)
  @Column(DataType.UUID)
  remiserie_id!: string;

  @Column(DataType.STRING)
  date!: string;

  @Column(DataType.STRING)
  shift!: string;

  //Relacion Driver -> Crhonogram
  @BelongsToMany(() => Driver, () => DriverChronogram)
  drivers!: Driver;

  @BelongsTo(() => Remiserie)
  remiserie!: Remiserie;

}

export default Chronogram;