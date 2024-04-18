import Remiserie from "../../models/Remiserie.model";
import User from "../../models/User.model";
import Driver from "../../models/Driver.model";
import Car from "../../models/Car.model";
import Passenger from "../../models/Passenger.model";

// interface User {
//   username: string;
//   email: string;
//   password: string;
//   profile_img: string;
// }

// interface Remiserie {
//   name: string;
//   email: string;
//   password: string;
//   name_remiserie: string;
//   phone: string;
//   profile_img: string;
// }

// interface Driver {
//   name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   address: string;
//   birthdate: string;
//   dni: number;
//   phone: string;
//   license_movil: string;
//   license_pro: string;
//   profile_img: string;
//   latitude: number;
//   longitude: number;
//   state: boolean;
// }

// interface Car {
//   brand: string;
//   model: string;
//   patent: string;
//   color: string;
//   year: number;
//   habilitation: boolean;
//   insurance: string;
//   date_onboarding: string;
// }

// interface Passenger {
//   name: string;
//   last_name: string;
//   address: string;
//   email: string;
//   birthdate: string;
//   password: string;
//   phone: string;
//   latitude: number;
//   longitude: number;
//   dni: number;
//   profile_img: string;
// }

export interface Data {
  usersAdmin: Partial<User>[];
  remiseries: Partial<Remiserie>[];
  drivers: Partial<Driver>[];
  cars: Partial<Car>[];
  passengers: Partial<Passenger>[];
}
