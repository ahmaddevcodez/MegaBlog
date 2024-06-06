import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appWriteService from "../../appwrite/config";
import { CommonBtn, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appWriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appWriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 bg-black text-white">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appWriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl h-[600px] w-[100%]"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6 flex">
              <Link to={`/edit-post/${post.$id}`}>
                <button
                  className="bg-gradient-to-br relative group/btn from-white w-[100px]   to-white block dark:bg-zinc-800  text-myprimary rounded-md h-9 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] pl-3 pr-3"
                  type="submit"
                >
                  Edit
                  <BottomGradient />
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="bg-gradient-to-br ml-2 relative group/btn from-white  w-[100px]  to-white block dark:bg-zinc-800 text-myprimary rounded-md h-9 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] pl-3 pr-3"
                type="submit"
              >
                Delete
                <BottomGradient />
              </button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-4xl font-bold text-center">{post.title}</h1>
        </div>
        <div className=" border-[1.4px] border-white p-1 rounded-lg w-[75%] mx-auto">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
