export interface LogoutSuccessResponse {
  ok: string;
  message: string;
}

export interface LogoutErrorResponse {
  ok: string;
  message: string;
  code_error: number;
}

export type LogoutResponse = LogoutSuccessResponse | LogoutErrorResponse;
