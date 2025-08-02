import cx from 'classnames';
import { ChatMessageRole } from '@/entities/chat-store';

import type { FC } from 'react';
import type { ChatMessage as ChatMessageType } from '@/entities/chat-store';

type ChatMessageProps = {
  message: ChatMessageType;
};

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={cx(message.role === ChatMessageRole.User && 'flex justify-end')}>
      <p className="p-2 rounded-2xl bg-teal-800 text-white max-w-5/6">
        {message.role === ChatMessageRole.Assistant && (
          <span className="block font-bold text-teal-400 text-sm">{message.userName}</span>
        )}
        {message.text}
      </p>
    </div>
  );
};
