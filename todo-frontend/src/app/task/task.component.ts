import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit{
 
 constructor(private taskService:TaskService){}

newTask:Task = {name:""};
AllTasks:Task[]= [];
editTask:Task|null=null;
updateTask:Task={name:""};


ngOnInit(): void {
    this.getAllTasks();
}
createTask():void{
 this.taskService.createTask(this.newTask).subscribe((createdTask) => {
  this.newTask={name:"",};
  this.AllTasks.push(createdTask);
 })
}

getAllTasks(){
  this.taskService.getAllTasks().subscribe((AllTasks) => {
   this.AllTasks=AllTasks;
  })
 }

 editedTask(task:Task){
  this.editTask=task;
  this.updateTask = { ...task };
 }
 


 updatedTask(){
  if(this.editTask){
  this.taskService.updateTask(this.editTask.id!,this.updateTask)
  .subscribe((result) => {
    const index=this.AllTasks.findIndex((task)=> task.id ==this.editTask?.id)
    if(index != -1){
      this.AllTasks[index]=result;
    this.cancelEdit();
    }
  })
 }}

 cancelEdit(){
  this.editTask=null;
  this.updateTask={name:""};
 }

 deletedTask(id:any){
  if(confirm('Are you sure want to delete?')){
       this.taskService.deleteTask(id).subscribe(()=>{
           this.AllTasks= this.AllTasks.filter((task) =>task.id !=id )
           if(this.editTask && this.editTask.id == id)
            this.cancelEdit();
       })
      }
 }
}
