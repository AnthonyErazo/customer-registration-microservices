import amqplib, { Channel } from 'amqplib';
import { QUEUE_CONFIG } from '../config';
import { EmailMessage } from '../types/interfaces';

let channel: Channel | null = null;

/**
 * Sets up RabbitMQ channel and queue
 * @throws Error if connection fails
 */
export async function setupQueue(): Promise<void> {
  const conn = await amqplib.connect(QUEUE_CONFIG.RABBIT_URL);
  channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_CONFIG.EMAIL_QUEUE, { durable: true });
}

/**
 * Enqueues a welcome email message
 * @param email - Recipient email
 * @param name - Recipient name
 * @param clientId - Client ID
 * @returns True if message was enqueued successfully
 */
export async function enqueueWelcomeEmail(
  email: string,
  name: string,
  clientId: number
): Promise<boolean> {
  if (!channel) {
    return false;
  }

  const message: EmailMessage = {
    to: email,
    subject: '¡Bienvenido!',
    body: `Hola ${name}, gracias por registrarte.`,
    clientId
  };

  try {
    const sent = await channel.sendToQueue(
      QUEUE_CONFIG.EMAIL_QUEUE,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    return !!sent;
  } catch (error) {
    return false;
  }
}

/**
 * Closes the RabbitMQ channel
 * @returns Promise<void>
 * @throws Error if close fails
 */
export async function closeQueue(): Promise<void> {
  if (channel) {
    await channel.close();
    channel = null;
  }
}
