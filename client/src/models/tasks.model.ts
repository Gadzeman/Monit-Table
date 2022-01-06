export type TStatus = 'creating' | 'created' | 'failed'

export interface ITask {
    _id: string,
    name: string,
    status: TStatus,
    last_check: string,
    last_download: string,
    expected_refresh_date: string
}