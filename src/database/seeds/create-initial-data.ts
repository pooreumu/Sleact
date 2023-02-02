import { DataSource } from 'typeorm';
import { Channels } from '../../entities/Channels';
import { Workspaces } from '../../entities/Workspaces';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class CreateInitialData implements Seeder {
    public async run(
        dataSource: DataSource,
        seederFactoryManager: SeederFactoryManager,
    ): Promise<any> {
        const workspacesRepository = dataSource.getRepository(Workspaces);
        await workspacesRepository.insert([
            {
                id: 1,
                name: 'Sleact',
                url: 'sleact',
            },
        ]);
        const channelsRepository = dataSource.getRepository(Channels);
        await channelsRepository.insert([
            {
                id: 1,
                name: '일반',
                WorkspaceId: 1,
                private: false,
            },
        ]);
    }
}
