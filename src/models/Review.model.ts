import {
  Column,
  Model,
  DataType,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Driver from "./Driver.model";
import Passenger from "./Passenger.model";
import ScheduledTravel from "./ScheduledTravel.model";
import Remiserie from "./Remiserie.model";

@Table({
  timestamps: true,
  tableName: "review",
  modelName: "Review",
})
class Review extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Driver)
  @Column({
    type: DataType.UUID,
  })
  driver_id!: string;

  @ForeignKey(() => Passenger)
  @Column({
    type: DataType.UUID,
  })
  passenger_id!: string;

  @ForeignKey(() => Remiserie)
  @Column({
    type: DataType.UUID,
  })
  remiserie_id!: string;

  @ForeignKey(() => ScheduledTravel)
  @Column({
    type: DataType.UUID,
    unique: true,
  })
  travel_id!: string;

  @Column(DataType.TEXT)
  description!: string;

  @Column(DataType.INTEGER)
  card_stars!: number;

  //Relacion Passenger -> Review
  @BelongsTo(() => Passenger)
  passenger!: Passenger[];

  //Relacion Driver -> Review
  @BelongsTo(() => Driver)
  driver!: Driver[];

  //Relacion Driver -> Review
  @BelongsTo(() => Remiserie)
  remiserie!: Remiserie[];
}

export default Review;
