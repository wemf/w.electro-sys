import * as customers from '../controllers/customer.controller.js'
import express from 'express';

export default (app) => {
    let router = express.Router();

    //router.post("/", customers.create);
    router.post("/", customers.createWithContact);

    router.get("/", customers.findAll);
    router.get("/:company", customers.find);
    router.get("/search/:type", customers.searchCompany);

    router.delete("/:company", customers._delete);

    app.use("/api/customers", router);
}