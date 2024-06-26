"use server"

import nodemailer from 'nodemailer'

const sendEmail = async (to, subject, text, html, attachments) => {
    const transporter = nodemailer.createTransport({
        //service: 'gmail',
        host: process.env.HOST_SMTP,
        port: process.env.PORT_SMTP,
        secure: false,
        //secure: true,
        // auth: {
        //     user: process.env.USER_SMTP,
        //     pass: process.env.PASSWORD_SMTP,
        // },
    })

    attachments.push({
        filename: 'logo_judo.png',
        path: './src/assets/logo_judo.png',
        cid: 'logo_judo'
    })

    const mailOptions = {
        from: `"Cercle du Judo Vesoul" <${process.env.USER_SMTP}>`,
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