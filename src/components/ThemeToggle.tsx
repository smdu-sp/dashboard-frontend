'use client'

import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { WbSunny, Nightlight } from "@mui/icons-material";
import { IconButton, SvgIcon } from "@mui/joy";
import { useContext, useEffect, useState } from "react";

export default function ThemeToggle({ ...props }) {
  const [joymode, setJoymode] = useState("light");
  const { mode, toggleMode } = useContext(ThemeContext);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const joymode = localStorage.getItem("joy-mode");
      console.log(joymode);
      setJoymode(joymode || "light");
    }    
  }, []);
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      color="primary"
      sx={{ p: 0.5 }}
      onClick={() => toggleMode()}
      {...props}
    >
      <SvgIcon component={joymode === 'light' ? WbSunny : Nightlight} />
    </IconButton>
  );
}
