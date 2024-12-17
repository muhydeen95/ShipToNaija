export interface ApiResponse<T> {
  data: T;
  error: boolean;
  message: string;
  date: string;
  location?: string;
}

export interface GenericResponse {
  succeeded: boolean;
  entity: any;
  error: string;
  message: string;
  messages: string[];
}
