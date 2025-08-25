import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { Box, Typography } from "@mui/material";

export default function ActiveSwitcher() {
  const [tab, setTab] = useState("joined");
  const [gradientAnimation, setGradientAnimation] = useState(null);

  useEffect(() => {
    fetch("/animations/gradient.json")
      .then((res) => res.json())
      .then((data) => setGradientAnimation(data))
      .catch((err) => console.error("Failed to load Gradient JSON", err));
  }, []);

  const getLeftPosition = () => {
    if (tab === "joined") return "4px";
    if (tab === "browse") return "calc(33.33% + 2px)";
    if (tab === "created") return "calc(66.66% + 0px)";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",        // کل صفحه
        backgroundColor: "#121212",   // پس‌زمینه مشکی
        display: "flex",
        flexDirection: "column",   // چینش عمودی
        alignItems: "center",      // وسط‌چینی افقی
        pt: 4,                     // فاصله از بالا (مثلاً 32px)
      }}
    >
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
            left: getLeftPosition(),
            width: "calc(33.33% - 6px)",
            height: "37px",
            backgroundColor: "#3a3a3a",
            borderRadius: "999px",
            transition: "all 0.3s ease",
            zIndex: 1,
          }}
        />

        {/* دکمه‌ها */}
        {["joined", "browse", "created"].map((item) => (
          <Box
            key={item}
            onClick={() => setTab(item)}
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
                color: tab === item ? "#fff" : "#aaa",
                transition: "color 0.3s",
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Typography>
          </Box>
        ))}

        {/* لوتی گرادینت */}
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
