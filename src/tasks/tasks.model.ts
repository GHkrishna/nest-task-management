export interface Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus {
    ACTIVE = 'ACTIVE',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
}