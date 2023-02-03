import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { User } from '../common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from '../common/interceptor/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOkResponse({
        description: '성공',
        type: UserDto,
    })
    @ApiOperation({ summary: '내 정보 조회' })
    @Get()
    getUsers(@User() user) {
        return user;
    }
    @ApiOperation({ summary: '회원가입' })
    @Post()
    async createUser(@Body() data: JoinRequestDto) {
        await this.usersService.createUser(
            data.email,
            data.nickname,
            data.password,
        );
    }
    @ApiOperation({ summary: '로그인' })
    @Post('login')
    login(@User() user) {
        return user;
    }

    @ApiOperation({ summary: '로그아웃' })
    @Post('logout')
    logout(@Req() req, @Res() res) {
        req.logout();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}
