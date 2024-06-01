import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ------------------------createPost------------------------
  async createPost({
    title,
    slug,
    featuredImage,
    content,
    status,
    userId,
    paragraph,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        { title, featuredImage, content, status, userId, paragraph }
      );
    } catch (error) {
      alert("Failed to create post: " + error);
      throw error;
    }
  }

  // ------------------------updatePost------------------------
  async updatePost(slug, { title, featuredImage, content, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug,
        { title, featuredImage, content, status }
      );
    } catch (error) {
      alert("Failed to update post: " + error);
      throw error;
    }
  }

  // ------------------------deletePost------------------------
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      alert("Failed to delete post: " + error);
      return false;
    }
  }

  // ------------------------getPost POST------------------------
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      alert("Failed to get post: " + error);
      return false;
    }
  }

  // ------------------------listDocument POSTS------------------------
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocument(
        conf.appWriteDatabaseId,
        conf.appWriteCollectionId,
        queries
      );
    } catch (error) {
      alert("Failed to get posts: " + error);
      return false;
    }
  }

  // ------------------------FILE UPLOAD SERVICES------------------------

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      alert("Failed to upload file: " + error);
      return false;
    }
  }
  //   ------------------------FILE DELETE SERVICES------------------------

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appWriteBucketId,
        ID.unique(),
        fileId
      );
    } catch (error) {
      alert("Failed to delete file: " + error);
      return false;
    }
  }
  //   ------------------------FILE Preview SERVICES------------------------

  async filePreview(fileId) {
    try {
      return this.bucket.getFilePreview(
        conf.appWriteBucketId,
        fileId,
        ImageGravity.Center // gravity (optional)
      );
    } catch (error) {
      alert("Failed to Preview file: " + error);
      return false;
    }
  }
  //   ------------------------FILE Download SERVICES------------------------

  async fileDownload(fileId) {
    try {
      return this.bucket.getFileDownload(conf.appWriteBucketId, fileId);
    } catch (error) {
      alert("Failed to download file: " + error);
      return false;
    }
  }
}

const service = new Service();

export default service;
