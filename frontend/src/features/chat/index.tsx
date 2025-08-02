import cx from 'classnames';
import { useAppSelector } from '@/shared/store';
import type { FC, HTMLAttributes } from 'react';

import { ChatMessage } from './ui';

export const Chat: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const chatStore = useAppSelector(state => state.chat);

  return (
    <div className={cx('grow space-y-4 overflow-y-auto custom-scrollbar break-words', className)}>
      {chatStore.messages.map(msg => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
    </div>
  );
};
