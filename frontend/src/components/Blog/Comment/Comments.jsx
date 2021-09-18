import Comment from "./Comment";

export default function Comments({ comments }) {
  return comments.map((comment) => (
    <Comment
      key={comment.id}
      username={comment.user.username}
      content={comment.content}
      createdAt={comment.createdAt}
    />
  ));
}
