"use client";
import PostCard from "@/Components/PostCard/PostCard";
import { useAppSelector } from "@/Hooks/store.hook";
import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useCallback, use } from "react";
import { Post } from "@/Types/post.types";
import SkeltonePost from "@/Components/SkeltonePost/SkeltonePost";

export default function Page({ params }: { params: Promise<{ postid: string }> }) {
  const { postid } = use(params);
  const token = useAppSelector((state) => state.userReducer.token);
  const [postDetails, setpostDetails] = useState<Post | null>(null);

  const getAllpostDetails = useCallback(async () => {
    if (!postid || !token) return;
    try {
      const response = await axios.get(`https://linked-posts.routemisr.com/posts/${postid}`, {
        headers: { token },
      });
      setpostDetails(response.data.post);
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  }, [postid, token]);

  useEffect(() => {
    getAllpostDetails();
  }, [getAllpostDetails]);

  return (
    <Box sx={{ width: { xs: "100%", sm: "80%", md: "70%", lg: "50%" }, mx: "auto", padding: 2 }}>
      {postDetails ? <PostCard post={postDetails} all={true} /> : <SkeltonePost count={1}/>}
    </Box>
  );
}
