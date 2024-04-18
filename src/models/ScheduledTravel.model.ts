import {
  Column,
  Model,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import Driver from "./Driver.model";
import Car from "./Car.model";
import Passenger from "./Passenger.model";
import Review from "./Review.model";
import Remiserie from "./Remiserie.model";
@Table({
  timestamps: true,
  tableName: "scheduledTravels",
  modelName: "ScheduledTravel",
})
class ScheduledTravel extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Passenger)
  @Column(DataType.UUID)
  passenger_id!: string;

  @ForeignKey(() => Driver)
  @Column(DataType.UUID)
  driver_id!: string;

  @ForeignKey(() => Review)
  @Column(DataType.UUID)
  review_id!: string;

  @ForeignKey(() => Car)
  @Column(DataType.UUID)
  car_id!: string;

  @ForeignKey(() => Remiserie)
  @Column(DataType.UUID)
  remiserie_id!: string;

  @Column(DataType.DATE) start_time!: Date;
  @Column(DataType.STRING) origin!: string;
  @Column(DataType.STRING) destiny!: string;

  //Relacion Driver -> ScheduledTravel
  @BelongsTo(() => Driver)
  drivers!: Driver;

  //Relacion Car -> ScheduledTravel
  @BelongsTo(() => Car)
  car!: Car;

  //Relacion Passenger -> ScheduledTravel
  @BelongsTo(() => Passenger)
  passenger!: Passenger;

  @BelongsTo(() => Remiserie)
  remiserie!: Remiserie;

  @BelongsTo(() => Review)
  review!: Review;
}

export default ScheduledTravel;
