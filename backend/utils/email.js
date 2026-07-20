const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Hulet Fish <${process.env.EMAIL_FROM ||
      'noreply@easternsidama.com'}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html)
    };

    // 3) Create a transport and send email
    try {
      await this.newTransport().sendMail(mailOptions);
      console.log('✅ Email sent to:', this.to);
    } catch (err) {
      console.log('❌ Email failed:', err.message);
      console.log('🔗 Verification link:', this.url);
    }
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Hulet Fish Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendEmailVerification() {
    await this.send('emailVerification', 'Please verify your email address');
  }

  async sendHostApproval() {
    await this.send(
      'hostApproval',
      'Congratulations! Your Host Application is Approved'
    );
  }
};
