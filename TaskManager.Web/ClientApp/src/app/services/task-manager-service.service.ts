import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskManager } from '../models/task-manager.model';

const baseUrl = `https://localhost:44398/TaskManager`;

@Injectable({
  providedIn: 'root'
})

export class TaskManagerServiceService {

  constructor(private http:HttpClient) {
  }

  GetTaskList = () => {
    let body = new HttpParams();
    return this.http.post<TaskManager[]>(`${baseUrl}/gettasklist`, body);
  }

  SaveTask = (id: Number, taskName: string, taskDate:string) => {
    let body = new HttpParams();
    body = body.set('id', id.toString());
    body = body.set('taskName', taskName);
    body = body.set('taskDate', taskDate);
    return this.http.post<any>(`${baseUrl}/savetask`, body);
  }

  GetTask = (id: Number) => {
    let body = new HttpParams();    
    body = body.set('id', id.toString());
    return this.http.post<TaskManager>(`${baseUrl}/gettask`, body);
  }

  DeleteTask = (id: Number) => {
    let body = new HttpParams();    
    body = body.set('id', id.toString());
    return this.http.post<any>(`${baseUrl}/deletetask`, body);
  }

}
