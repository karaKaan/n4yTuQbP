import {
  IconCheck,
  IconMessageCircle,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { TextArea } from "../TextArea/TextArea";
import { Button } from "../Button/Button";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { api } from "@/utils/api";

type CommentProps = {
  comment: {
    id: string;
    parentId: string | null;
    text: string;
  };
  comments: CommentProps["comment"][];
  className?: string;
};

export const Comment = ({ comment, comments, className }: CommentProps) => {
  const { id, text: commentText } = comment;
  const [showCommentField, setShowCommentField] = useState(false);
  const [deleteButtonSwitch, setDeleteButtonSwitch] = useState(false);
  const [text, setText] = useState("");
  const [parent] = useAutoAnimate();
  const utils = api.useUtils();

  const { mutate: deleteComment } = api.comment.delete.useMutation({
    onSuccess: async () => {
      await utils.comment.get.invalidate();
    },
  });
  const { mutate: createReply } = api.comment.createReply.useMutation({
    onSuccess: async () => {
      await utils.comment.get.invalidate();
      setShowCommentField(false);
      setText("");
    },
  });

  const onReply = () => {
    if (!text.trim()) return;
    createReply({ text, parentId: id });
  };
  const onDelete = () => {
    deleteComment({ id });
  };

  const replies = comments?.filter((c) => c.parentId === comment.id);

  return (
    <>
      <div
        className={`border-l border-l-neutral-600 pl-4 ${className}`}
        ref={parent}
      >
        <p>{commentText}</p>
        <div className="flex items-center">
          <button
            className="flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-neutral-800 active:bg-neutral-600"
            onClick={() => setShowCommentField(!showCommentField)}
          >
            <IconMessageCircle size={"1.1rem"} />
            Reply
          </button>
          <div ref={parent}>
            {!deleteButtonSwitch ? (
              <button
                className="flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-neutral-800 active:bg-neutral-600"
                onClick={() => setDeleteButtonSwitch(true)}
              >
                <IconTrash size={"1.1rem"} />
                Delete
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setDeleteButtonSwitch(false)}
                  className="rounded bg-neutral-700 p-0.5 transition hover:bg-neutral-600 active:bg-neutral-500"
                >
                  <IconX size={"1.1rem"} />
                </button>
                <button
                  onClick={onDelete}
                  className="rounded bg-green-700 p-0.5 transition hover:bg-green-600 active:bg-green-500"
                >
                  <IconCheck size={"1.1rem"} />
                </button>
              </div>
            )}
          </div>
        </div>
        {showCommentField && (
          <div>
            <TextArea value={text} onChange={(e) => setText(e.target.value)} />
            <div className="flex justify-end gap-5">
              <Button onClick={() => setShowCommentField(false)} type="neutral">
                Cancel
              </Button>
              <Button onClick={onReply}>Comment</Button>
            </div>
          </div>
        )}
        {replies && replies?.length > 0 && (
          <div className="ml-5 mt-3">
            {replies.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                className="ml-5"
                comments={comments}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
