const Functions = require('firebase-functions')
const Admin = require('firebase-admin')
const SendGrid = require('@sendgrid/mail')

Admin.initializeApp(Functions.config().firebase)

SendGrid.setApiKey(Functions.config().sendgrid.key)

exports.sendMessage = Functions.https.onCall((data, context) => {
  const name = context.auth.token.name || null;
  const email = context.auth.token.email || null;
  const {details: message, subject, phone, address} = data
  const emailConfig = {
    to: 'sosa.glean.tn@gmail.com',
    from: 'sosa.glean.tn@gmail.com',
    subject,
    templateId: 'd-b1f6d9ac6715453d9c7ba5b3edfbe6a2',
    dynamic_template_data: {
      name,
      message, 
      phone,
      address,
      email,
    }
  }
  SendGrid.send(emailConfig)
})
