export interface RegisterResponse {
  ok: boolean;
  message: string;
  errors?: {
    [key: string]: string;
  };
  code_error?: number;
}
