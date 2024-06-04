import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { CommonBtn, CommonInput, RTE, Select } from "../index";
import appWriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appWriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appWriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appWriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appWriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appWriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
    >
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        <CommonInput
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <CommonInput
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
      </div>

      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Picture
        </label> */}

        <input
          type="file"
          className="mb-4 flex h-10  rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        ></input>
        <Select
          options={["active", "inactive"]}
          className="w-full"
          {...register("status", { required: true })}
        />
      </div>

      {post && (
        <div className="md:col-span-2 w-full mb-4">
          <img
            src={appWriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg"
          />
        </div>
      )}

      <div className="md:col-span-2">
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="md:col-span-2">
        {/* <CommonBtn
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full mt-4"
        >
        </CommonBtn> */}
        <button
          type="submit"
          className="bg-gradient-to-br relative group/btn from-white   to-white block dark:bg-zinc-800 w-full text-myprimary rounded-md h-9 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] pl-3 pr-3"
        >
          {post ? "Update" : "Submit"}

          <BottomGradient />
        </button>
      </div>
    </form>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
