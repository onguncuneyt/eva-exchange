import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({ tableName: 'shares', schema: 'public' })
export class ShareEntity extends Model<ShareEntity> {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  symbol: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  rate: number;
}
