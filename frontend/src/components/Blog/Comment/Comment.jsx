export default function Comment({ username, image, content, createdAt }) {
  return (
    <div className="flex ">
      <div>
        <img
          height="30px"
          width="30px"
          className="rounded-full m-2"
          src={`${image}`}
          alt="User Image"
        />
      </div>
      <div className="container rounded border-2 shadow flex flex-col space-y-2 p-2">
        <div className="flex flex-row">
          <p className="font-semibold">{username}</p>
          <p>{createdAt}</p>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
}
