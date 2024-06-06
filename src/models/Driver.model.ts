import {
  Column,
  Model,
  DataType,
  Table,
  HasMany,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Car from "./Car.model";
import ScheduledTravel from "./ScheduledTravel.model";
import Chronogram from "./Chronogram.model";
import Review from "./Review.model";
import Remiserie from "./Remiserie.model";
import DriverCar from "./intermediate/DriverCar.model";
import DriverChronogram from "./intermediate/DriverChronogram";

@Table({
  timestamps: true,
  tableName: "driver",
  modelName: "Driver",
})
class Driver extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.STRING)
  last_name!: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column(DataType.STRING)
  address!: string;

  @Column(DataType.STRING)
  profile_img!: string;

  //TODO - EDAD O FECHA DE NACIMIENTO?
  @Column({ type: DataType.DATEONLY, allowNull: false })
  birthdate!: Date;

  @Column({ type: DataType.INTEGER, unique: true })
  dni!: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone!: string;

  @Column(DataType.STRING)
  license_movil!: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  license_pro!: string;

  @ForeignKey(() => Remiserie)
  @Column(DataType.UUID)
  remiserie_id!: string;

  @Column(DataType.FLOAT) // Para latitud y longitud, se suele usar FLOAT
  latitude!: number;

  @Column(DataType.FLOAT)
  longitude!: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  state!: boolean;

  //Relacion Driver -> Cars
  @BelongsToMany(() => Car, () => DriverCar)
  cars!: Car[];

  //Relacion Driver -> ScheduledTravel
  @HasMany(() => ScheduledTravel)
  scheduledTravels!: ScheduledTravel[];

  //Relacion Driver -> Chronogram
  @BelongsToMany(() => Chronogram, () => DriverChronogram)
  chronograms!: Chronogram[];

  //Relacion Driver -> Review
  @HasMany(() => Review)
  reviews!: Review[];

  //Relacion Remiserie -> Driver una unica remiseria por driver
  @BelongsTo(() => Remiserie)
  remiserie!: Remiserie;
}

export default Driver;
