export interface Task {
    title: string,
    description: string,
    createdAt: string
}
export interface TaskResponse extends Task {
    id: string
}

export interface TaskState {
    tasks: TaskResponse[],
    error: null,
}