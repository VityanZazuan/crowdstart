import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { IProject, IProject2 } from '../../models/project.interface';
import { NgClass, NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectService } from '../../core/project.service';
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgStyle, NgClass, RouterLink],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  projectService = inject(ProjectService)
  projectInfo = input<IProject2>({
    title:'Финки НКВД',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'zazik',
    totalFunded: 12312312,
    daysRemaining:100,
    created_at: new Date(),
    // tags: '#CRUTO',
    id: 1,
    link: 'project/${author}/${fixedTitle}',
    // image: 'base64;jopsdaffbhjlasdbfljsdafbsadkjhgvbalsgilqwebrtugibsdeagybasuorbgtsaudbgvflsajybgoyuawsybgsadgfboysaregsegphasbyeuigopbsayiodugoisabdgyh',
    goal: 12312312
  })
  publicUrl = computed(() => {
    return this.projectService.getPreviewByProjectNameAndId(this.projectInfo().title,this.projectInfo().id)
  })
  percent = computed(() => {
    return Math.round(this.projectInfo().totalFunded / this.projectInfo().goal * 100)
  })

  projectProgress = computed(() => {
    return this.percent() >= 100 ? 'bg-green-400' : 'bg-blue-600'
  })
  
}
