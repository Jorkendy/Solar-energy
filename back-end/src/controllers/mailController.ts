import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'phamtrungvinh263@gmail.com',
        pass: '0918718599',
    },
});

export class MailController {
    async sendMail() {
        const mailOptions = {
            to: "41204560@hcmut.edu.vn",
            from: 'phamtrungvinh263@gmail.com',
            subject: "Contact Form",
            text: 'This is auto email',
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('message: success');
        });
    }
}
