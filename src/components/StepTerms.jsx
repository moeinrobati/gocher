import React, { useEffect, useState } from "react";
// ✅ درست برای Next.js
import { useRouter } from "next/router";


import {
  Box,
  Button,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Divider,
  DialogActions,
  Switch,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import Lottie from "lottie-react";
import { keyframes } from "@mui/system";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

const IOSSwitch = React.forwardRef(function IOSSwitch(props, ref) {
  return (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      ref={ref}
      {...props}
      sx={{
        width: 50,
        height: 30,
        padding: 0,
        display: "flex",
        "&:active .MuiSwitch-thumb": {
          width: 22,
        },
        "& .MuiSwitch-switchBase": {
          padding: 0.2,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: "translateX(24px)",
            color: "#fff",
            "& + .MuiSwitch-track": {
              backgroundColor: "#00f2ff",
              opacity: 1,
              border: 0,
            },
            "& .MuiSwitch-thumb": {
              animation: `${shake} 0.3s ease`,
            },
          },
          "&:not(.Mui-checked) .MuiSwitch-thumb": {
            animation: "none",
          },
        },
        "& .MuiSwitch-thumb": {
          boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
          width: 22,
          height: 22,
          borderRadius: 11,
          transition: "width 200ms",
          margin: "2px 0",
        },
        "& .MuiSwitch-track": {
          borderRadius: 13,
          opacity: 1,
          backgroundColor: "#d0d0d0",
          boxSizing: "border-box",
          transition: "background-color 300ms",
        },
      }}
    />
  );
});

