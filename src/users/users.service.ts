import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from '../entities/WorkspaceMembers';
import { ChannelMembers } from '../entities/ChannelMembers';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
        @InjectRepository(WorkspaceMembers)
        private readonly workspaceMembersRepository: Repository<WorkspaceMembers>,
        @InjectRepository(ChannelMembers)
        private readonly channelMembersRepository: Repository<ChannelMembers>,
        private readonly dataSource: DataSource,
    ) {}
    async createUser(email: string, nickname: string, password: string) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const hashedPassword = await bcrypt.hash(password, 12);

            const returned = await queryRunner.manager
                .getRepository(Users)
                .save({
                    email,
                    nickname,
                    password: hashedPassword,
                });

            await queryRunner.manager.getRepository(WorkspaceMembers).save({
                UserId: returned.id,
                WorkspaceId: 1,
            });

            await queryRunner.manager.getRepository(ChannelMembers).save({
                UserId: returned.id,
                ChannelId: 1,
            });

            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
            if (e.code === 'ER_DUP_ENTRY')
                throw new BadRequestException('같은 이메일 안됨');
            throw e;
        } finally {
            await queryRunner.release();
        }
    }
}
