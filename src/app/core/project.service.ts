import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProject } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  getProjects():Observable<IProject[]> { 
    return of<IProject[]>([
      {
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
      },
      {
        title:'Финки НКВД2',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: 'zazik',
        totalFunded:80,
        daysRemaining:100,
        tags: '#CRUTO',
        id: 2,
        link: 'project/${author}/${fixedTitle}',
        image: 'base64;jopsdaffbhjlasdbfljsdafbsadkjhgvbalsgilqwebrtugibsdeagybasuorbgtsaudbgvflsajybgoyuawsybgsadgfboysaregsegphasbyeuigopbsayiodugoisabdgyh',
        goal: 12312312
      },
      {
        title:'Финки НКВД2',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: 'zazik',
        totalFunded:25235,
        daysRemaining:100,
        tags: '#CRUTO',
        id: 3,
        link: 'project/${author}/${fixedTitle}',
        image: 'base64;jopsdaffbhjlasdbfljsdafbsadkjhgvbalsgilqwebrtugibsdeagybasuorbgtsaudbgvflsajybgoyuawsybgsadgfboysaregsegphasbyeuigopbsayiodugoisabdgyh',
        goal: 12312312
      },
      {
        title:'Финки НКВД2',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: 'zazik',
        totalFunded:11111,
        daysRemaining:100,
        tags: '#CRUTO',
        id: 4,
        link: 'project/${author}/${fixedTitle}',
        image: 'base64;jopsdaffbhjlasdbfljsdafbsadkjhgvbalsgilqwebrtugibsdeagybasuorbgtsaudbgvflsajybgoyuawsybgsadgfboysaregsegphasbyeuigopbsayiodugoisabdgyh',
        goal: 12312312
      },
      {
        title:'Финки НКВД2',
        description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: 'zazik',
        totalFunded:1234,
        daysRemaining:100,
        tags: '#CRUTO',
        id: 5,
        link: 'project/${author}/${fixedTitle}',
        image: 'base64;jopsdaffbhjlasdbfljsdafbsadkjhgvbalsgilqwebrtugibsdeagybasuorbgtsaudbgvflsajybgoyuawsybgsadgfboysaregsegphasbyeuigopbsayiodugoisabdgyh',
        goal: 12312312
      },
    ])
  }
}