export default function StepTerms({ gift, onNext }) {
  const [animationData, setAnimationData] = useState(null);
  const [durationDialogOpen, setDurationDialogOpen] = useState(false);
  const [tempDuration, setTempDuration] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState("Select duration");
const router = useRouter();
const [result, setResult] = useState(false);
const [chatbooster, setChatbooster] = useState(false);
const [premiumUser, setPremiumUser] = useState(false);


  useEffect(() => {
    fetch("/animations/terms.json")
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((err) => console.error("Error loading Lottie animation:", err));
  }, []);

  const handleConfirm = () => {
    if (tempDuration) {
      setSelectedDuration(tempDuration);
    }
    setDurationDialogOpen(false);
  };

  const timeOptions = [
    "1 Minutes",
    "5 Minutes",
    "10 Minutes",
    "15 Minutes",
    "30 Minutes",
    "1 Hour",
    "2 Hours",
    "3 Hours",
    "6 Hours",
    "12 Hours",
    "1 Day",
    "2 Days",
    "3 Days",
    "5 Days",
    "7 Days",
    "15 Days",
    "30 Days",
  ];

  return (
    <Box sx={{ position: "relative", pt: 2, pb: 4, px: 2, textAlign: "center" }}>
      <Typography
        variant="h6"
        component="h1"
        sx={{
          fontWeight: "bold",
          mb: 4,
          maxWidth: 350,
          mx: "auto",
          color: "#4a4a4aff",
          fontSize: "1.2rem",
          lineHeight: 1.3,
        }}
      >
        Get more boosts and subscribers for your channel by giving away Gifts.
      </Typography>

      <Box sx={{ maxWidth: 350, mx: "auto", textAlign: "left" }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "#aeaeaeff",
            mb: 1.5,
            fontWeight: "medium",
            fontSize: "0.9rem",
            lineHeight: 1.2,
          }}
        >
          Included Channels and Groups
        </Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/AddGroupPage")}

          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            fontWeight: "bold",
            fontSize: 15,
            backgroundColor: "#ffffff",
            color: "#000000",
            border: "2px solid #00f2ff",
            borderRadius: 8,
            boxShadow: "none",
            transition: "all 0.3s ease",
            minHeight: 48,
            px: 4,
            width: "100%",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#00f2ff",
              color: "#ffffff",
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
          Add Group or Channel
        </Button>

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#aeaeaeff",
              mb: 1.5,
              fontWeight: "medium",
              fontSize: "0.9rem",
              lineHeight: 1.2,
            }}
          >
            Duration
          </Typography>

          <Button
            variant="contained"
            onClick={() => setDurationDialogOpen(true)}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              fontWeight: "bold",
              fontSize: 15,
              backgroundColor: "#ffffff",
              color: "#000000",
              border: "2px solid #00f2ff",
              boxShadow: "none",
              borderRadius: 8,
              transition: "all 0.3s ease",
              minHeight: 48,
              px: 4,
              width: "100%",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "#00f2ff",
                color: "#ffffff",
                boxShadow: "0 0 10px #00f2ff55",
              },
              textTransform: "none",
            }}
          >
            {selectedDuration}
          </Button>
        </Box>
      </Box>

      <Dialog
        fullScreen
        open={durationDialogOpen}
        onClose={() => setDurationDialogOpen(false)}
        TransitionComponent={Transition}
      >
        <Box sx={{ px: 3, pt: 4, pb: 8 }}>
          <Typography variant="h6" align="center" sx={{ mb: 3, fontWeight: "bold" }}>
            Duration
          </Typography>

          <List disablePadding>
            {timeOptions.map((duration, index) => (
              <React.Fragment key={duration}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setTempDuration(duration)}>
                    <ListItemText primary={duration} />
                    {tempDuration === duration && (
                      <CheckIcon sx={{ color: "#00f2ff", fontWeight: "bold" }} />
                    )}
                  </ListItemButton>
                </ListItem>
                {index !== timeOptions.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          <DialogActions sx={{ position: "fixed", bottom: 0, width: "90%", px: 2, py: 1 }}>
            <Button
              onClick={handleConfirm}
              variant="contained"
              fullWidth
              sx={{
                borderRadius: 8,
                fontWeight: "bold",
                backgroundColor: "#00f2ff",
                color: "#000",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#00d2df",
                },
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Typography
        sx={{
          mb: 3,
          color: "#888",
          fontSize: "0.7rem",
          lineHeight: 1.5,
          textAlign: "left",
          maxWidth: 350,
          mx: "auto",
        }}
      >
        Choose how long the giveaway will run. Winners will be selected automatically when time is up.
      </Typography>

      <Box sx={{ textAlign: "left" }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: "#aeaeaeff",
            mb: 1.5,
            fontWeight: "medium",
            fontSize: "0.9rem",
            lineHeight: 2.5,
          }}
        >
          Participant requirements
        </Typography>
      </Box>

<Box
  sx={{
    maxWidth: 700,
    mx: "auto",
    mt: 1,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  }}
>
  <Box
    sx={{
      border: "1px solid #282828ff",
      borderRadius: 1.5,
      p: 1.5,
      display: "flex",
      flexDirection: "column",
      gap: 1.5,
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontWeight: 500,
        }}
      >
        Premium Users
      </Typography>

<IOSSwitch
  checked={premiumUser}
  onChange={(e) => setPremiumUser(e.target.checked)}
/>
    </Box>

    <Divider />

    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontWeight: 500,
        }}
      >
        Chat Booster
      </Typography>

<IOSSwitch
  checked={chatbooster}
  onChange={(e) => setChatbooster(e.target.checked)}
/>
    </Box>
  </Box>
<Typography
  variant="subtitle2"
  sx={{
    color: "#aeaeaeff",
    mt: 3,         // فاصله از بالا
    mb: 0,         // بدون فاصله از پایین
    fontWeight: "medium",
    fontSize: "0.9rem",
    lineHeight: 1.2,
    textAlign: "left",
  }}
>
  Notifications
</Typography>


    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
         border: "1px solid #282828ff",
         borderRadius: 1.5,
         p: 1.5,
      }}
    >
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontWeight: 500,
        }}
      >
        Giveaway Result
      </Typography>
<IOSSwitch
  checked={result}
  onChange={(e) => setResult(e.target.checked)}
/>
    </Box>
</Box>
      <Typography
        sx={{
          mb: 3,
          color: "#888",
          fontSize: "0.7rem",
          lineHeight: 1.5,
          textAlign: "left",
          maxWidth: 350,
          mx: "auto",
        }}
      >
Turn this off if you don’t want to notify participants in the channel when the giveaway ends.      </Typography>
    </Box>
  );
}
