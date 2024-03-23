import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import {  debounceTime, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ProjectService } from '../../core/project.service';
@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, JsonPipe],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateComponent {
  @ViewChild('previewImage') previewImage!: ElementRef;
  formBuilder = inject(FormBuilder);
  cdr = inject(ChangeDetectorRef);
  project = inject(ProjectService);
  projectForm = this.formBuilder.group({
    projectName: ['', Validators.required],
    projectDescription: ['', Validators.required],
    projectImage: [],
    goal: [''],
    days: [''],
    author: [''],
    previewImage: [''],
    withRewards: [false],
    rewards: new FormArray([this.createReward()]),
  });
  constructor() {
    this.projectForm.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed())
      .subscribe((res) => {
        console.log(res);
        console.log(this.previewImage.nativeElement.files[0]);
        console.log(this.projectForm);
      });
  }
  addReward(): void {
    const rewardsGroup = this.projectForm.controls.rewards;
    rewardsGroup.push(this.createReward());
  }
  deleteReward(index: number): void {
    this.projectForm.controls.rewards.controls.splice(index, 1);
  }
  createReward(): FormGroup {
    return this.formBuilder.group({
      rewardName: [],
    });
  }
  onCreateFormSubmit(): void {
    this.project
      .createProject({
        title: 'test',
        description: 'test',
        author: 'test',
        totalFunded: 0,
        daysRemaining: null,
        // tags:string
        link: 'test',
        image: 'test',

        goal: 1000,
      })
      .pipe(
        switchMap((res: any) =>
          this.project.createReward([
            {
              title: 'Награда 1',
              description: 'test',
              cost: 123,
              amount: 10,
              media: 'unknown media',
              project_id: res.data[0].id,
            },
            {
              title: 'Награда 2',
              description: 'test',
              cost: 123,
              amount: 10,
              media: 'unknown media',
              project_id: res.data[0].id,
            },
            {
              title: 'Награда 3',
              description: 'test',
              cost: 123,
              amount: 10,
              media: 'unknown media',
              project_id: res.data[0].id,
            },
          ])
        )
      )
      .subscribe();
  }
}
