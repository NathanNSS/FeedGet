import nodemailer from 'nodemailer'

interface ISendMailDefault {
    type: string,
    comment: string,
    screenshot?: string
}

interface ISendMailBlank {
    msg: string,
    to: string,
}

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "36cf524a29ed05",
        pass: "ff8c4151b46f2f"
    }
});

/**
 * Template E-mail Default.
 *
 * Examples:
 *
 *     `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
           screenshot ? `<P > <img src="${screenshot}" alt="${type}" width="75%" /> </P>` : null,
        `</div>`
 */
export async function sendMailDefault({ type, comment, screenshot }: ISendMailDefault): Promise<void> {
    await transport.sendMail({
        from: 'suport@feedget.com',
        to: 'nathannss14@gmail.com',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            screenshot ? `<P style=" display: flex; justify-content: center;"> <img src="${screenshot}" alt="${type}" width="75%" /> </P>` : null,
            `</div>`
        ].join('\n')
    })
}

export async function sendMailBlank({ msg, to }: ISendMailBlank): Promise<void> {
    await transport.sendMail({
        from: 'suport@casaverde.com',
        to: to,
        subject: 'Boas-vindas à Casa Verde',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>${msg}</p>`,
            `</div>`
        ].join('\n')
    })
}