import { FC, RefObject } from 'react';

export interface JumpToStartButtonProps {
  className?: string;
  containerRef: RefObject<HTMLElement>;
}

const JumpToStartButton: FC<JumpToStartButtonProps> = (props) => {
  return (
    <button
      className={`${props.className} text-sm underline underline-offset-4 text-accent hover:text-accent-dark`}
      onClick={() => {
        props.containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      Jump to start
    </button>
  );
};

export default JumpToStartButton;
