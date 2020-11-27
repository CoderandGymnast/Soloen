import "reflect-metadata";
import {createConnection} from "typeorm";
import {Photo} from "./entities/Photo";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    entities: [
        Photo
    ],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log("Connected")

}).catch(error => console.log(error));