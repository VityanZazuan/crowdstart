import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { FormArray, FormBuilder,  FormControl,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import {  debounceTime, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { ProjectService } from '../../core/project.service';
export interface IFormCreate {
  projectName: string,
  projectDescription: string,
  projectImage: any,
  goal: number,
  days: Date,
  author: string,
  previewImage: File,
  withRewards: boolean,
  rewards: any[],
}
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
    // previewImage: new FormControl<File | null>(null),
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
  createdProject!:any
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
        switchMap((res: any) => {
          this.createdProject = res.data[0]
          return this.project.createReward([
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
        }
        ),
        switchMap(() => { 
          console.log(this.createdProject);
          
          return this.project.uploadPreview(this.preview(), this.createdProject.title, this.createdProject.id,this.contentType)
        })
        // switchMap()
      )
      .subscribe();
  }
  preview = signal('')
  contentType!:string
  onFileSelected(e: Event):void {
    const files = (e.target as HTMLInputElement).files
    console.log('uploaded files:', files);
    if (files === null) return;
    this.contentType = files[0].type
    this.projectForm?.get('previewImage')?.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview.set(reader.result as string)
      console.log(this.preview());
      
    }
    reader.readAsDataURL(files[0])
    // this.cdr.detectChanges()
  }
}

//
//  project -> reward -> create folder -> create file
//



// const avatarFile = event.target.files[0]
// const { data, error } = await supabase
//   .storage
//   .from('avatars')
//   .upload('${<projectName>-<projectID>}/${<projectName>-preview}.png', avatarFile, {
//     cacheControl: '3600',
//     upsert: false
//   })


// import { decode } from 'base64-arraybuffer'
// const { data, error } = await supabase
//   .storage
//   .from('avatars')
//   .upload('${<projectName>-<projectID>}/${<projectName>-preview}.png', decode('base64FileData'), {
//     contentType: 'image/png'
//   })