export default function Dashboard({
  followers,
  totalReacts,
  views,
  blogs,
  totalComments,
}) {
  console.log(totalReacts, totalComments);
  return (
    <div className="pb-2">
      <div className="text-left font-bold text-2xl pb-2">Dashboard</div>
      <div className="flex flex-row justify-content-between">
        <div className="flex flex-col align-items-center p-2  rounded border space-y-2 shadow-sm">
          <p className="font-sans font-medium">{blogs}</p>
          <p className="text-gray-500">Total Blogs</p>
        </div>

        <div className="flex flex-col align-items-center p-2  rounded border space-y-2 shadow-sm">
          <p className="font-sans font-medium">{totalReacts}</p>
          <p className="text-gray-500">Total Reacts</p>
        </div>

        <div className="flex flex-col align-items-center p-2  rounded border space-y-2 shadow-sm">
          <p className="font-sans font-medium">{totalComments}</p>
          <p className="text-gray-500">Total Comments</p>
        </div>

        <div className="flex flex-col align-items-center p-2  rounded border space-y-2 shadow-sm">
          <p className="font-sans font-medium">1000</p>
          <p className="text-gray-500">Total Post View</p>
        </div>

        <div className="flex flex-col align-items-center p-2  rounded border space-y-2 shadow-sm">
          <p className="font-sans font-medium">{followers}</p>
          <p className="text-gray-500">Total Followers</p>
        </div>
      </div>
    </div>
  );
}
