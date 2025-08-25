// src/pages/404.jsx
import React from "react";
import { Box, Typography, Button, keyframes } from "@mui/material";
import { useRouter } from "next/router";
import Lottie from "lottie-react";

export default function Custom404() {
  const router = useRouter();
  const animationData = require("/public/animations/404-official.json");

  const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(192, 169, 21, 0.7); }
    70% { box-shadow: 0 0 20px 10px rgba(192, 169, 21, 0); }
    100% { box-shadow: 0 0 0 0 rgba(192, 169, 21, 0); }
  `;

  const textWave = keyframes`
    0%, 100% { transform: translateY(0); }
    25% { transform: translateY(-2px); }
    50% { transform: translateY(2px); }
    75% { transform: translateY(-1px); }
  `;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* Lottie Animation */}
      <Box sx={{ width: 300, height: 300, mb: 3 }}>
        <Lottie animationData={animationData} loop autoplay />
      </Box>

      {/* Texts */}
      <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold", mt: -6, mb: 6 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: "#b0b0b0", mb: 3.5 }}>
        The page you are looking for might be removed or is temporarily unavailable.
      </Typography>

      {/* Animated Button */}
      <Button
        variant="contained"
        onClick={() => router.push("create")}
        sx={{
          backgroundColor: "#c0a915ff",
          px: 10,
          py: 1.8,
          fontWeight: "bold",
          borderRadius: 3,
          fontSize: { xs: "15px", sm: "30px" },
          transition: "all 0.2s ease-in-out",
          animation: `${pulse} 1.5s infinite`,
          "&:hover": { backgroundColor: "#ff00e1ff" },
        }}
      >
        <Box
          component="span"
          sx={{
            display: "inline-block",
            animation: `${textWave} 1.2s infinite`,
          }}
        >
          Go Back Home
        </Box>
      </Button>
    </Box>
  );
}
