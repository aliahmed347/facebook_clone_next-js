import { Document, Types } from "mongoose";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  DOB: string;
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
  likes: string[];
  comments: IComment[];
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