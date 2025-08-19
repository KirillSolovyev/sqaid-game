import cx from 'classnames';
import { useAppSelector } from '@/shared/store';
import { ChatMessageRole } from '@/entities/chat-store';
import type { FC, HTMLAttributes } from 'react';

import { ChatMessage, SystemMessage } from './ui';

export const Chat: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const chatStore = useAppSelector(state => state.chat);

  return (
    <div className={cx('grow space-y-4 overflow-y-auto custom-scrollbar break-words', className)}>
      {chatStore.messages.map(msg => {
        if (msg.role === ChatMessageRole.System) {
          return <SystemMessage key={msg.id} message={msg} />;
        }

        return <ChatMessage key={msg.id} message={msg} />;
      })}
    </div>
  );
};
