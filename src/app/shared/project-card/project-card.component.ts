import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { IProject } from '../../models/project.interface';
import { NgClass, NgStyle } from '@angular/common';
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent {
  projectInfo = input<IProject>({
    title:'Финки НКВД',
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'zazik',
    totalFunded: 12312312,
    daysRemaining:100,
    tags: '#CRUTO',
    id: 1,
    link: 'project/${author}/${fixedTitle}',
    image: 'base64;jopsdaffbhjlasdbfljsdafbsadkjhgvbalsgilqwebrtugibsdeagybasuorbgtsaudbgvflsajybgoyuawsybgsadgfboysaregsegphasbyeuigopbsayiodugoisabdgyh',
    goal: 12312312
  })
  
  percent = computed(() => {
    return Math.round(this.projectInfo().totalFunded / this.projectInfo().goal * 100)
  })

  projectProgress = computed(() => {
    return this.percent() >= 100 ? 'bg-green-400' : 'bg-blue-600'
  })
  
}
