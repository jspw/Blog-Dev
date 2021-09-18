export default function Comment({ username, content, createdAt }) {
  return (
    <div className="flex ">
      <div>
        <img
          height="30px"
          width="30px"
          className="rounded-full m-2"
          src="https://scontent.fdac10-1.fna.fbcdn.net/v/t1.6435-1/p160x160/52681081_959948207528841_7080454252623036416_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeHROnsNyaNfuvFQS2VfkaTIFYgmNFaSeGAViCY0VpJ4YAExU6e2ioS2wMYri4h5X0q16wP-07DYnqVq_R436X3f&_nc_ohc=At53HlxhL7kAX_fbwq9&_nc_ht=scontent.fdac10-1.fna&oh=88bc2d7a385c379c0ba7338f03739a04&oe=616C0678"
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
