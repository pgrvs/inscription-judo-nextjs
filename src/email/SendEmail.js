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

    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erreur lors de l'envoi du email:", error)
        }
        console.log('E-mail envoyé:', info.response)
    })
}

export {sendEmail}