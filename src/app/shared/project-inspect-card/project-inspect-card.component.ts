import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ProjectService } from '../../core/project.service';

@Component({
  selector: 'app-project-inspect-card',
  standalone: true,
  imports: [],
  templateUrl: './project-inspect-card.component.html',
  styleUrl: './project-inspect-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInspectCardComponent {
 id = input(0)
 projectService = inject(ProjectService)
 project$ = this.projectService.getProjectById(this.id())
}
