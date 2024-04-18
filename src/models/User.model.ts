// import { v4 as uuidv4 } from 'uuid'
import {
  Table,
  Column,
  Model,
  DataType,
  // CreatedAt,
  // UpdatedAt,
  // BeforeCreate,
  // HasMany,
  // PrimaryKey,
} from "sequelize-typescript";

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username!: string;
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email!: string;
  @Column({ type: DataType.STRING, allowNull: false }) password!: string;
  @Column(DataType.STRING) profile_img!: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: true }) isAdmin!: boolean;
}

export default User;
