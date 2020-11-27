import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";
import { Photo } from "./entities/Photo";

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
    const repo = getRepository(Photo)
    console.log(repo)

}).catch(error => console.log(error));