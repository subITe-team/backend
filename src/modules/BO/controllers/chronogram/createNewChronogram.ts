import { Request, Response } from "express";
import Chronogram from "../../../../models/Chronogram.model";
import response from "../../../../utils/response";
import { RequestBody } from "./type";
import ClientError from "../../../../utils/errors/error";

export default async (req: Request, res: Response): Promise<void> => {
  const { driver_id, shift, date, remiserie_id } = req.body as RequestBody;
  
   const new_chrono = await Chronogram.create({ 
        driver_id,
        date,
        remiserie_id,
        shift,
      });

      if (new_chrono)
        response(res, 201, "El cronograma se ha creado exitosamente.");
        else 
        throw new ClientError("Ocurrio un error", 500)
      

  };

//   import { Request, Response } from "express";
// import Chronogram from "../../../../models/Chronogram.model";
// import response from "../../../../utils/response";
// import { RequestBody } from "./type";

// export default async (req: Request, res: Response): Promise<void> => {

// try {
//   const chronoArray = req.body as Array<RequestBody>;

//   const creationPromises = [];

//   for (const chrono of chronoArray) {
//     const { driver_id, shift, date, remiserie_id } = chrono;
  
//    creationPromises.push(Chronogram.create(
//     { 
//        driver_id,
//        shift,
//        date,
//        remiserie_id
//       }))
//     }

//     await Promise.all(creationPromises);

//     response(res, 201, "El cronograma se ha creado exitosamente.");
//   } catch (error) {
//     response(res, 500, "Error interno del servidor al crear los cronogramas");
//   }
// };