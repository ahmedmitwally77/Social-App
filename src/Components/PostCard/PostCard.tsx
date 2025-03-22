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
export default function PostCard({ post, all=false }) {
  const [love, setlove] = React.useState(false);
  const [like, setlike] = React.useState(false);
  const router = useRouter(); 
  function handleClickLove() {
    setlove(!love);
  }
  function handleClickLike() {
    setlike(!like);
  }
  return (
    <Card sx={{ width: "100%", padding: 2, borderRadius: 4, boxShadow: 5 }}>
      <CardHeader
        avatar={
          <Image
            src={post.user.photo}
            width={40}
            height={40}
            alt={`avatar of ${post.user.name}`}
          ></Image>
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
          alt="Remy Sharp"
          className="object-cover"
          width={600}
          height={100}
          style={{ width: "100%", height: "400px", objectFit: "cover" }}
        ></Image>
      )}

      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton aria-label="Like">
          <ThumbUpIcon
            sx={{ color: like ? "blue" : "" }}
            onClick={handleClickLike}
          />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon
            sx={{ color: love ? "red" : "" }}
            onClick={handleClickLove}
          />
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
              onClick={() => {
                router.push(`/posts/${post._id}`);
              }}
            >
              Show More Comments
            </Button>
          </Box>
        )}

        {post.comments?.length > 1 && all && (
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ mb: 2, color: "blue" }}>Comments</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2}}>
            {post.comments.map((comment: Comment) => (
              <CommentPost commentInfo={comment} key={comment._id} />
            ))}
            </Box>
          </Box>
        )}

        <TextField
          fullWidth
          sx={{ mt:2, borderRadius: 8 }}
          multiline
          minRows={1}
          maxRows={5}
          placeholder="Add a comment"
        />
      </Box>
    </Card>
  );
}
