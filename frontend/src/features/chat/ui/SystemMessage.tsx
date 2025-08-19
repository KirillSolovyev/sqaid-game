import type { FC } from 'react';
import type { ChatMessage } from '@/entities/chat-store';

type SystemMessageProps = {
  message: ChatMessage;
};

export const SystemMessage: FC<SystemMessageProps> = ({ message }) => {
  return <p className="text-center p-4 text-white text-lg">{message.text}</p>;
};
