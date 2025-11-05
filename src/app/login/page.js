'use client'

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { status } = useSession();
  
  // State để lưu callbackUrl
  const [callbackUrl, setCallbackUrl] = useState("/");

  useEffect(() => {
    // Chỉ khi component đã mount và query đã có sẵn trên client
    if (router.query?.callbackUrl) {
      setCallbackUrl(router.query.callbackUrl);
    }
  }, [router.query]);  // Khi query thay đổi, cập nhật callbackUrl

  useEffect(() => {
    // Điều hướng nếu đã xác thực
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl]);

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("Username hoặc Password chưa đúng!")
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #fce3ec 0%, #ffffff 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 380,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" mb={2}>
          🔐 Đăng nhập vào hệ thống
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <Typography color="error" variant="body2" mt={1}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng nhập"}
          </Button>
        </form>
      </Paper>
    </Box>
  )
}
