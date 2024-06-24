import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { TaskResponse } from '../../shared/models/task.models';
import { Subscription } from 'rxjs';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { TaskControlsComponent } from './task-controls/task-controls.component';
import { Store } from '@ngrx/store';
import { selectTasks } from '../../store/selectors/task.selectors';
import { ResolveEnd } from '@angular/router';
import { deleteTask, getTasks } from '../../store/actions/task.actions';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    TaskControlsComponent   
  ],
  providers: [
    TaskService
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})  
export class TasksComponent implements OnInit, OnDestroy {
  private taskSubscription !: Subscription;
  tasksTableColumn = ['id', 'title', 'description', 'createdAt', 'actions'];
  tasks : TaskResponse[] = [];

  constructor(
    private store: Store
  ){}
  
  ngOnInit(): void {
    this.taskSubscription = this.store.select(selectTasks).subscribe(response => {
      this.tasks = response;
    });
    this.store.dispatch(getTasks());
  }

  onDelete(id: string) {
    
    this.store.dispatch(deleteTask({name:id}));
  }

  ngOnDestroy(): void {
    this.taskSubscription.unsubscribe();
  }
}
