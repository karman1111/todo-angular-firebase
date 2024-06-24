import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "../../shared/models/task.models";

export const tasksState = createFeatureSelector<TaskState>('tasks');

export const selectTasks = createSelector(
    tasksState,
    (taskState: TaskState) => taskState.tasks
)

export const selectTasksError = createSelector(
    tasksState,
    (tasksState: TaskState) => tasksState.error
)