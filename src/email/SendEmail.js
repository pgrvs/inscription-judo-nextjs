"use server"

import nodemailer from 'nodemailer'

const sendEmail = async (to, subject, text, html, attachments) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST_SMTP,
        port: 1025,
        secure: false,
        //secure: true,
        // auth: {
        //     user: process.env.USER_SMTP,
        //     pass: process.env.PASSWORD_SMTP,
        // },
    })

    attachments.push({
        filename: 'logo_judo.svg',
        path: './src/assets/logo_judo.svg',
        cid: 'logo_judo'
    })

    const mailOptions = {
        from: 'judo@email.com',
        to : to,
        subject : subject,
        text : text,
        html : html,
        attachments: attachments
    }

    try {
        let info = await transporter.sendMail(mailOptions)
        console.log('E-mail envoyé:', info.response)
        return { success: true, response: info.response }
    } catch (error) {
        console.error("Erreur lors de l'envoi du email:", error)
        return { success: false, error: error.toString() }
    }
}

export default sendEmail