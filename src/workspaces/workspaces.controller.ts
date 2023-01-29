import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
    @Get()
    getMyWorkspaces() {}

    @Post()
    createWorkspace() {}

    @Get(':url/members')
    getAllMembersInWorkspaces() {}

    @Post(':url/members')
    inviteMemberToWorkspaces() {}

    @Delete(':url/members/:memberId')
    kickMemberFromWorkspaces() {}

    @Get(':url/members/:memberId')
    getAllUsersInWorkspaces() {}
}
