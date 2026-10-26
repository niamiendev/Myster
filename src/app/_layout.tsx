import { ThemesProvider } from "@/context/themesContext";
import useThemes from "@/hook/useThemes";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

function RootNavigator() {
  const { theme, colors } = useThemes()

  return (
    <>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
      />
      <Stack
        screenOptions={
          {
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background
            }
          }
        }
      >
      <Stack.Screen name="index" />
      <Stack.Screen name="game/[level]" />
      <Stack.Screen name="win" />
      <Stack.Screen name="(tab)" />
      </Stack>
       
    </>
  )
}


export default function RootLayout() {

  return (
    <ThemesProvider>
      <RootNavigator></RootNavigator>
    </ThemesProvider>
  )
}
