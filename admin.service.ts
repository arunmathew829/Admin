import { Injectable } from '@nestjs/common';
import { Admin } from './admin.entity';
import {  AdminRegisterRequestDto} from './admin-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

// export type User = {
//   id: number;
//   name: string;
//   username: string;
//   password: string;
// };
@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private AdminRepository: Repository<Admin>,
  ) {}
  //   Users: User[] = [
  //     { id: 1, name: 'Arun', username: 'arun', password: 'secure' },
  //     { id: 2, name: 'Mathew', username: 'mathew', password: 'secure' },
  //   ];
  async createUser(Registerdto: AdminRegisterRequestDto) {
    const { email, username } = Registerdto;

    const salt = await bcrypt.genSalt();
    const passwordEncrypt = await bcrypt.hash(Registerdto.password, salt);
    const confirmpasswordEncrypt = await bcrypt.hash(
      Registerdto.confirmPassword,
      salt,
    );

    const user = new Admin();
   user.id = uuid();
   user.email = email;
   user.username =username;
   user.password = passwordEncrypt;
   user.confirmPassword = confirmpasswordEncrypt;

    await this.AdminRepository.save(user);
    return { success: true, user };
  }
  catch(error: { message: any }) {
    return { success: false, message: error.message };
  }
  async findOne(username: string): Promise<Admin | undefined> {
    // return this.User.find((User) => User.username === username);
//return this.UserRepository.findOne((User)=>User.username ===username)
    return this.AdminRepository.findOne({where:{user.username === username}} );
  }
}
