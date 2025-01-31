import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiurl="http://localhost:8080/task";
  constructor( private httpClient:HttpClient) { }

  createTask(newTask:Task):Observable<Task>{
    return this.httpClient.post<Task>(this.apiurl,newTask);
  }

  getAllTasks():Observable<Task[]>{
    return this.httpClient.get<Task[]>(this.apiurl);
  }

  updateTask(id:number, task:Task):Observable<Task>{
    return this.httpClient.put<Task>(this.apiurl+'/'+id,task)
  }
  
  deleteTask(id:number){
    return this.httpClient.delete(this.apiurl+'/'+id);
  }
}
