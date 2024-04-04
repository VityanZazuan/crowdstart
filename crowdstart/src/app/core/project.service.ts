import { Injectable, inject } from '@angular/core';
import { Observable, from, of, tap } from 'rxjs';
import { IProject, IProject2 } from '../models/project.interface';
import { SupaBaseService } from './supa-base.service';
import { decode } from 'base64-arraybuffer'
import { ISupabaseResponce } from '../models/supabse-responce.interface';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  supabase = inject(SupaBaseService);
  getProjects(): Observable<PostgrestSingleResponse<IProject2[]>> {
    return from(this.supabase.supabase.from('projects').select());
  }

  getProjectById(id: number): Observable<any> {
    return from(
      this.supabase.supabase
        .from('projects')
        .select(`*, rewards(*)`)
        .eq('id', id)
    );
  }
  createProject(project: any): Observable<any> {
    return from(
      this.supabase.supabase.from('projects').insert(project).select()
    );
  }
  createReward(reward: any[]): Observable<any> {
    return from(this.supabase.supabase.from('rewards').insert(reward).select());
  }
  uploadPreview(file: string,projectName:string, projectId:number,fileType:string): Observable<any> {
    const strImage = file.replace(/^data:image\/[a-z]+;base64,/, "");
    return from(
      this.supabase.supabase.storage
        .from('crowdStart')
        .upload(
          `${projectName}-${projectId}/${projectName}-preview`,
          decode(strImage),
          {
            contentType: fileType,
          }
        )
    );
  }
  getPreviewByProjectNameAndId(projectName:string,projectId:number):string {
    const { data }  = this.supabase.supabase.storage.from('crowdStart').getPublicUrl(`${projectName}-${projectId}/${projectName}-preview`)
    return data.publicUrl
  }
}