import React, { useState } from "react";
import appWriteService from "../../appwrite/config";
import { PostCard, Container } from "../index";
import SparklesCore from "../ui/Sparkles";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  appWriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
                <h1 className="md:text-6xl text-3xl lg:text-8xl font-bold text-center text-white relative z-20">
                  ADD BLOG
                </h1>
                <div className="w-[40rem] h-40 relative">
                  {/* Gradients */}
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                  <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                  <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                  {/* Core component */}
                  <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                  />

                  {/* Radial Gradient to prevent sharp edges */}
                  <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <Container>
      <div className="">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AllPost;
