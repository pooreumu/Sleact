import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { User } from 'src/common/decorator/user.decorator';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('api/workspaces')
export class WorkspacesController {
    constructor(private workspacesService: WorkspacesService) {}
    @Get()
    async getMyWorkspaces(@User() user: Users) {
        return await this.workspacesService.findMyWorkspaces(user.id);
    }

    @Post()
    async createWorkspace(
        @User() user: Users,
        @Body() body: CreateWorkspaceDto,
    ) {
        return await this.workspacesService.createWorkspace(
            body.workspace,
            body.url,
            user.id,
        );
    }

    @Get(':url/members')
    getAllMembersInWorkspaces() {}

    @Post(':url/members')
    inviteMemberToWorkspaces() {}

    @Delete(':url/members/:memberId')
    kickMemberFromWorkspaces() {}

    @Get(':url/members/:memberId')
    getAllUsersInWorkspaces() {}
}
