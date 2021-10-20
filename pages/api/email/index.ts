import { NextApiRequest, NextApiResponse } from 'next'
import client from '@sendgrid/mail'


const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
   const { email, name, message } = req.body
   const apiKey = process.env.NEXT_PUBLIC_SENDGRID_API_KEY
   client.setApiKey(apiKey)
   const msg = {
      to: 'providencebooksales@outlook.com',
      from: 'providencebookspress@gmail.com',
      replyTo: email,
      subject: 'You got a new contact message',
      text: message,
      html: userContactTemplate(email, name, message)
   }
   try {
      await client.send(msg)
      res.status(200).json({ message: 'Email sent successfuly' })
   }
   catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
   }
}

const userContactTemplate = (userEmail: string, userName: string, message: string) => `
<!DOCTYPE html>
<html>
   <head>
      <style>
         body {
            min-width: 300px;
            height: 600px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
         }
         #container {
            min-width: 270px;
            min-height: 300px;
            max-width: 650px;
         }
         #header {
            background-color: #D7B263;
            color: white;
            padding: 10px 15px;
            font-size: 15pt;
            font-weight: bold;
         }
         #message {
            padding: 10px 15px;
            margin-top: 10px;
            border-left: 4px solid #CCCBCB;
            color: #686867;
         }
         #message > div:first-child {
            font-style: italic;
            font-size: 11pt;
            margin-bottom: 15px;
         }
         small {
            display: flex;
            margin-top: 30px;
         }
      </style>
   </head>
   <body>
      <div id="container">
         <div id="header">
            Hi admin, you got a new contact message from ${userName}
         </div>
         <div id="message">
            <div>message:</div>
            ${message.split('\n').map(pgraph => `<p>${pgraph}</p>`).join('')}
         </div>
         <small>Click "Reply" to send a message to ${userName} - &nbsp;${userEmail}</small>
      </div>
   </body>
</html>
`

export default sendEmail