// src/pages/create.jsx
import { useEffect, useState } from "react";
import { isTMA, retrieveLaunchParams, postEvent, on, mockTelegramEnv } from "@telegram-apps/bridge";
import StepTerms from "../components/StepTerms";
import StepConfirmation from "../components/StepConfirmation";

export default function CreatePage() {
  const [params, setParams] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!isTMA()) {
        mockTelegramEnv(); // فقط تست محلی
      }

      const launchParams = retrieveLaunchParams(true);
      setParams(launchParams);

      postEvent("web_app_setup_back_button", { is_visible: true });
      const off = on("back_button_pressed", () => {
        console.log("کاربر Back زد");
        postEvent("web_app_setup_back_button", { is_visible: false });
        off();
      });
    }
  }, []);

  return (
    <div>
      <h1>Create Giveaway</h1>
      {params ? <pre>{JSON.stringify(params, null, 2)}</pre> : "Loading..."}

      {/* نمونه استفاده از بقیه استپ‌ها */}
      <StepTerms />
      <StepConfirmation />
    </div>
  );
}
