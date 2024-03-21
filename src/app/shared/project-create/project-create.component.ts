import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import {  debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, JsonPipe],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCreateComponent {
  @ViewChild("previewImage") previewImage!:ElementRef
  formBuilder = inject(FormBuilder)
  cdr = inject(ChangeDetectorRef)
  projectForm = this.formBuilder.group({
    projectName: ['',Validators.required],
    projectDescription: ['',Validators.required],
    projectImage: [],
    goal: [''],
    days: [''],
    author: [''],
    previewImage: [''],
    withRewards: [false],
    rewards: new FormArray([this.createReward()])
  })
  constructor() { 
    this.projectForm.valueChanges.pipe(
      debounceTime(500),
      takeUntilDestroyed()
    ).subscribe((res)=> {
      console.log(res);
      console.log(this.previewImage.nativeElement.files[0]);
      console.log(this.projectForm);
    })
  }
  addReward():void { 
    const rewardsGroup = this.projectForm.controls.rewards
    rewardsGroup.push(this.createReward())
  }
  deleteReward(index:number):void {
    console.log(index);
    
    this.projectForm.controls.rewards.controls.splice(index,1)
    console.log( this.projectForm.controls.rewards);
    
  }
  createReward(): FormGroup {
    return this.formBuilder.group({
      rewardName: [],
    })
  }
}
