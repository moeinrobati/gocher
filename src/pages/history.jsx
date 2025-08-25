import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";

export default function HistorySwitcher() {
  const [tab, setTab] = useState("all");
  const [gradientAnimation, setGradientAnimation] = useState(null);

  useEffect(() => {
    fetch("/animations/gradient.json")
      .then((res) => res.json())
      .then((data) => setGradientAnimation(data))
      .catch((err) => console.error("Failed to load Gradient JSON", err));
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",       // پس‌زمینه کل صفحه
        backgroundColor: "#121212",  // مشکی
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 4, // سوئیچر بیاد بالا
      }}
    >
      {/* 🔘 سوئیچر */}
      <Box
        sx={{
          position: "relative",
          width: "395px",
          height: "45px",
          borderRadius: "999px",
          backgroundColor: "#1f1f1f",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: "4px",
          mx: "auto",
        }}
      >
        {/* بکگراند متحرک */}
        <Box
          sx={{
            position: "absolute",
            top: "4px",
            left: tab === "all" ? "4px" : "calc(50% + 2px)",
            width: "calc(50% - 6px)",
            height: "37px",
            backgroundColor: "#3a3a3a",
            borderRadius: "999px",
            transition: "all 0.3s ease",
            zIndex: 1,
          }}
        />

        {/* 🟢 دکمه All */}
        <Box
          onClick={() => setTab("all")}
          sx={{
            flex: 1,
            textAlign: "center",
            zIndex: 2,
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: tab === "all" ? "#fff" : "#aaa",
              transition: "color 0.3s",
            }}
          >
            All
          </Typography>
        </Box>

        {/* 🟢 دکمه Joined */}
        <Box
          onClick={() => setTab("joined")}
          sx={{
            flex: 1,
            textAlign: "center",
            zIndex: 2,
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              color: tab === "joined" ? "#fff" : "#aaa",
              transition: "color 0.3s",
            }}
          >
            Joined
          </Typography>
        </Box>

        {/* لوتی گرادینت بالای سوئیچر */}
        {gradientAnimation && (
          <Box
            sx={{
              bottom: 75,
              left: 0,
              width: "100%",
              height: 80,
              pointerEvents: "none",
              zIndex: 0,
              position: "fixed",
            }}
          >
            <Lottie animationData={gradientAnimation} loop={true} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
