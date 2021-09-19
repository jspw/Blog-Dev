import Comment from "./Comment";

export default function Comments({ comments, onDeleteComment }) {
  return (
    comments &&
    comments.map((comment) => (
      <Comment
        key={comment.id}
        id={comment.id}
        username={comment.user.username}
        image={comment.user.image}
        content={comment.content}
        createdAt={comment.createdAt}
        onDeleteComment={onDeleteComment}
      />
    ))
  );
}
