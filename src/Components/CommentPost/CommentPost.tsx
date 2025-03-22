import { Comment } from "@/Types/post.types";
import { Box, CardHeader, IconButton, Typography } from "@mui/material";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function CommentPost({ commentInfo }: { commentInfo: Comment }) {
  return (
    <Box sx={{bgcolor:"#eee",px:3,p:2,borderRadius:4}}>
      <CardHeader sx={{p:0 ,mb:2}}
        avatar={
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        }
        title={commentInfo.commentCreator.name}
        subheader={new Date(commentInfo.createdAt).toDateString()}
      />

      <Typography component={"p"} sx={{pl:1}}>
        <span>{commentInfo.content}</span>
      </Typography>
    </Box>
  );
}
