import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  public id: any;

  @Column({ length: 50 })
  public email: string;

  @Column({ length: 50 })
  public username: string;

  @Column({ length: 50 })
  public password: string;

  @Column({ length: 50 })
  public confirmPassword: string;

  @CreateDateColumn({ nullable: true })
  public createdAt: Date;

  @BeforeInsert()
  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(password || this.password, salt);
  }
  @BeforeInsert()
  async setConfirmPassword(confirmPassword: string) {
    const salt = await bcrypt.genSalt();
    this.confirmPassword = await bcrypt.hash(
      confirmPassword || this.confirmPassword,
      salt,
    );
  }
}
