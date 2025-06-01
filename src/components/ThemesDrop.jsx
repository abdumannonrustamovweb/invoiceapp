import { Button } from "./ui/button";
import { useEffect, useState } from "react";

function ThemesDrop() {
  const [dark, setDark] = useState(() => {
    const updTheme = localStorage.getItem("theme");
    if (updTheme) {
      document.documentElement.dataset.theme = updTheme;
      return updTheme.startsWith("dark-");
    }
    return document.documentElement.dataset.theme.startsWith("dark-");
  });

  function themeMode() {
    setDark((prev) => !prev);
  }

  useEffect(() => {
    if (dark) {
      document.documentElement.dataset.theme = "dark-violet";
      localStorage.setItem("theme", "dark-violet");
    } else {
      document.documentElement.dataset.theme = "violet";
      localStorage.setItem("theme", "violet");
    }
  }, [dark]);

  if (dark) {
    return (
      <Button
        onClick={themeMode}
        className="rounded-2xl"
        variant="ghost"
        aria-label="Toggle"
      >
        <img src="./image/DarkMode.svg" alt="dark" width={20} height={20} />
      </Button>
    );
  } else {
    return (
      <Button
        onClick={themeMode}
        className="rounded-2xl"
        variant="ghost"
        aria-label="Toggle"
      >
        <img src="./image/LinghtMode.svg" alt="light" width={20} height={20} />
      </Button>
    );
  }
}

export default ThemesDrop;
