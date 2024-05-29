'use client'

import { ThemeContext } from "@/shared/contexts/ThemeContext";
import { WbSunny, Nightlight } from "@mui/icons-material";
import { IconButton, SvgIcon } from "@mui/joy";
import { useContext, useEffect, useState } from "react";

export default function ThemeToggle({ ...props }) {
  const [joymode, setJoymode] = useState("light");
  const [confirmaDark, setConfirmaDark] = useState(true);
  const { mode, toggleMode } = useContext(ThemeContext);
  useEffect(() => {
    const joymode = localStorage.getItem("joy-mode");
    joymode && setJoymode(joymode);
  }, [toggleMode, joymode]);
  if (typeof window !== "undefined") {
      if (joymode === "dark" && confirmaDark === true) {
        toggleMode()
        setConfirmaDark(false);
      }
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      color="primary"
      sx={{ p: 0.5 }}
      onClick={() => { toggleMode(); setJoymode(joymode === "light" ? "dark" : "light"); }}
      {...props}
    >
      <SvgIcon component={joymode == 'light' ? WbSunny : Nightlight} />
    </IconButton>
  );
}
