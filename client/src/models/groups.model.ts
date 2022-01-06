import { ITask } from './tasks.model'

export interface IGroup {
    _id: string,
    name: string,
    tasks: ITask[]
}

