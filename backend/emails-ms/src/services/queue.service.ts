import amqplib, { Channel, ConsumeMessage } from 'amqplib';
import { QUEUE_CONFIG } from '../config';
import { EmailMessage } from '../types/interfaces';
import { logEmailMessage } from './email.service';

let channel: Channel | null = null;

/**
 * Sets up RabbitMQ channel and queue consumer
 * @throws Error if connection fails
 */
export async function setupQueueConsumer(): Promise<void> {
  const conn = await amqplib.connect(QUEUE_CONFIG.RABBIT_URL);
  channel = await conn.createChannel();
  
  await channel.assertQueue(QUEUE_CONFIG.EMAIL_QUEUE, { durable: true });
  await channel.prefetch(QUEUE_CONFIG.PREFETCH_COUNT);
  
  await channel.consume(QUEUE_CONFIG.EMAIL_QUEUE, handleEmailMessage);
}

/**
 * Handles incoming email messages from RabbitMQ
 * @param message - RabbitMQ message
 */
async function handleEmailMessage(message: ConsumeMessage | null): Promise<void> {
  if (!message || !channel) return;

  try {
    const payload: EmailMessage = JSON.parse(message.content.toString());
    
    if (!payload.to || !payload.subject) {
      throw new Error('invalid_message_format');
    }

    await logEmailMessage(payload);

    channel.ack(message);
    
  } catch (error) {
    channel.nack(message, false, false);
  }
}

/**
 * Closes the RabbitMQ channel
 */
export async function closeQueueConsumer(): Promise<void> {
  if (channel) {
    await channel.close();
    channel = null;
  }
}
