"use client";
import { IuserProfile } from "@/Types/user.type";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Profile() {
  const [User, setUser] = useState<IuserProfile | null>(null);
  function getProfile() {
    const token = localStorage.getItem("token");
    const option = {
      method: "GET",
      url: `https://linked-posts.routemisr.com/users/profile-data`,
      headers: {
        token,
      },
    };
    axios
      .request(option)
      .then((response) => {
        console.log(response.data);
        if (response.data.message === "success") {
          setUser(response.data.user)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "80vh",
        width: "70%",
        margin: "auto",
        mt: "50px",
      }}
    >
      {User ? (
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Image
            className="h-[200px] border rounded-full border-blue-500"
            src={
              "https://linked-posts.routemisr.com/uploads/default-profile.png"
            }
            width={200}
            height={200}
            alt=""
          />
          <Typography variant="h4" sx={{ mt: "20px" }}>
            Name : <span className="text-blue-500">{User?.name}</span>
          </Typography>
          <Typography variant="h4" sx={{ mt: "20px" }}>
            Email : <span className="text-blue-500">{User?.email}</span>
          </Typography>
          <Typography variant="h4" sx={{ mt: "20px" }}>
            Gender : <span className="text-blue-500">{User?.gender}</span>
          </Typography>
          <Typography variant="h4" sx={{ mt: "20px" }}>
            Date of Birth :{" "}
            <span className="text-blue-500">{User?.dateOfBirth}</span>
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2} sx={{display:"flex",alignItems:"center"}}>
          <Skeleton variant="circular" width={200} height={200} />
          <Skeleton variant="rectangular" width={250} height={40} />
          <Skeleton variant="rounded" width={350} height={40} />
          <Skeleton variant="rounded" width={300} height={40} />
          <Skeleton variant="rounded" width={300} height={40} />
        </Stack>
      )}
    </Box>
  );
}
