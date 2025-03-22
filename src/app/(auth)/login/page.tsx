'use client'
import { AccountCircle } from "@mui/icons-material";
import * as React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import { loginFunc } from "@/Store/features/user.slice";
import { useAppDispatch } from "@/Hooks/store.hook";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import * as Yup from "yup";
import toast from "react-hot-toast";

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      dispatch(loginFunc(values)).then((res) => {
        if(res.payload.message === "success")
          toast.success("Login Successfully");
          setTimeout(() => {
            router.push("/");
          }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      })
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required").matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/, "Password must be at least 8 characters long and contain at least one letter , one number and one special character"),
    }),
  });
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
        ":hover": {
          boxShadow: 10,
        }
      }}
      className="LoginPage w-[90%] lg:w-[70%] xl:w-[50%] "
    >
      <Box
      className=" p-4 lg:pb-2 lg:p-12 "
        onSubmit={formik.handleSubmit}
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: 4,
          justifyContent: "center",
          flexDirection: "column",
          mt: 5,
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
          Login
        </Typography>

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
          <Typography sx={{ color: "red" }}>{formik.errors.email}</Typography>
        ) : null}

        <Box sx={{ display: "flex", alignItems: "flex-end", width: "100%" }}>
          <TextField
            type="password"
            id="input-with-sx"
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
          <Typography sx={{ color: "red" }}>{formik.errors.password}</Typography>
        ) : null}

        <Button
          variant="contained"
          sx={{ mt: 2,  width: "100%" ,height:"40px" }}
          type="submit"
          disabled={!formik.isValid || loading}
        >
          {loading ? <FaSpinner className="animate-spin" /> :<Box sx={{ display: "flex", alignItems: "center" ,justifyContent:"space-around", gap:1}}>
                      Login <SendIcon />
                      </Box>}
        </Button>

        <Typography
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
          Forget Password?
        </Typography>
      </Box>
      <Box className="w-full px-4 lg:px-12 py-8 border-t border-gray-400" component={"div"}>
        <Button onClick={() => router.push("/signup")}
          variant="contained"
          color="success"
          sx={{ width: "100%" }}
        >
          Create New Account
        </Button>
      </Box>
    </Box>
  );
}
