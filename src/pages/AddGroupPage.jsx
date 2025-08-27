import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import Lottie from "lottie-react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// --- Constants ---
// Supabase Client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Style & Dimension Constants
const COLORS = {
  primary: "#19b3d2ff",
  background: "#121212",
  text: "#ffffff",
  textSecondary: "#888",
  textMuted: "#aeaeaeff",
  accent: "#e9ce02ff",
  accentHover: "#eaff00ff",
  border: "#666",
  listItemBg: "#444",
  listBg: "#2c2c2c",
};

const LIST_DIMENSIONS = {
  baseHeight: 80,
  itemHeight: 50,
  maxHeight: 300,
};

// --- Component ---
export default function AddGroupPage() {
  const [user, setUser] = useState(null);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [mainAnimation, setMainAnimation] = useState(null);
  const [gradientAnimation, setGradientAnimation] = useState(null);
  const router = useRouter();

  // Effect for fetching animations
  useEffect(() => {
    fetch("/animations/Cube shape animation.json")
      .then((res) => res.json())
      .then(setMainAnimation)
      .catch((err) => console.error("Failed to load Lottie JSON", err));

    fetch("/animations/Gradient Footer.json")
      .then((res) => res.json())
      .then(setGradientAnimation)
      .catch((err) => console.error("Failed to load Gradient JSON", err));
  }, []);

  // Effect for getting the authenticated user
  useEffect(() => {
    const getSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getSession();
  }, []);

  // Effect for fetching channels and setting up realtime subscription
  useEffect(() => {
    if (!user) return;
    const userId = user.id;

    const fetchChannels = async () => {
      const { data, error } = await supabase
        .from("channels")
        .select("*")
        .eq("owner_id", userId);

      if (error) {
        console.error("Error fetching channels:", error.message);
        setError("Could not fetch your channels. Please try again later.");
      } else {
        setChannels(data || []);
      }
    };
    fetchChannels();

    const channelSub = supabase
      .channel(`public:channels:owner_id=eq.${userId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "channels", filter: `owner_id=eq.${userId}` },
        (payload) => {
          setChannels((prevChannels) => [...prevChannels, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelSub);
    };
  }, [user]);

  // --- Handlers ---
  const handleConfirm = () => {
    alert("Confirm clicked!");
  };

  const handleBack = () => {
    router.push("/create?step=1");
  };

const handleAddGroupClick = () => {
const url = "https://t.me/gocherbot?startattach=addGift&choose=groups+channels";

  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();

    if (typeof tg.openTelegramLink === "function") {
      console.log("using openTelegramLink");
      tg.openTelegramLink(url);
    } else if (typeof tg.openLink === "function") {
      console.log("using openLink");
      tg.openLink(url, { try_instant_view: false });
    } else {
      console.log("fallback window.open");
      window.open(url, "_blank");
    }
  } else {
    window.open(url, "_blank");
  }
};



  const calculatedHeight = Math.min(
    LIST_DIMENSIONS.baseHeight + channels.length * LIST_DIMENSIONS.itemHeight,
    LIST_DIMENSIONS.maxHeight
  );

  return (
    <Box sx={{
        height: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "space-between", alignItems: "center", position: "relative",
        minHeight: "100vh", backgroundColor: COLORS.background, pt: 3,
      }} >
      <Box sx={{ position: "fixed", top: 10, left: 10, zIndex: 10 }}>
        <IconButton onClick={handleBack} sx={{ color: COLORS.primary }} aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", px: 2 }}>
        {mainAnimation && <Box sx={{ width: 150, height: 150 }}><Lottie animationData={mainAnimation} loop={true} /></Box>}
        
        <Typography variant="h6" sx={{ mt: 3, fontWeight: "bold", color: COLORS.text, textAlign: "center" }}>
          Add Telegram Channel or Group
        </Typography>

        <Typography sx={{ mb: 3, color: COLORS.textSecondary, fontSize: "0.9rem", textAlign: "center", maxWidth: 350 }}>
          Click “Add New” to add your public channel or group. The bot must be an administrator in the chat.
        </Typography>

        <Box sx={{ mt: 2, width: "100%", maxWidth: 350 }}>
          {/* CORRECTED BUTTON FOR TELEGRAM MINI APP */}
          <Button
            variant="contained"
            onClick={handleAddGroupClick} // Use onClick to call the handler
            sx={{
                fontWeight: "bold", fontSize: 15, backgroundColor: COLORS.text, color: "#000",
                border: "2px solid #e5ff00ff", borderRadius: 8, boxShadow: "none", width: "100%",
                minHeight: 48, textTransform: "none", display: "flex", gap: 1,
                "&:hover": { backgroundColor: COLORS.accentHover, boxShadow: "0 0 10px #00f2ff55" },
            }}
          >
            <img src="/icons/plus.svg" alt="Plus Icon" style={{ width: 28, height: 28 }} />
            Add New Group or Channel
          </Button>

          <Box sx={{ mt: 5 }}>
            <Typography variant="subtitle2" sx={{ color: COLORS.textMuted, mb: 1.5, fontWeight: "medium" }}>
              Recent Channels and Groups
            </Typography>
            
            {error && <Typography color="error" sx={{ textAlign: 'center', mb: 2 }}>{error}</Typography>}

            <Box sx={{
                px: 2, py: 2.5, borderRadius: 2, border: `1px solid ${COLORS.border}`,
                bgcolor: COLORS.listBg, color: "#ccc", display: "flex", flexDirection: "column",
                gap: 1, height: calculatedHeight, overflowY: "auto", transition: "height 0.3s ease",
              }}
            >
              {channels.length === 0 ? (
                <Typography variant="body2" sx={{ textAlign: "center", m: "auto" }}>
                  Your added groups will appear here.
                </Typography>
              ) : (
                channels.map((channel) => (
                  <Box
                    key={channel.channel_id}
                    sx={{
                      px: 2, py: 1, borderRadius: 1, bgcolor: COLORS.listItemBg, display: "flex",
                      alignItems: "center", justifyContent: "space-between",
                      minHeight: LIST_DIMENSIONS.itemHeight - 10,
                    }}
                  >
                    <Typography noWrap sx={{ maxWidth: "70%" }}>{channel.title}</Typography>
                    <Typography variant="caption">{channel.type}</Typography>
                  </Box>
                ))
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ position: "relative", width: "100%" }}>
        {gradientAnimation && <Box sx={{ position: "fixed", bottom: "100px", left: 0, width: "100%", height: 85, pointerEvents: "none", zIndex: 0, transform: "scaleX(-1)" }} >
          <Lottie animationData={gradientAnimation} loop={true} />
        </Box>}
      </Box>

      <Button
        variant="contained"
        fullWidth
        sx={{
          position: "fixed", bottom: 65, left: 0, right: 0, borderRadius: 8, fontWeight: "bold",
          backgroundColor: COLORS.accent, color: "#000", boxShadow: "none", maxWidth: 400,
          margin: "0 auto", "&:hover": { backgroundColor: COLORS.accent },
        }}
        onClick={handleConfirm}
      >
        Confirm
      </Button>
    </Box>
  );
}