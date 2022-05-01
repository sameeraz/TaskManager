import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskManager } from '../models/task-manager.model';
import { TaskManagerServiceService } from '../services/task-manager-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  responseMessage: string;
  id: Number = 0;
  taskName: string;
  taskDate: string;
  taskList: TaskManager [] = [];
  isShow: boolean = false;

  ngOnInit(): void {
    this.GetTaskList();
  }

  

  constructor(private taskManagerServiceService :TaskManagerServiceService){
  }  

  GetTaskList(){
    this.taskManagerServiceService.GetTaskList().subscribe((response:TaskManager[]) => {
      this.taskList = response;
      console.log(this.taskList);
    });
  }

  
  SaveTask(){
    //this.TaskName = this.requestForm.value.TaskName;
    //this.TaskDate = this.requestForm.value.TaskDate;    
    this.taskManagerServiceService.SaveTask(this.id, this.taskName,this.taskDate).subscribe((response:any) => {
      this.responseMessage = response.message;
      this.GetTaskList();
    });
  }

  Edit(id: number){
    this.taskManagerServiceService.GetTask(id).subscribe((response:TaskManager) => {
      console.log(response);
      this.id = response.id;
      this.taskName = response.taskName;
      this.taskDate = response.taskDate;
    });
  }

  ShowTask(){
    this.isShow = !this.isShow;
  }

  DeleteTask(id: number){    
    this.taskManagerServiceService.DeleteTask(id).subscribe((response:any) => {
      this.responseMessage = response.message;
      this.GetTaskList();
    });
  }

  Reset(){
    this.id = 0;
    this.taskName = "";
    this.taskDate = "";
  }
  
}


