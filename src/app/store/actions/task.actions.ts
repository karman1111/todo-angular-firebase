import { createAction, props } from "@ngrx/store";
import { Task, TaskResponse } from "../../shared/models/task.models";


export const addTask = createAction(
    '[Task] Add',
    props<{task: Task}>()
) 
export const deleteTask = createAction(
    '[Task] Delete',
    props<{name: string}>()
)
export const getTasks = createAction(
    '[Task] Get',
)
export const getTasksSuccess = createAction(
    '[Task] Get success',
    props<{tasks: TaskResponse[]}>()
)
export const taskFailure = createAction(
    '[Task] Failure',
    props<{error: any}>()
)