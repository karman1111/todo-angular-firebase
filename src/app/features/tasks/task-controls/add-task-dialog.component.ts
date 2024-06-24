import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Task } from "../../../shared/models/task.models";

@Component({
    selector: 'dialog-overview-example-dialog',
    template: 
    `
        <h5 mat-dialog-title>Enter a Title</h5>
        <div mat-dialog-content>
            <mat-form-field>
                <mat-label>Title</mat-label>
                <input matInput [(ngModel)]="data.title">
            </mat-form-field>
            <mat-form-field>
                <mat-label>Description</mat-label>
                <input matInput [(ngModel)]="data.description">
            </mat-form-field>
            <mat-form-field>
                <mat-label>CreatedAt</mat-label>
                <input matInput [(ngModel)]="data.createdAt">
            </mat-form-field>
        </div>
        <div mat-dialog-actions>
            <button mat-button (click)="onNoClick()">Cancel</button>
            <button mat-button [mat-dialog-close]="data" cdkFocusInitial>Add</button>
        </div>
    `,
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
    ],
})
export class DialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Task
    ) { }
    
    onNoClick(): void {
        this.dialogRef.close();
    }
}
