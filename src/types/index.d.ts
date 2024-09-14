import { Document, Types } from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  DOB: string;
  bio: string;
  gender: string;
  avatar: string;
  friends: IUser[];
  receiveRequests: IUser[];
  sentRequests: IUser[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  banner: string;
}


export interface IPost {
  _id: string;
  content: string;
  media: string;
  width: number;
  height: number;
  mediaType: "video" | 'image' | 'text';
  author: IUser;
  savedBy: string[];
  likes: string[];
  comments: IComment[];
  group?: IGroup;
  shares: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IComment {
  _id: string;
  content: string;
  author: IUser;
  post: IPost;
  replies: IComment[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IGroup {
  _id: string;
  name: string;
  description: string;
  avatar: string;
  banner: string;
  admin: IUser;
  members: IUser[];
  posts: IPost[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

export interface INotification {
  _id: string
  sender: IUser
  receiver: IUser
  status: 'ReceiveFriendRequest' | 'AcceptFriendRequest' | 'YourFriendCreateGroup' | 'UpdateYourProfile' | 'UserJoinGroup' | 'YouJoinGroup' | 'YourFriendCreatePost' | 'GroupUserCreatePost' | 'WelComeNewUser'
  group?: IGroup
  createdAt: Date;
  updatedAt: Date;
}