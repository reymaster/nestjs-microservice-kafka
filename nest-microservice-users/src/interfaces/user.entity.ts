import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  Generated,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: false, name: 'name' })
  name: string;

  @Column({ nullable: false, name: 'email' })
  @Index('email_1', { unique: true })
  email: string;

  @Column({ nullable: true, name: 'phone' })
  phone: string;

  @Column({ length: 255, nullable: false })
  password: string;

  @CreateDateColumn()
  createdAt: string;

  @Column({ default: 'ACTIVE' })
  status: 'ACTIVE' | 'DEACTIVATED';

  @DeleteDateColumn()
  deletedAt!: Date;
}
