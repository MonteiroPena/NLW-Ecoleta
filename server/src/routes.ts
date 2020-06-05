import express from "express";
import { celebrate, Joi } from "celebrate";

import multer from "multer";
import multerConfig from "./config/multer";

import PointsController from "./controllers/PointsController";
import ItemsComtroller from "./controllers/ItemsController";

// index(listar varios), show(listar unico), create, update, delete

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsComtroller = new ItemsComtroller();

//listagem de items
routes.get("/items", itemsComtroller.index);
//listagem de pontos de coleta
routes.get("/points", pointsController.index);
//listagem de pontos de coleta especifico(ID)
routes.get("/points/:id", pointsController.show);
// criação de um novo ponto de coleta
routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);

export default routes;
