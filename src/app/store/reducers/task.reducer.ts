import { createReducer, on } from "@ngrx/store";
import { TaskState } from "../../shared/models/task.models";
import * as TaskActions from "../actions/task.actions"

const initialTasks: TaskState = {
    tasks: [],
    error: null
}

export const taskReducer = createReducer(
    initialTasks,

    on(TaskActions.addTask, (state) => ({
        ...state,
    })),
    on(TaskActions.getTasks, (state) => ({
        ...state
    })),
    on(TaskActions.deleteTask, (state) => ({
        ...state,
    })),
    on(TaskActions.getTasksSuccess, (state, {tasks}) => ({
        ...state,
        tasks
    })),

    // errors
    on(TaskActions.taskFailure, (state, {error}) => ({
        ...state,
        error
    })),
)