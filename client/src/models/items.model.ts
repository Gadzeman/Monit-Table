export type StatusType = 'warning' | 'success' | 'failed';

export type ScheduleType =
  | 'last_schedule'
  | 'expected_schedule'
  | 'previous_schedule';

export interface Items {
  job_name: string;
  logging_group: string;
  duration_millis: string;
  last_schedule: string;
  expected_schedule: string;
  previous_schedule: string;
}
