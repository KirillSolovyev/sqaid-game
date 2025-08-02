import cx from 'classnames';
import { useRef } from 'react';
import type { FC, HTMLAttributes } from 'react';

type ChatBoxProps = {
  onSubmit: (prompt: string) => void;
};

type HTMLFormWithoutSubmit = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'>;

export const ChatBox: FC<HTMLFormWithoutSubmit & ChatBoxProps> = ({ onSubmit, ...props }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const rawPrompt = formData.get('prompt')?.toString();
    const trimmedPrompt = rawPrompt?.trim();

    if (trimmedPrompt) {
      onSubmit(trimmedPrompt);
      if (textAreaRef.current) {
        textAreaRef.current.value = '';
        textAreaRef.current.focus();
      }
    }
  };

  return (
    <form
      {...props}
      className={cx(props.className, 'flex space-x-4 items-center')}
      onSubmit={onFormSubmit}>
      <textarea
        ref={textAreaRef}
        name="prompt"
        rows={1}
        className="custom-scrollbar grow resize-none outline-none p-4 text-white rounded-2xl bg-teal-800"
        placeholder="Start the game..."
      />
      <button
        type="submit"
        className="rounded-full p-2 bg-pink-400 text-white shrink-0 cursor-pointer">
        { /* prettier-ignore */ }
        <svg className="rotate-90" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 16V6.414L5.707 9.707a1 1 0 1 1-1.414-1.414l5-5 .076-.068a1 1 0 0 1 1.338.068l5 5 .068.076a1 1 0 0 1-1.406 1.406l-.076-.068L11 6.414V16a1 1 0 1 1-2 0"/></svg>
      </button>
    </form>
  );
};
