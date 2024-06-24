import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './add-task-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../../shared/models/task.models';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../../store/actions/task.actions'
import { LoadingComponent } from '../../../shared/components/loading.component';


@Component({
  selector: 'app-task-controls',
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    DialogComponent,
    LoadingComponent
  ],
  templateUrl: './task-controls.component.html',
  styleUrls: ['./task-controls.component.css']
})
export class TaskControlsComponent {
  title: string | undefined;

  constructor(
    private store: Store,
    public dialog: MatDialog) {}

  openDialog(): void {
    let emptyTaskModel : Task = {
      title: "",
      description: "",
      createdAt: ""
    };
    let dialogRef = this.dialog.open(DialogComponent, {width: '3rem',data: emptyTaskModel});
    
    dialogRef.afterClosed().subscribe(task => {
      if(task) {
        this.store.dispatch(TaskActions.addTask({task}))
      }
    });

  }
}
