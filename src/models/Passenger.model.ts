import {
  Column,
  Model,
  DataType,
  Table,
  HasMany,
  ForeignKey,
  BelongsToMany,
} from "sequelize-typescript";
import Review from "./Review.model";
import ScheduledTravel from "./ScheduledTravel.model";
import Remiserie from "./Remiserie.model";
import PassengerRemiserie from "./intermediate/PassengerRemiserie";

@Table({
  timestamps: true,
  tableName: "passenger",
  modelName: "Passenger",
})
class Passenger extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  first_name!: string;

  @Column(DataType.STRING)
  last_name!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  birthdate!: Date;

  @Column({ type: DataType.STRING, allowNull: false })
  password!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  phone!: string;

  @Column(DataType.FLOAT) // Para latitud y longitud, se suele usar FLOAT
  latitude!: number;

  @Column(DataType.FLOAT)
  longitude!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  dni!: string;

  @Column(DataType.STRING)
  profile_img!: string;

  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //modificar defualt Value: TRUE por FALSE despues <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true }) //<<<<<<<<
  passenger_verified!: boolean; //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  @ForeignKey(() => Remiserie)
  @Column({
    type: DataType.UUID,
  })
  remiserie_id!: string;

  //Relacion Passenger -> Review
  @HasMany(() => Review)
  reviews!: Review[];

  //Relacion Passenger -> ScheduledTravel
  @HasMany(() => ScheduledTravel)
  travels!: ScheduledTravel[];

  //Relacion un remiserie para cada passenger
  @BelongsToMany(() => Remiserie, () => PassengerRemiserie)
  remiserie!: Remiserie[];
}

export interface PassengerAttributes {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  dni: string;
  // ... add other required attributes
}

export default Passenger;
