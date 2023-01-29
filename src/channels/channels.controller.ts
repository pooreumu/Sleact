import { Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
    @Get()
    getAllChannels(@Query() query, @Param() param) {}

    @Get(':name')
    getSpecificChannel(@Query() query, @Param() param) {}

    @Post()
    createChannel() {}

    @Get(':name/chats')
    getChats(@Query() query, @Param() param) {}

    @Post(':name/chats')
    createChat() {}

    @Post(':name/image')
    uploadImage() {}

    @Get(':name/members')
    getAllMembers() {}

    @Post(':name/members')
    inviteMember() {}
}
