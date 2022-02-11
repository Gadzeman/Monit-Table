export interface Item {
  job_name: string;
  logging_group: string;
  duration_millis: number;
  last_schedule: number;
  expected_schedule: number;
  previous_schedule: number;
}
