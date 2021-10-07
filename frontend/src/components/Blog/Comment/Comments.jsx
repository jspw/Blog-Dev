import Comment from "./Comment";

export default function Comments({
  comments,
  blogId,
  onDeleteComment,
  onEditComment,
}) {
  return (
    comments &&
    comments.map((comment) => (
      <Comment
        key={comment.id}
        id={comment.id}
        userId={comment.user.id}
        username={comment.user.username}
        image={comment.user.image}
        content={comment.content}
        createdAt={comment.createdAt}
        onDeleteComment={onDeleteComment}
        onEditComment={onEditComment}
        blogId={blogId}
      />
    ))
  );
}
