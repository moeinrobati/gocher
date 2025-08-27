import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StepTerms from "../components/StepTerms";
import StepConfirmation from "../components/StepConfirmation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function CreatePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const steps = ["Gift selection", "Terms", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(0);

  // 🎯 ذخیره کاربر بلافاصله با Login Widget یا Mini App initData
  useEffect(() => {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    const userData = tg.initDataUnsafe?.user;

    if (userData) {
      setUser(userData); // فقط برای وضعیت React
      console.log("Mini App User:", userData);

      // ذخیره در Supabase
      const saveUser = async () => {
        try {
          const { data, error } = await supabase
            .from("users")
            .upsert(
              {
                id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                username: userData.username,
                photo_url: userData.photo_url,
                is_premium: userData.is_premium,
                language_code: userData.language_code,
                allows_write_to_pm: userData.allows_write_to_pm,
              },
              { onConflict: "id" }
            );

          if (error) throw error;
          console.log("Saved to Supabase:", data);
        } catch (err) {
          console.error("Supabase insert error:", err.message);
        }
      };

      saveUser();
    }
  }
}, []);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      router.replace(`/create?step=${nextStep}`, undefined, { shallow: true });
    } else {
      window.location.href = "https://t.me/G";
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      router.replace(`/create?step=${prevStep}`, undefined, { shallow: true });
    }
  };

  return (
    <Box
      sx={{
        p: 1.5,
        color: "white",
        minHeight: "100vh",
        bgcolor: "#121212",
        maxWidth: 700,
        mx: "auto",
        pb: 10,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        {currentStep > 0 && currentStep !== 2 && (
          <IconButton onClick={handleBack} sx={{ color: "#19b3d2ff", mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="h3" gutterBottom>
          Creating giveaway
        </Typography>
      </Box>

      {/* Stepper */}
      <Box sx={{ position: "relative", height: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between", px: 4, mt: 3.5, mb: 3 }}>
        <Box sx={{ position: "absolute", top: "32px", left: "8%", right: "8%", height: 4, bgcolor: "#888", borderRadius: 2, zIndex: 0 }}>
          <Box sx={{ height: "100%", width: `${(currentStep / (steps.length - 1)) * 100}%`, bgcolor: "#00f2ffff", transition: "width 0.4s ease" }} />
        </Box>

        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          return (
            <Box key={index} sx={{ position: "absolute", left: index === 0 ? "8%" : index === 1 ? "50%" : "92%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 1 }}>
              <Typography variant="caption" sx={{ mb: 1, fontSize: "0.75rem", color: isActive ? "#19b3d2ff" : "#888", fontWeight: isActive ? "bold" : "normal" }}>
                {step}
              </Typography>
              <Box sx={{ width: 16, height: 16, borderRadius: "50%", bgcolor: isActive ? "#19b3d2ff" : "#888" }} />
            </Box>
          );
        })}
      </Box>

      {/* Step content */}
      {currentStep === 0 && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <img src="/animations/gift.gif" alt="Gift animation" style={{ width: 190, height: 135, borderRadius: 16 }} />

          <Button
            variant="contained"
            onClick={() => (window.location.href = "https://t.me/Gocherbot")}
            sx={{
              mt: 3,
              borderRadius: 2,
              width: 280,
              bgcolor: "#757575",
              color: "white",
              position: "relative",
              overflow: "hidden",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#9e9e9e" },
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-75%",
                width: "50%",
                height: "100%",
                background: "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)",
                transform: "skewX(-20deg)",
                animation: "shiny 1.5s infinite",
              },
              "@keyframes shiny": { "0%": { left: "-75%" }, "100%": { left: "125%" } },
            }}
          >
            Add Gift
          </Button>

          <Typography sx={{ mt: 2, color: "#bbb", fontSize: "0.9rem", maxWidth: 320, mx: "auto" }}>
            Send collectible gifts to @Gocherbot, then select one or more below to include in your giveaway.
          </Typography>

          <Box sx={{ mt: 5, px: 3, py: 2.5, borderRadius: 2, border: "1px solid #666", bgcolor: "#2c2c2c", color: "#ccc" }}>
            <Typography variant="body2" sx={{ fontSize: "0.9rem", textAlign: "center" }}>
              Your Gifts will appear here
            </Typography>
          </Box>
        </Box>
      )}

      {currentStep === 1 && <StepTerms gift="terms" onNext={handleNextStep} />}
      {currentStep === 2 && <StepConfirmation gift="confirm" onNext={handleNextStep} />}

      {/* Bottom Button fixed */}
      <Box sx={{ position: "fixed", bottom: 65, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 10 }}>
        <Button
          variant="contained"
          onClick={handleNextStep}
          sx={{ width: 400, height: 40, borderRadius: 3, fontWeight: "bold", fontSize: "1rem", bgcolor: "#19b3d2ff", color: "white", "&:hover": { bgcolor: "#118893ff" } }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
