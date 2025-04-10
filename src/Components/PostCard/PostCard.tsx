"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import CommentPost from "../CommentPost/CommentPost";
import { Box, Button, Divider, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { Post } from "@/Types/post.types";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

interface PostCardProps {
  post: Post; 
  all?: boolean;
}

export default function PostCard({ post, all = false }: PostCardProps) {
  const commentRef = React.useRef<HTMLInputElement>(null);
  const [love, setlove] = React.useState(false);
  const [like, setlike] = React.useState(false);
  const [postLoading, setpostLoading] = React.useState(false);
  
  const router = useRouter();

  function handleClickLove() {
    setlove(!love);
  }

  function handleClickLike() {
    setlike(!like);
  }

  function addComment({value}: {value: string | undefined}) {
    setpostLoading(true);
    const option = {
      method: "POST",
      url: `https://linked-posts.routemisr.com/comments`,
      headers: {
        token: localStorage.getItem("token"),
      },
      data: {
        content: value,
        post: post._id,
      },
    }
    axios.request(option).then((response) => {      
      if (response.data.message === "success") {
        toast.success("Comment added successfully");
      }
    }).catch((error) => {
      toast.error(error.response.data.error);
    })
    .finally(() => {
      setpostLoading(false);
      commentRef.current!.value = "";
    })
  }


  return (
    <Card sx={{ width: "100%", padding: 2, borderRadius: 4, boxShadow: 5 }}>
      <CardHeader
        avatar={
          <Image
            src={post.user.photo}
            width={40}
            height={40}
            alt={`avatar of ${post.user.name} image`}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={new Date(post.createdAt).toDateString()}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.body}
        </Typography>
      </CardContent>

      {post.image && (
        <Image
          src={post.image}
          alt="Post Image"
          className="object-cover"
          width={600}
          height={400}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        />
      )}

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="Like" onClick={handleClickLike}>
          <ThumbUpIcon sx={{ color: like ? "blue" : "" }} />
        </IconButton>
        <IconButton aria-label="add to favorites" onClick={handleClickLove}>
          <FavoriteIcon sx={{ color: love ? "red" : "" }} />
        </IconButton>
        <IconButton aria-label="Comment">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Box>
        {post.comments?.length > 0 && !all && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2, color: "blue" }}>Comments</Divider>
            <CommentPost commentInfo={post.comments[0]} />
            <Button
              variant="contained"
              fullWidth
              sx={{ my: 1 }}
              onClick={() => router.push(`/posts/${post._id}`)}
            >
              Show More Comments
            </Button>
          </Box>
        )}

        {post.comments?.length > 1 && all && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2, color: "blue" }}>Comments</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {post.comments.map((comment) => (
                <CommentPost commentInfo={comment} key={comment._id} />
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{position:"relative"}}>
        <TextField
          fullWidth
          sx={{ mt: 2, borderRadius: 8 }}
          multiline
          minRows={1}
          maxRows={5}
          placeholder="Add a comment"
          inputRef={commentRef}
        />
        <Button disabled={postLoading} onClick={() => addComment({value: commentRef.current?.value})} sx={{ position: "absolute", top: "60%", transform: "translateY(-50%)", right: 10 }} variant="contained">
          {postLoading ? <FaSpinner className="animate-spin" />: <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            Send
          <SendIcon /></Box>}
        </Button>
        </Box>
      </Box>
    </Card>
  );
}
