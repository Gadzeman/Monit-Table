export type StatusType = 'warning' | 'created' | 'failed'

export type ScheduleType = 'last_schedule' | 'expected_schedule'

export interface Items {
    job_name: string,
    last_schedule: string,
    expected_schedule: string,
    duration_millis: string,
    logging_group: string
}