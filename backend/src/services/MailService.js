import nodemailer from 'nodemailer';
import { sellerDAO } from '../database/operations/SellerDAO.js';

export const MailService = {
async sendEmails() {
  try {

    const emailConfig = {
      service: 'Gmail',
      auth: {
        user: 'bazarifyteam@gmail.com',
        pass: 'ABC1234!?',
      },
    };
  
  const emailsToSend = await sellerDAO.getSellerMails();
  console.log(emailsToSend);

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport(emailConfig);

    // Loop through the array of emails and send the email to each one
    for (const email of emailsToSend) {
      const mailOptions = {
        from: 'bazarifyteam@gmail.com', // Sender address
        to: email, // List of recipients
        subject: 'Bazar ist zuende!', // Subject line
        text: 'Der Bazar ist nun zuende und du kannst dein Geld und deine nicht verkauften Produkte an der Kasse abholen!', // Plain text body
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      console.log(`Email sent to ${email}`);
    }
  } catch (error) {
    console.error('Error sending emails:', error);
  }
}
}