
import useThemes from "@/hook/useThemes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { colors } = useThemes();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle:{
          backgroundColor:colors.background,
          //borderWidth:2,
          //borderColor:colors.primary
        },
        
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Jeu",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={
                focused
                  ? "game-controller"
                  : "game-controller-outline"
              }
              size={size}
              color={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="level"
        options={{
          title: "Niveaux",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-outline"}
              size={size}
              color={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={focused ? colors.primary : colors.textSecondary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
