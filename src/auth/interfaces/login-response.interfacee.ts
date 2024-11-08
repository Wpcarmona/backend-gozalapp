export interface LoginSuccessResponse {
  ok: true;
  token: string;
  message: string;
}

export interface LoginErrorResponse {
  ok: false;
  message: string;
  code_error?: number;
}

export type LoginResponse = LoginSuccessResponse | LoginErrorResponse;
