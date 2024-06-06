import PropTypes from "prop-types";
import appWriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { FollowerPointerCard } from "./ui/following-pointer";

const TitleComponent = ({ title }) => (
  <div className="flex space-x-2 items-center">
    {/* <img
      src={appWriteService.getFilePreview(featuredImage)}
      height="30"
      width="30"
      alt="thumbnail"
      className="rounded-full border-2 border-white"
    /> */}
    <p className="font-normal text-sm">{title}</p>
  </div>
);

function PostCard({ $id, title, featuredImage, content }) {
  return (
    <Link to={`/post/${$id}`}>
      <div
        className="w-80 mx-auto flex flex-wrap
    "
      >
        <FollowerPointerCard
          title={<TitleComponent title={title} featuredImage={featuredImage} />}
        >
          <div className="overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100">
            <div className="w-full aspect-w-16 aspect-h-10 bg-gray-100 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative">
              <img
                src={appWriteService.getFilePreview(featuredImage)}
                alt={title}
                className="w-[400px] h-[270px] group-hover:scale-95 group-hover:rounded-2xl transform object-center transition duration-200 "
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold  text-xl text-zinc-700">{title}</h2>

              <div className="flex flex-row justify-between items-center mt-6">
                {/* <span className="text-sm text-gray-500"></span> */}
                <a
                  href={`/post/${$id}`}
                  className="relative text-center z-10 w-full py-2 bg-black text-white font-bold rounded-xl block text-xs cursor-none"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </FollowerPointerCard>
      </div>
    </Link>
  );
}

// Define prop types
PostCard.propTypes = {
  $id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string.isRequired,
};

export default PostCard;
