import { type ChangeEvent } from "react";

type TextAreaProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextArea = ({ value, onChange }: TextAreaProps) => {
  return (
    <textarea
      placeholder="Add a comment."
      value={value}
      onChange={onChange}
      className="w-full rounded border border-neutral-500 bg-neutral-black p-3 focus:border-neutral-300"
    />
  );
};
