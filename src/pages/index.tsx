import { api } from "@/utils/api";
import { TextArea } from "@/components/TextArea/TextArea";
import { Button } from "@/components/Button/Button";
import { useState } from "react";
import { Comment } from "@/components/Comment/Comment";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Home() {
  const [text, setText] = useState("");
  const utils = api.useUtils();
  const [animate] = useAutoAnimate();

  const { mutate: createComment } = api.comment.create.useMutation({
    onSuccess: async () => {
      await utils.comment.get.invalidate();
      setText("");
    },
  });

  const { data: comments } = api.comment.get.useQuery();

  const handleCommentClick = () => {
    if (!text.trim()) return;
    createComment({ text });
  };

  return (
    <div className="container flex flex-col gap-10 mt-20" ref={animate}>
      <div className="flex flex-col gap-5">
        {comments
          ?.filter((comment) => comment.parentId === null)
          ?.map((comment) => (
            <div key={comment.id}>
              <Comment comment={comment} comments={comments} />
            </div>
          ))}
      </div>
      <div>
        <TextArea value={text} onChange={(e) => setText(e.target.value)} />
        <Button onClick={handleCommentClick}>Comment</Button>
      </div>
    </div>
  );
}
