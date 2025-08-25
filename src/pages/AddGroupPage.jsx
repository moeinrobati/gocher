import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StepTerms from "../components/StepTerms";

// Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AddGroupPage() {
  const [mainAnimation, setMainAnimation] = useState(null);
  const [gradientAnimation, setGradientAnimation] = useState(null);
  const router = useRouter();

  const [channels, setChannels] = useState([]);
  const userId = 12345; // جایگزین با شناسه واقعی کاربر

  useEffect(() => {
    fetch("/animations/Cube shape animation.json")
      .then((res) => res.json())
      .then((data) => setMainAnimation(data))
      .catch((err) => console.error("Failed to load Lottie JSON", err));

    fetch("/animations/Gradient Footer.json")
      .then((res) => res.json())
      .then((data) => setGradientAnimation(data))
      .catch((err) => console.error("Failed to load Gradient JSON", err));
  }, []);

  // Load initial channels
  useEffect(() => {
    const fetchChannels = async () => {
      const { data } = await supabase
        .from("channels")
        .select("*")
        .eq("owner_id", userId);
      setChannels(data || []);
    };
    fetchChannels();

    // Realtime subscription
    const channelSub = supabase
      .channel(`public:channels:owner_id=eq.${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "channels", filter: `owner_id=eq.${userId}` },
        (payload) => {
          setChannels((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelSub);
    };
  }, [userId]);

  const handleConfirm = () => {
    alert("Confirm clicked!");
  };
  const handleBack = () => {
    router.push("/create?step=1");
  };

  const baseHeight = 80;
  const itemHeight = 50;
  const maxHeight = 300;
  const calculatedHeight = Math.min(baseHeight + channels.length * itemHeight, maxHeight);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#121212",
        pt: 3,
      }}
    >
      {/* هدر با دکمه برگشت بالا چپ */}
      <Box sx={{ position: "fixed", top: 10, left: 10, zIndex: 10 }}>
        <IconButton onClick={handleBack} sx={{ color: "#19b3d2ff" }} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* بخش بالای صفحه */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {mainAnimation ? (
          <Box sx={{ width: 150, height: 150 }}>
            <Lottie animationData={mainAnimation} loop={true} />
          </Box>
        ) : (
          <div>Loading animation...</div>
        )}

        <Typography
          variant="h6"
          sx={{
            mt: 3,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          Add Telegram Channel or Group
        </Typography>
        <Typography
          sx={{
            mb: 3,
            color: "#888",
            fontSize: "0.9rem",
            lineHeight: 1.5,
            textAlign: "center",
            maxWidth: 350,
            mx: "auto",
          }}
        >
          Click “Add New” to add your public channel or group. If it has already
          been added by another user, use the search function. To add a private,
          you must be its Owner.
        </Typography>

        <Box sx={{ mt: 2, width: 319 }}>
          <Button
            variant="contained"
            onClick={() => {
              window.open("https://t.me/YourBot?startgroup=true", "_blank");
            }}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontWeight: "bold",
              fontSize: 15,
              backgroundColor: "#ffffff",
              color: "#000000ff",
              border: "2px solid #e5ff00ff",
              borderRadius: 8,
              boxShadow: "none",
              transition: "all 0.3s ease",
              minHeight: 48,
              px: 3,
              width: "100%",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#eaff00ff",
                color: "#000000ff",
                boxShadow: "0 0 10px #00f2ff55",
              },
              textTransform: "none",
            }}
          >
            <img
              src="/icons/plus.svg"
              alt="Plus"
              style={{ width: 28, height: 28 }}
              draggable={false}
            />
            Add New Group or Channel
          </Button>

          <Box sx={{ mt: 5 }}>
            <Typography
              variant="subtitle2"
              sx={{
                color: "#aeaeaeff",
                mb: 1.5,
                fontWeight: "medium",
                fontSize: "1rem",
                lineHeight: 1.2,
              }}
            >
              Recent Channels and Groups
            </Typography>

            {/* اینجا باکس با لیست کانال */}
            <Box
              sx={{
                mt: 1,
                px: 2,
                py: 2.5,
                borderRadius: 2,
                border: "1px solid #666",
                bgcolor: "#2c2c2c",
                color: "#ccc",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                height: calculatedHeight,
                overflowY: channels.length * itemHeight + baseHeight > maxHeight ? "auto" : "hidden",
                transition: "height 0.3s ease",
              }}
            >
              {channels.length === 0 ? (
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.9rem", textAlign: "center", mt: "auto", mb: "auto" }}
                >
                  Your Gifts will appear here
                </Typography>
              ) : (
                channels.map((channel) => (
                  <Box
                    key={channel.channel_id}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 1,
                      bgcolor: "#444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.9rem",
                      minHeight: itemHeight - 10,
                    }}
                  >
                    <Typography noWrap sx={{ maxWidth: "70%" }}>
                      {channel.title}
                    </Typography>
                    <Typography variant="caption">{channel.type}</Typography>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* بخش پایین شامل گرادینت */}
      <Box sx={{ position: "relative", width: "100%" }}>
        {gradientAnimation && (
          <Box
            sx={{
              position: "fixed",
              bottom: "100px",
              left: 0,
              width: "100%",
              height: 85,
              pointerEvents: "none",
              zIndex: 0,
              transform: "scaleX(-1)",
            }}
          >
            <Lottie animationData={gradientAnimation} loop={true} />
          </Box>
        )}
      </Box>

      {/* دکمه Confirm ثابت پایین صفحه */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          position: "fixed",
          bottom: 65,
          left: 0,
          right: 0,
          borderRadius: 8,
          fontWeight: "bold",
          backgroundColor: "#e9ce02ff",
          color: "#000",
          boxShadow: "none",
          maxWidth: 400,
          margin: "0 auto",
          "&:hover": {
            backgroundColor: "#e9ce02ff",
          },
        }}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </Box>
  );
}
