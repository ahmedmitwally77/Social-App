import { Box, Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { useAppSelector } from "@/Hooks/store.hook";
import axios from "axios";
import toast from "react-hot-toast";
export default function FormPost() {
  const postContentRef = useRef<HTMLInputElement>(null);
  const postFileRef = useRef<HTMLInputElement>(null);

  const { token } = useAppSelector((state) => state.userReducer);

async function CreatePost() {
    const content = postContentRef.current?.value || "";
    const file = postFileRef.current?.files?.[0] || null;
    const myFormData = new FormData();
    myFormData.append("body", content);
    if(file){
      myFormData.append("image",file );
    }

    const option = {
      method: "POST",
      url: "https://linked-posts.routemisr.com/posts",
      headers: {
        token,
      },
      data: myFormData,
    };
    const response = await axios.request(option);
    if(response.data.message === "success")
      toast.success("Post Created Successfully");
  }

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset (50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <TextField
        inputRef={postContentRef}
        fullWidth
        multiline
        minRows={7}
        placeholder="What's on your mind"
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files
          <VisuallyHiddenInput type="file" ref={postFileRef} />
        </Button>
        <Button variant="contained" endIcon={<SendIcon />} onClick={CreatePost}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
