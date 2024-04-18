import {
  Column,
  Model,
  DataType,
  Table,
  BelongsToMany,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import Driver from "./Driver.model";
import ScheduledTravel from "./ScheduledTravel.model";
import DriverCar from "./intermediate/DriverCar.model";
import Remiserie from "./Remiserie.model";

@Table({
  timestamps: true,
  tableName: "car",
  modelName: "Car",
})
class Car extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  brand!: string;

  @Column(DataType.STRING)
  model!: string;

  @Column(DataType.STRING)
  patent!: string;

  @Column(DataType.STRING)
  color!: string;

  @Column(DataType.INTEGER)
  year!: number;

  @Column(DataType.BOOLEAN)
  habilitation!: boolean;

  @Column(DataType.STRING)
  insurance!: string;

  @Column(DataType.DATE)
  date_onboarding!: Date;

  @ForeignKey(() => Remiserie)
  @Column(DataType.UUID)
  remiserie_id!: string;

  // Relacion Car -> Driver
  @BelongsToMany(() => Driver, () => DriverCar)
  drivers!: Driver[];

  // Relacion Car -> ScheduledTravel
  @HasMany(() => ScheduledTravel)
  travels!: ScheduledTravel[];

  //Relacion Car -> Remiserie
  @BelongsTo(() => Remiserie)
  remiserie!: Remiserie;
}

export default Car;
