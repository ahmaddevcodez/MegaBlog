import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.account = new Account(this.client);
  }

  // createAccount
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      alert("Failed to create user: " + error);
      throw error;
    }
  }

  // login
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      alert("Failed to login user: " + error);
      throw error;
    }
  }

  // getCurrentUser
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      alert("Failed to get the current user: " + error);
      return null;
    }
  }

  // deleteUser
  async deleteUser() {
    try {
      return await this.account.deleteSession();
    } catch (error) {
      alert("Failed to delete user: " + error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      alert("Failed to logout user: " + error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
