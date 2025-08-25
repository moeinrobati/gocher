import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-web";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useRouter } from "next/router";

export default function AnimatedTabBarPro() {
  const [value, setValue] = useState(1); // Create = index 1
  const refs = [useRef(null), useRef(null), useRef(null)];
  const animationInstances = useRef([]);
  const stopTimeout = useRef(null);
  const router = useRouter();

  const animations = ["/active.json", "/create.json", "/history.json"];
  const paths = ["/active", "/create", "/history"];

  // Sync value with current router path
  useEffect(() => {
    if (!router.isReady) return; // صبر کن تا router آماده باشه
    const currentIndex = paths.indexOf(router.pathname);
    if (currentIndex !== -1) setValue(currentIndex);
  }, [router.isReady, router.pathname]);

  const changeStrokeColor = (container) => {
    const svg = container?.querySelector("svg");
    if (!svg) return;
    svg.querySelectorAll("[stroke]").forEach((el) => {
      el.setAttribute("stroke", "#FFFFFF");
    });
  };

  const loadAnimation = (index, loop = false, autoplay = false) => {
    const container = refs[index].current;
    if (!container) return;

    if (animationInstances.current[index]) {
      animationInstances.current[index].destroy();
    }

    animationInstances.current[index] = Lottie.loadAnimation({
      container,
      renderer: "svg",
      loop,
      autoplay,
      path: animations[index],
    });

    animationInstances.current[index].addEventListener("DOMLoaded", () => {
      changeStrokeColor(container);
    });
  };

  // Load Lottie animations on mount
  useEffect(() => {
    refs.forEach((_, index) => {
      loadAnimation(index, false, false);
    });
  }, []);

  // Play/stop animations based on selected tab
  useEffect(() => {
    if (stopTimeout.current) clearTimeout(stopTimeout.current);

    animationInstances.current.forEach((anim, index) => {
      if (!anim) return;
      if (index === value) {
        anim.goToAndPlay(0, true);
        if (index === 0) {
          stopTimeout.current = setTimeout(() => {
            anim.goToAndStop(40, true);
          }, 2500);
        }
      } else {
        anim.stop();
        anim.goToAndStop(25, true);
      }
    });

    return () => {
      if (stopTimeout.current) clearTimeout(stopTimeout.current);
    };
  }, [value]);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    router.push(paths[newValue]); // Navigate با router
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "#121212",
        borderTop: "1px solid #222",
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        showLabels
        sx={{
          backgroundColor: "#121212",
          ".Mui-selected": {
            color: "#FFF",
            fontWeight: "bold",
          },
          ".MuiBottomNavigationAction-root": {
            color: "#888",
          },
        }}
      >
        <BottomNavigationAction
          label="Active"
          icon={<div ref={refs[0]} style={{ width: 36, height: 36 }} />}
        />
        <BottomNavigationAction
          label="Create"
          icon={<div ref={refs[1]} style={{ width: 36, height: 36 }} />}
        />
        <BottomNavigationAction
          label="History"
          icon={<div ref={refs[2]} style={{ width: 36, height: 36 }} />}
        />
      </BottomNavigation>
    </Paper>
  );
}
