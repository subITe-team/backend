import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from "sequelize-typescript";
import Driver from "./Driver.model";
import Passenger from "./Passenger.model";
import Car from "./Car.model";
import PassengerRemiserie from "./intermediate/PassengerRemiserie";
import DriverRemiserie from "./intermediate/DriverRemiserie";
import Review from "./Review.model";
import ScheduledTravel from "./ScheduledTravel.model";
import Chronogram from "./Chronogram.model";

@Table({
  timestamps: true,
  tableName: "remiseries",
  modelName: "Remiserie",
})
class Remiserie extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;
  @Column({ type: DataType.STRING, allowNull: false }) name!: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email!: string;
  @Column({ type: DataType.STRING, allowNull: false }) password!: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name_remiserie!: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone!: string;
  @Column({
    type: DataType.STRING(512),
    unique: true,
    allowNull: true,
  })
  token!: string | null;
  @Column({ type: DataType.STRING, allowNull: false }) profile_img!: string;
  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  subscription_date!: Date;

  //Relacion Remiserie -> Passenger - Muchos pasajeros
  @BelongsToMany(() => Passenger, () => PassengerRemiserie)
  passengers!: Passenger[];

  //Relacion Remiserie -> Driver - Muchos pasajeros
  @BelongsToMany(() => Driver, () => DriverRemiserie)
  drivers!: Driver[];

  //Relacion Remiserie -> Car
  @HasMany(() => Car)
  cars!: Car[];

  //Relacion Remiserie -> Car
  @HasMany(() => Review)
  reviews!: Review[];

  //Relacion Remiserie -> Car
  @HasMany(() => ScheduledTravel)
  travels!: ScheduledTravel[];

  @HasMany(() => Chronogram)
  chronograms!: Chronogram[];
}

export default Remiserie;
