import cx from 'classnames';
import { memo, useCallback } from 'react';

import { Chat } from '@/features/chat';
import { ChatBox } from '@/features/chat-box';
import { addMessage, ChatMessageRole } from '@/entities/chat-store';
import { UserPlayerId } from '@/entities/game-store';
import { useAppDispatch, useAppSelector } from '@/shared/store';

const MemoizedChatBox = memo(ChatBox);

export const AppChat = () => {
  const chatMessages = useAppSelector(state => state.chat.messages);
  const dispatch = useAppDispatch();

  const hasMessages = chatMessages.length > 0;

  const onMessageSubmit = useCallback(
    (message: string) => {
      const newMessage = {
        id: Date.now().toString(),
        text: message,
        userName: `Player ${UserPlayerId}`,
        role: ChatMessageRole.User,
      };
      dispatch(addMessage(newMessage));
    },
    [dispatch],
  );

  return (
    <section
      className={cx(
        hasMessages && 'grow',
        'flex flex-col m-auto w-chat-content space-y-6 relative max-h-[calc(100vh-4rem)] overflow-hidden pb-20',
      )}>
      <h1 className="text-white text-4xl text-center uppercase">
        Sq<span className="text-pink-400">ai</span>d gam<span className="text-pink-400">e</span>
      </h1>
      {hasMessages && <Chat />}
      <MemoizedChatBox
        className="bottom-0 absolute transition duration-300 w-full"
        onSubmit={onMessageSubmit}
      />
    </section>
  );
};
