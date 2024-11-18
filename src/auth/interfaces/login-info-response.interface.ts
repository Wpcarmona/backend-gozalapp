interface NumeroDeCelular {
  ccode: string | null;
  number: string;
}

interface User {
  email: string;
  points: number;
  total_points: number;
  coins: any[];
  total_coins: any[];
  state: string;
  bad_email: boolean;
  email_verified: boolean;
  cellphone_verified: boolean;
  unconfirmed_email: boolean;
  unconfirmed_cellphone: boolean;
  nombre_completo: string;
  numero_de_celular: NumeroDeCelular;
  tipo_de_documento: string;
  numero_de_documento: string;
}

export interface LoginUserResponse {
  ok: string;
  token: string;
  User: User;
  message: string;
}
