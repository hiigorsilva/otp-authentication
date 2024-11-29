import { MailtrapClient } from 'mailtrap'

export const sendEmail = async (to: string, subject: string, body: string) => {
  if (!process.env.MAILTRAP_TOKEN) {
    throw new Error('MAILTRAP_TOKEN not found')
  }
  const mailtrap = new MailtrapClient({
    token: process.env.MAILTRAP_TOKEN,
    testInboxId: 3312041,
  })

  const sender = {
    name: 'Sistema',
    email: 'sistema@sistema.com',
  }

  try {
    await mailtrap.testing.send({
      from: sender,
      subject: subject,
      to: [{ email: to }],
      text: body,
    })
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
