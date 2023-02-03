import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) {}
    async createUser(email: string, nickname: string, password: string) {
        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            await this.usersRepository.save({
                email,
                nickname,
                password: hashedPassword,
            });
        } catch (e) {
            console.log({ e });
            throw e;
        }
    }
}
