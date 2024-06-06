"use client";
import { useEffect, useState } from "react";
import { getComments, insertComment } from "@/lib/data";
import { useSession } from "next-auth/react";
import CommentsLoading from "../loading/CommentsLoading";
import type { Comment } from "@/lib/type";

const ReviewList = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className="col-span-2">
      {comments.length === 0 ? (
        <div className="text-gray-700">Chưa có bình luận</div>
      ) : (
        <>
          <h2 className="text-xl font-medium text-gray-900">Đánh Giá</h2>
          <div className="mt-3 divide-y divide-gray-200 border-b border-t">
            {comments.map((review: Comment, index: number) => (
              <div key={index} className="flex gap-x-4 py-4">
                <div className="flex-none">
                  <div className="flex h-full flex-col justify-between">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">
                        {review.user.fullName}
                      </p>
                    </div>
                    <div
                      className="space-y-4 text-sm text-gray-500"
                      dangerouslySetInnerHTML={{ __html: review.content }}
                    />
                  </div>
                </div>
                <div className="whitespace-nowrap text-right text-sm text-gray-500">
                  {new Date(review.updated_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const WriteComment = ({
  productId,
  onNewComment,
}: {
  productId: string;
  onNewComment: (comment: Comment) => void;
}) => {
  const [content, setContent] = useState("");
  const { data: session } = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!session) {
      setError("You need to be logged in to comment");
      return;
    }

    const user_id = session.user.id;
    const token = session.accessToken;

    try {
      const newComment = await insertComment(
        token!,
        Number(productId),
        user_id,
        content,
      );

      setContent("");
      setError(null);
      onNewComment(newComment);
    } catch (err) {
      setError("Failed to post comment");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-3">
        <h2 className="text-xl font-medium text-gray-900">Đánh Giá</h2>
        <div className="col-span-full">
          <textarea
            id="content"
            name="content"
            rows={3}
            className="block w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-rose-600 sm:text-sm sm:leading-6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Viết bình luận tại đây.
          </p>
        </div>
      </div>
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleSubmit}
          type="submit"
          className="rounded-md bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
        >
          Đăng
        </button>
      </div>
    </form>
  );
};

export default function Comment({ productId }: { productId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const comments = await getComments("", productId.toString());
        setComments(comments);
      } catch (err) {
        setError("Failed to fetch comments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const handleNewComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (isLoading) {
    return (
      <div className="col-span-2">
        <CommentsLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-2">
        <div>Lỗi không thể kết nối!</div>
      </div>
    );
  }

  return (
    <section className="pb-5 pt-10">
      <div className="space-y-3">
        <div className="grid-cols-3 gap-x-4 md:grid">
          <ReviewList comments={comments} />
          <WriteComment
            productId={productId.toString()}
            onNewComment={handleNewComment}
          />
        </div>
      </div>
    </section>
  );
}
