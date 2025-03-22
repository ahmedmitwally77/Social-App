"use client";
// import CommentPost from "@/Components/CommentPost/CommentPost";
import Loading from "@/Components/Loading/Loading";
import PostCard from "@/Components/PostCard/PostCard";
import { useAppSelector } from "@/Hooks/store.hook";
import { Box } from "@mui/material";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ postid: string } >}) {
  const { postid } = use(params);
  const [postDetails, setpostDetails] = useState(null)
  const token = useAppSelector((state) => state.userReducer.token);
  

  async function getAllpostDetails() {
    const option = {
      method: "GET",
      url: `https://linked-posts.routemisr.com/posts/${postid}`,
      headers: {
        token,
      },
    };
    const response = await axios.request(option);
    console.log(response);
    
    setpostDetails(response.data.post);
  }

  useEffect(() => {
    getAllpostDetails();
  }, []);

  return(<Box sx={{ width: { xs: "100%", sm: "80%", md: "70%" ,lg:"50%" },mx:"auto", padding: 2 }}>
    {postDetails ? <PostCard post={postDetails} all={true} /> : <Loading />}
  </Box>);
}
