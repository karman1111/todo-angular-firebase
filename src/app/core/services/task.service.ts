import { Injectable } from "@angular/core";
import { Task, TaskResponse } from "../../shared/models/task.models";
import { BehaviorSubject, Observable, Subject, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";


@Injectable({providedIn: "root"})
export class TaskService {
    private initialTasks: TaskResponse[] = [
        { id: "TEST", title: "title", description: "description", createdAt: "25/05/2005" }
    ];
    private tasksSubject = new BehaviorSubject<TaskResponse[]>(this.initialTasks);
    tasks$: Observable<TaskResponse[]> = this.tasksSubject.asObservable();
    

    constructor(private httpClient: HttpClient){}

    getTasks(): Observable<TaskResponse[]> {
        return this.httpClient.get<{ [key: string]: Omit<TaskResponse, 'id'> }>
        ("https://inova-logic-default-rtdb.firebaseio.com/tasks.json").pipe(
            map(response => {
                if(!response){
                    return [];
                }
                return Object.keys(response).map(id => ({
                    id,
                    ...response[id]
                })) as TaskResponse[];
            })
        );
    }

    addTask(task: Task): Observable<{name: string}> {
        return this.httpClient.post<{name: string}>(
            "https://inova-logic-default-rtdb.firebaseio.com/tasks.json", 
            task
        );
    }
    
    deleteTask(name: string) : Observable<{name: string}> {
        return this.httpClient.delete<{name:string}>(
            `https://inova-logic-default-rtdb.firebaseio.com/tasks/${name}.json`
        )
    }
}