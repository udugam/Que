const nodemailer = require('nodemailer');
const router = require('express').Router();

let transport = {
    host: 'mail.eugenek.co',
    port: 26,
    secure: false, // upgrade later with STARTTLS
    tls: {
        rejectUnauthorized:false
    },
    auth: {
        user: 'test@eugenek.co',
        pass: 'NnFX}]?^g2s!'
    }
};

let transporter = nodemailer.createTransport(transport);
transporter.verify((error, success) => {
    if (error) {
        console.error('Mail server is down...');
        console.log(error);
    } else {
        console.log('Mail server is ready...');
    }
});

router.route("/sendemail")
    .post(function (req, res) {
        console.log('test', req.body);
        console.log('test', res);
        let mail = {
            from: 'admin@cueapp.com',
            to: req.body.toEmail,
            subject: req.body.subject,
            text: req.body.message,
            html: `<p>${req.body.message}</p>`
        };

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.json({
                    msg: 'fail'
                })
            } else {
                res.json({
                    msg: 'success'
                })
            }
        });
    });

module.exports = router;