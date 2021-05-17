import "reflect-metadata";
import { createConnection } from "typeorm";
import { Merchant } from "../entity/Merchant";
const { merchants } = require("../mockMerchantData")


createConnection().then(async connection => {

    await connection
        .createQueryBuilder()
        .insert()
        .into(Merchant)
        .values(merchants)
        .execute();

}).catch(error => console.log(error));
