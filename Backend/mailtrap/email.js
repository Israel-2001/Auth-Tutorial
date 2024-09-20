import { mailtrapClient, sender } from "./mailtrap.config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js'

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{email}];

  try {
    const response = await mailtrapClient.send ({
      from:sender,
      to:recipient,
      subject:"Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "Email Verification"
    })

    console.log("Email sent successfully", response);
  } catch (err) {
    console.error('Error sending verification email', err);
    throw new Error(`Error sending verification email: ${err}`)
  }
}

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    
    await mailtrapClient.send({
      from:sender,
      to:recipient,
      template_uuid:"6f1f2aa7-b3d0-4660-b547-4e4ce955017b",
      template_variables:{
        "name": name,
        "company_info_name": "Auth Tutorial",
        "company_info_address": "18,jagunmolu street ogun state",
        "company_info_city": "Ota",
        "company_info_zip_code": "300271",
        "company_info_country": "Nigeria"
      },
    })
  } catch (error) {

    console.error('Error Sending welcome Email', error);
    throw new Error(`Error Sending welcome Email: ${error}`);
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    })
  } catch (err) {

    console.error('Error Sending Password Reset Email', err);
    throw new Error(`Error Sending Password Reset Email: ${err}`)
  }
}

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    
    const response = await mailtrapClient.send({
      from:sender,
      to:recipient,
      subject: "Password Reset successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    })

		console.log("Password reset email sent successfully", response);

  } catch (err) {
    
    console.error('Error Resetting Password', err);
    throw new Error(`Error Resetting Password: ${err}`);
  }
}