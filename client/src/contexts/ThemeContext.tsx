import { createContext, useState, ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";

import lightTheme from "../themes/lightTheme";
import darkTheme from "../themes/darkTheme";

interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

/*
  TODO: Get the theme from local storage or from the user's preferences somehow.
*/

const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  toggleTheme: () => {},
});

const CustomThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, CustomThemeProvider };
