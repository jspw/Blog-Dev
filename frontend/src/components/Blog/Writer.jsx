export default function Writer({
  firstName,
  lastName,
  bio,
  address,
  joinAt,
  username,
  image,
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
              src={image}
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
