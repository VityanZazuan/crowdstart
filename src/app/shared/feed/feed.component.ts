import { AsyncPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProjectService } from '../../core/project.service';
import { ProjectCardComponent } from '../project-card/project-card.component';
@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [NgFor, AsyncPipe, ProjectCardComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent {
  projectService = inject(ProjectService)
  projects$ = this.projectService.getProjects()
}
