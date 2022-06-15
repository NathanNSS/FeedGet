import express from 'express'
import { sendMailBlank } from '../mail/config'

const router = express.Router();

const ofertas = [
    {
        "name": "Ajuga Reptans",
        "preco": 20,
        "img": "produto-01",
        "ordem": 0,
        "estoque": 10
    },
    {
        "name": "Cordyline fruticosa",
        "preco": 35,
        "img": "produto-02",
        "ordem": 3,
        "estoque": 13
    },
    {
        "name": "Dracaena trifasciata",
        "preco": 26.75,
        "img": "produto-07",
        "ordem": 6,
        "estoque": 0  
    },
    {
        "name": "Crassula ovata",
        "preco": 23.2,
        "img": "produto-03",
        "ordem": 2,
        "estoque": 15
    },
    {
        "name": "Cyperus rotundus",
        "preco": 21.5,
        "img": "produto-04",
        "ordem": 1,
        "estoque": 7
    },
    {
        "name": "Delairea odorata",
        "preco": 30,
        "img": "produto-05",
        "ordem": 5,
        "estoque": 5
    },
    {
        "name": "Datura metel",
        "preco": 19.75,
        "img": "produto-06",
        "ordem": 4,
        "estoque": 9
    }
]
/**
 * Obs API utilizada para retorna dados para o projeto CasaVerde
 */

router.post('/sendEmail', async (req, res) => {
    const { msg, to } = req.body;
    let token64 = req.headers.authorization?.split(' ')[1]
    let token = token64 && Buffer.from(token64!, 'base64').toString('utf8')

    if (token === 'casaverde') {

        try {
            await sendMailBlank({ msg, to })
            res.status(200).end(`E-mail enviado com sucesso, para ${to}`)
        }
        catch (err) {
            console.log(err)
            res.status(400).end()
        }
    } else {
        res.status(401).end()
    }
})

var cont = 0 
router.get("/ofertas", async (req, res) => {
    let cData = new Date()
    let hora = `${cData.getHours()}:${cData.getMinutes()}:${cData.getSeconds()}`
    //console.log(`200 Ok ${hora}`)
    res.status(200).json(ofertas)
})
//module.exports = router; 
export default router;