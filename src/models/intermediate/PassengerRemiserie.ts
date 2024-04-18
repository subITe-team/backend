import Remiserie from "../../models/Remiserie.model";
import Passenger from "../../models/Passenger.model";
import { Column, Model, Table, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: "passenger_remiserie",
  modelName: "PassengerRemiserie",
})
class PassengerRemiserie extends Model<PassengerRemiserie> {
  @ForeignKey(() => Passenger)
  @Column
  passenger_id!: string;

  @ForeignKey(() => Remiserie)
  @Column
  remiserie_id!: string;
}

export default PassengerRemiserie;
