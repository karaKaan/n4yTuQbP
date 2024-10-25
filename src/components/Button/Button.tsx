import { type ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: "primary" | "neutral";
};

export const Button = ({
  children,
  onClick,
  type = "primary",
}: ButtonProps) => {
  switch (type) {
    case "primary":
      return (
        <button
          onClick={onClick}
          className="rounded bg-blue-700 px-3 py-2 text-sm transition hover:bg-blue-600 active:bg-blue-500"
        >
          {children}
        </button>
      );
    case "neutral":
      return (
        <button
          onClick={onClick}
          className="rounded bg-neutral-800 px-3 py-2 text-sm transition hover:bg-neutral-700 active:bg-neutral-600"
        >
          {children}
        </button>
      );
  }
};
