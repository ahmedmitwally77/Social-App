/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PostCard from "@/Components/PostCard/PostCard";
import { useAppSelector } from "@/Hooks/store.hook";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/Components/Loading/Loading";
import FormPost from "@/Components/FormPost/FormPost";
import { Post } from "@/Types/post.types";

export default function Home() {
  const token = useAppSelector((state) => state.userReducer.token);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setpage] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  async function getAllPosts() {
    if (loading) return;
    if (posts.length === 0) setLoading(false);
    else setLoading(true);
    try {
      const response = await axios.get(
        `https://linked-posts.routemisr.com/posts?page=${page}&limit=5`,
        {
          headers: { token },
        }
      );
      setPosts((prevPosts) => {
        const newPosts = response.data.posts.filter(
          (newPost: Post) => !prevPosts.some((post) => post._id === newPost._id)
        );
        return [...prevPosts, ...newPosts];
      });
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllPosts();
  }, [page]);

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !loading
    ) {
      setpage((prevPage) => prevPage + 1);
    }
  }


  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box component={"section"} id="home" className="py-5 pt-2">
      <Grid container>
        <Grid size={{ xs: 0, sm: 3 }}></Grid>
        <Grid
          size={{ xs: 12, sm: 6 }}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            mx: "auto",
          }}
        >
          <FormPost />
          {posts.length > 0 ? (
            posts.map((post: Post) => <PostCard key={post._id} post={post} />)
          ) : (
            <Loading />
          )}
          {loading && (
            <p style={{ textAlign: "center" }}>
              {" "}
              <Loading />{" "}
            </p>
          )}
        </Grid>
        <Grid size={{ xs: 0, sm: 3 }}></Grid>
      </Grid>
    </Box>
  );
}
