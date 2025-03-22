/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PostCard from "@/Components/PostCard/PostCard";
import { useAppSelector } from "@/Hooks/store.hook";
import { PostType } from "@/Types/post.types";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "@/Components/Loading/Loading";
import FormPost from "@/Components/FormPost/FormPost";

export default function Home() {
  const token = useAppSelector((state) => state.userReducer.token);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);

  async function getAllPosts() {
    if (loading) return;
    setLoading(true);
    if (posts.length === 0) setLoading(false);
    try {
      const response = await axios.get(
        `https://linked-posts.routemisr.com/posts?page=1&limit=${limit}`,
        {
          headers: { token },
        }
      );
      setPosts((prevPosts) => [...(prevPosts || []), ...response.data.posts]);
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllPosts();
  }, [limit]);

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading
    ) {
      setLimit((prevLimit) => prevLimit + 5);
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
            posts.map((post: PostType) => (
              <PostCard key={post._id} post={post} />
            ))
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
