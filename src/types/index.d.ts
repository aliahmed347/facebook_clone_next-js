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
  _id: Types.ObjectId;
  content: string;
  media: string;
  width: number;
  height: number;
  mediaType: "video" | 'image' | 'text';
  author: IUser;
  likes: string[];
  comments: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}