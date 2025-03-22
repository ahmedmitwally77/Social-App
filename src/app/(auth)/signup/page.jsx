'use client'
import { AccountCircle } from "@mui/icons-material";
import * as React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { loginFunc } from "@/Store/features/user.slice";
import { useAppDispatch } from "@/Hooks/store.hook";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import * as Yup from "yup";

export default function Page() {
  const [loading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      gender: "",
      dateOfBirth: "",
    },
    onSubmit:handelSignUp
  ,validationSchema:Yup.object({
    name:Yup.string().required("Name is required").min(3,"Name must be at least 3 characters long").max(20,"Name must be at most 20 characters long"),
    email:Yup.string().email("Invalid email").required("Email is required"),
    password:Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/, "Password must be at least 8 characters long and contain at least one letter , one number and one special character"),
    rePassword:Yup.string().required("RePassword is required").oneOf([Yup.ref("password")], "Passwords must match"),
    gender:Yup.string().required("Gender is required"),
    dateOfBirth:Yup.date().required("Date of Birth is required"),
  })

  });

  async function  handelSignUp(values){
    setLoading(true)
    const options={
    method:"POST",
    url:`https://linked-posts.routemisr.com/users/signup`,
    data:values
    }
    axios.request(options).then((response) => {
    if(response.data.message === "success"){
      toast.success("Account Created Successfully");
      setTimeout(() => {
        router.push("/login");
      }, 500);
    }
    })
    .catch((error) => {
      toast.error(error.response.data.error);
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        borderRadius: 4,
        justifyContent: "center",
        flexDirection: "column",
        my: 5,
        boxShadow: 5,
        mx: "auto",
      }}
      className="LoginPage w-[90%] lg:w-[70%] xl:w-[50%] "
    >
      <Box
      className=" p-3 lg:pb-2 lg:p-8 "
        onSubmit={formik.handleSubmit}
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: 4,
          justifyContent: "center",
          flexDirection: "column",
          mt: 1,
          mx: "auto",
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: "flex",
            alignItems: "center",
            fonstWeight: "bold",
            textTransform: "uppercase",
            color: "primary.main",
          }}
          gutterBottom
          component="h1"
        >
          <AccountCircle sx={{ mr: 1, fontSize: 40 }}></AccountCircle>
          Sign Up
        </Typography>

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <TextField
            id="input-with-sx"
            label="UserName"
            variant="outlined"
            name="name"
            type="name"
            sx={{ width: "100%" }}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>

        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500">{formik.errors.name}</div>
        ) : null}

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <TextField
            id="input-with-sx"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            sx={{ width: "100%" }}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>

        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
            sx={{ width: "100%" }}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>

        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500">{formik.errors.password}</div>
        ) : null}

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <TextField
            type="password"
            id="Repat-password"
            label="Confirm Password"
            variant="outlined"
            sx={{ width: "100%" }}
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>

        {formik.touched.rePassword && formik.errors.rePassword ? (
          <div className="text-red-500">{formik.errors.rePassword}</div>
        ) : null}

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
        <FormControl fullWidth >
  <InputLabel id="gender">Gender</InputLabel>
  <Select
    labelId="gender"
    id="gender"
    name="gender"
    value={formik.values.gender}
    label="Gender"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  >
    <MenuItem value={"male"}>Male</MenuItem>
    <MenuItem value={"female"}>Female</MenuItem>
  </Select>

</FormControl>
        </Box>

        {formik.touched.gender && formik.errors.gender ? (
          <div className="text-red-500">{formik.errors.gender}</div>
        ) : null}

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <TextField
            type="date"
            id="dateOfBirth"
            label=""
            variant="outlined"
            sx={{ width: "100%" }}
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>

        {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
          <div className="text-red-500 spin">{formik.errors.dateOfBirth}</div>
        ) : null}

        <Button
          variant="contained"
          type="submit"
          disabled={!formik.isValid || loading}
          sx={{ mt: 2, width: "100%" ,height:"40px" }}
        >
          {loading ? <FaSpinner className="animate-spin" /> : <Box sx={{ display: "flex", alignItems: "center" ,justifyContent:"space-around", gap:1}}>
            Sign Up <SendIcon />
            </Box>}
        </Button>

        <Typography onClick={() => router.push("/login")}
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            fonstWeight: "bold",
            color: "primary.main",
            my: 1,
            borderBottom: 1,
            borderColor: "transparent",
            transition: "all 0.5s ease-in-out",
            "&:hover": {
              borderBottom: 1,
              borderColor: "primary.main",
              cursor: "pointer",
            },
          }}
        >
          Already have an account ?
        </Typography>
      </Box>

    </Box>
  );
}
