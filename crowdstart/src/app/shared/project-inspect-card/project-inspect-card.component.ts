import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { ProjectService } from '../../core/project.service';
import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-project-inspect-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf, AsyncPipe],
  templateUrl: './project-inspect-card.component.html',
  styleUrl: './project-inspect-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectInspectCardComponent {
  projectService = inject(ProjectService);
  route = inject(ActivatedRoute);
  preview = signal('')

  project$ = this.projectService
    .getProjectById(Number(this.route.snapshot.queryParamMap.get('id')))
    .pipe(
      tap((res) => {
       this.preview.set(this.projectService.getPreviewByProjectNameAndId(res.data[0].title, res.data[0].id))
      })
    );
}
