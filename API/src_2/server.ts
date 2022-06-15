import express from 'express';
import cors from 'cors';

//Rotas 
import Routefeedback from './routes/feedback.routes';
import CasaVerde from './routes/casaverde.routes';

const app = express();
app.use(cors());

app.use(express.json());

let port = 3333;

app.use('/', Routefeedback);
app.use('/', CasaVerde);
//app.use('/', require('./routes/feedback.routes'));

app.listen(port, () => {
    let cData = new Date()
    let data = `${cData.getDate()}/${cData.getMonth() + 1}/${cData.getFullYear()} ${cData.getHours()}:${cData.getMinutes()}:${cData.getSeconds()}`;
    console.log(`${data} Servidor rodando na porta ${port} :)`)
})