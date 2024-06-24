import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as TaskActions from "../actions/task.actions"
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { TaskService } from "../../core/services/task.service";
import { Store } from "@ngrx/store";
import * as GlobalAction from '../actions/global.actions' 

@Injectable({providedIn: "root"})
export class TaskEffects {
    constructor(
        private actions$: Actions,
        private taskService: TaskService,
        private store: Store
    ){}

    addTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.addTask),
        tap(() => this.store.dispatch(GlobalAction.setLoading({loading: true}))),
        mergeMap((action) => {
            return this.taskService.addTask(action.task).pipe(
                map(() => {
                    GlobalAction.setLoading({ loading: false })
                    return TaskActions.getTasks();
                }),
                catchError(error => {
                    return of(
                        GlobalAction.setLoading({ loading: false }),
                        TaskActions.taskFailure({ error })
                    )
                })
            )
        })
    ));

    getTasks$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.getTasks),
        tap(() => {return this.store.dispatch(GlobalAction.setLoading({loading: true}))}),
        mergeMap(() => {
            return this.taskService.getTasks().pipe(
                map(tasks => {
                    this.store.dispatch(GlobalAction.setLoading({loading: false}))
                    return TaskActions.getTasksSuccess({tasks})
                }),
                catchError(error => {
                    this.store.dispatch(GlobalAction.setLoading({loading: false}))
                    return of(TaskActions.taskFailure({ error }))
                })
            )
        })
    ))

    deleteTask$ = createEffect(() => this.actions$.pipe(
        ofType(TaskActions.deleteTask),
        tap(() => this.store.dispatch(GlobalAction.setLoading({loading: true}))),
        mergeMap((action) => {
            return this.taskService.deleteTask(action.name).pipe(
                map(() => {
                    GlobalAction.setLoading({ loading: false })
                    return TaskActions.getTasks();
                }),
                catchError(error => {
                    this.store.dispatch(GlobalAction.setLoading({loading: false}))
                    return of(TaskActions.taskFailure({ error }))
                })
            )
        })
    ))
}