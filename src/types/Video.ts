import { StatusType } from './Common';

export interface Video {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePic: string;
    subscribers: string[];
  };
  title: string;
  description: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface VideoQueryResponse {
  status: StatusType;
  results?: number;
  data: {
    videos?: Video[];
    video?: Video;
  } | null;
}
