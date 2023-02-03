import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { User } from '../common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from '../common/interceptor/undefinedToNull.interceptor';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { NotLoggedInGuard } from '../auth/not-logged-in.guard';

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
    @UseGuards(NotLoggedInGuard)
    @Post()
    async createUser(@Body() data: JoinRequestDto) {
        await this.usersService.createUser(
            data.email,
            data.nickname,
            data.password,
        );
    }

    @ApiOperation({ summary: '로그인' })
    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@User() user) {
        return user;
    }

    @ApiOperation({ summary: '로그아웃' })
    @UseGuards(LoggedInGuard)
    @Post('logout')
    logout(@Req() req, @Res() res) {
        req.logout();
        res.clearCookie('connect.sid', { httpOnly: true });
        res.send('ok');
    }
}
