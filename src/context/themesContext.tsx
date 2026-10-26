
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { colors } from "@/utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Mode = "light" | "dark";

type ThemeType = {
  theme: Mode;
  colors: typeof colors[Mode];
  toggleTheme: () => void;
};

type Props = {
  children: ReactNode;
};

const THEME_KEY = "THEME";

export const ThemesContext = createContext<ThemeType | null>(null);

export const ThemesProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Mode>("light");

  // Charger le thème enregistré
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const data = await AsyncStorage.getItem(THEME_KEY);

        if (data === "light" || data === "dark") {
          setTheme(data);
        }
      } catch (error) {
        console.log("Erreur lors du chargement du thème :", error);
      } 
    };

    loadTheme();
  }, []);

  // Changer et sauvegarder le thème
  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const newTheme: Mode =
        currentTheme === "light" ? "dark" : "light";

      AsyncStorage.setItem(THEME_KEY, newTheme).catch((error) => {
        console.error("Erreur lors de la sauvegarde du thème :", error);
      });

      return newTheme;
    });
  }, []);

  return (
    <ThemesContext.Provider
      value={{
        theme,
        colors: colors[theme],
        toggleTheme,
      }}
    >
      {children}
    </ThemesContext.Provider>
  );
};
