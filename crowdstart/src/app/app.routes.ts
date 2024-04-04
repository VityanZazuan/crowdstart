import { Routes } from '@angular/router';
import { ProjectCreateComponent } from './shared/project-create/project-create.component'
import { FeedComponent } from './shared/feed/feed.component';
import { LoginComponent } from './shared/login/login.component';
import { authGuard } from './guards/auth.guard'
import { canCreateGuard } from './guards/can-create.guard';
import { ProjectInspectCardComponent } from './shared/project-inspect-card/project-inspect-card.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: 'project',
    children: [
      {
        path: 'create',
        component: ProjectCreateComponent,
        canActivate: [canCreateGuard],
      },
      {
        path:'detail/:id',
        component: ProjectInspectCardComponent
      }
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'feed',
  },
];
