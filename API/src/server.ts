import express from 'express';
import { routes } from './routes';
import cors from 'cors'


const app = express();

app.use(cors())

app.use(express.json());

let port = 3333;

app.use(routes);

app.listen(port, () => {
    let cData = new Date()
    let data = `${cData.getDate()}/${cData.getMonth() + 1}/${cData.getFullYear()} ${cData.getHours()}:${cData.getMinutes()}:${cData.getSeconds()}`;
    console.log(`${data} Servidor rodando na porta ${port} :)`)
})