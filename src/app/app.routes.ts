import { Router, Routes } from '@angular/router';
import { ProjectCreateComponent } from './shared/project-create/project-create.component'
import { FeedComponent } from './shared/feed/feed.component';
import { LoginComponent } from './shared/login/login.component';
import { inject } from '@angular/core';
import { SupaBaseService } from './core/supa-base.service';
import { authGuard } from './guards/auth.guard'
import { FooterComponent } from './shared/footer/footer.component';

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
        canActivate: [authGuard],
      },

    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [!authGuard],
  },
//   {
//     path: 'penis',
//     component: FooterComponent
//   },
  {
    path: '**',
    redirectTo: 'feed',
  },
];
