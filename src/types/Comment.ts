import { StatusType } from './Common';

export interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    profilePic: string;
  };
  video: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface CommentQueryResponse {
  status: StatusType;
  results?: number;
  data: {
    comments?: Comment[];
    comment?: Comment;
  } | null;
}
