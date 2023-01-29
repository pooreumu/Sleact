import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('DM')
@Controller('api/workspaces/:url/dms')
export class DmsController {
    @ApiParam({
        name: 'url',
        required: true,
        description: '워크스페이스 url',
    })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'dm id',
    })
    @ApiQuery({
        name: 'perPage',
        required: true,
        description: '한번에 가져오는 개수',
    })
    @ApiQuery({
        name: 'page',
        required: true,
        description: '한번에 불러올 페이지',
    })
    @Get(':id/chats')
    getChat(@Query() query, @Param() param) {}

    @Post(':id/chats')
    postChat() {}
}
