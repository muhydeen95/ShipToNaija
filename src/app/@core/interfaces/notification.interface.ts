export interface Notification {
  // isSuccess?: boolean; //TODO This has been replaced by state prop. Remove soon
  state?: 'success' | 'warning' | 'error';
  title?: string;
  message: string;
}
