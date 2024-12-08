export interface RequestBody {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  birthdate: Date;
  dni: string;
  phone: string;
  license_movil: string;
  license_pro: string;
  remiserie_id: string;
  latitude: number;
  longitude: number;
  password: string;
  profile_img: string;
  state: boolean;
  cars: string[]; // Supongo que cars es un array de strings
}
