import { MailtrapClient } from 'mailtrap'
import { env } from '../schemas/env'

export const sendEmail = async (to: string, subject: string, body: string) => {
  // criar um cliente de Mailtrap
  const mailtrap = new MailtrapClient({
    token: env.MAILTRAP_TOKEN,
    testInboxId: 3312041, // ID da caixa de entrada para testes
  })

  // configurar o remetente do email
  const sender = {
    name: 'Sistema',
    email: 'sistema@sistema.com',
  }

  try {
    // enviar o email
    await mailtrap.testing.send({
      from: sender,
      subject: subject,
      to: [{ email: to }],
      text: body,
    })
    // retornar true se o envio for bem-sucedido
    return true
  } catch (err) {
    console.error(err)
    // retornar false se o envio falhar
    return false
  }
}
