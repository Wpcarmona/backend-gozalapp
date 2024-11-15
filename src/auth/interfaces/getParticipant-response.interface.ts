export interface GetParticipantResponse {
  ok: boolean;
  message?: string;
  code_error?: number;
  object?: {
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
    numero_de_celular: {
      ccode: string | null;
      number: string;
    };
    tipo_de_documento: string;
    numero_de_documento: string;
  };
}
