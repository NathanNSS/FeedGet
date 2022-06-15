import express from 'express'
import { sendMailDefault } from '../mail/config'
import { prisma } from '../prisma';

const router = express.Router();

router.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body

    const feedback = await prisma.feedback.create({
        data: {
            type: type,
            comment: comment,
            screenshot: screenshot
        }
    })

    await sendMailDefault({ type, comment, screenshot });

    return res.status(201).json({ data: feedback })
})

//module.exports = router; 
export default router;