export default function Writer({
  firstName,
  lastName,
  bio,
  address,
  joinAt,
  username,
}) {
  return (
    <div className="col-span-1 bg-white p-4 shadow-md rounded ">
      <div className="h-4 bg-black"></div>
      <div className="flex flex-col justify-center space-y-2">
        <div className="flex">
          <div>
            <img
              height="30px"
              width="30px"
              className="rounded-full m-2"
              src="https://scontent.fdac10-1.fna.fbcdn.net/v/t1.6435-1/p160x160/52681081_959948207528841_7080454252623036416_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeHROnsNyaNfuvFQS2VfkaTIFYgmNFaSeGAViCY0VpJ4YAExU6e2ioS2wMYri4h5X0q16wP-07DYnqVq_R436X3f&_nc_ohc=At53HlxhL7kAX_fbwq9&_nc_ht=scontent.fdac10-1.fna&oh=88bc2d7a385c379c0ba7338f03739a04&oe=616C0678"
            />
          </div>
          <div className="m-2 font-medium text-lg">
            {firstName} {lastName}
          </div>
        </div>
        <button className="btn-dark rounded p-2 font-mono font-semibold text-gray-100 hover:text-white">
          Follow
        </button>
        <p>{bio}</p>
        <div>
          <p className="text-gray-500">LOCATION</p>
          <p className="">{address}</p>
        </div>
        <div>
          <p className="text-gray-500">JOINTED</p>
          <p className="">{joinAt}</p>
        </div>
      </div>
    </div>
  );
}
