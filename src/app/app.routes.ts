import { Routes } from '@angular/router';
import { ProjectCreateComponent } from './shared/project-create/project-create.component'
import { ProjectInspectCardComponent } from './shared/project-inspect-card/project-inspect-card.component'
import { FeedComponent } from './shared/feed/feed.component';
export const routes: Routes = [
    {
        path: 'project',
        children: [
            {
                path: 'create',
                component: ProjectCreateComponent
            },
            // {
            //     path: '/:id',
            //     component: ProjectInspectCardComponent
            // }
        ]
    },
    {
        path:'feed',
        component:FeedComponent
    },
    {
        path: '**',
        redirectTo: 'feed'
    }
];
