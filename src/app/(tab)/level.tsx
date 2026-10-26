import XButton from '@/components/XButton'
import XCard from '@/components/XCard'
import XColumn from '@/components/XColumn'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import useThemes from '@/hook/useThemes'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { ComponentProps, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'


type Level = {
  id: number;
  title: string;
  description: string;
  icon: ComponentProps<typeof Ionicons>["name"];
  level: string;
  recommended?: string;
};

const data: Level[] = [
  {
    id: 1,
    title: "Facile",
    description: "Idéal pour s'échauffer et faire des parties rapides.",
    icon: "leaf-outline",
    level: "1 à 50"
  },
  {
    id: 2,
    title: "Moyen",
    description: "Le défi classique et équilibré pour tester ta logique.",
    icon: "flame-outline",
    level: "1 à 100",
    recommended: "Recommandé"
  },
  {
    id: 3,
    title: "Difficile",
    description: "Pour les maîtres de la déduction et de la dichotomie.",
    icon: "trophy-outline",
    level: "1 à 1000",
  },
];


const Level = () => {

  const { colors } = useThemes();
  const router = useRouter();

  const [level, setLevel] = useState(2);
  const [volume, setVolume] = useState(true);

  const navigateToHome = () => {
    router.navigate("/");
  };

  const toggleVolume = () => {
    setVolume((current) => !current);
  };

  const handleLevel = (newLevel: number) => {
    setLevel(newLevel);
  };

  const navigateToGame = () => {
    router.navigate({
      pathname: "/game/[level]",
      params: { level: String(level) },
    });
  };


  return (
    <XScreen>
      {/** header */}
      <XRow justifyContent="space-between" width="100%">
        <XRow gap={8}>
          <XCard padding={8}>
            <XText title="#" color={colors.primary} />
          </XCard>
          <XText title="Choix De Difficulté" fontWeight={"bold"} />
        </XRow>
        <TouchableOpacity onPress={toggleVolume} activeOpacity={.6}>
          <Ionicons name={volume ? "volume-high-outline" : "volume-mute-outline"} size={24} color={colors.text} />
        </TouchableOpacity>
      </XRow>

      <XText title="Sélectionne la plage de nombres pour cailibrer ta partie." />
      {/** liste */}

      <FlatList
        data={data}
        ItemSeparatorComponent={
          () => (
            <View style={{ height: 18 }} ></View>
          )
        }
        renderItem={
          ({ item }) =>
          (
            <TouchableOpacity activeOpacity={.2} key={item.id}
              onPress={
                () => {
                  handleLevel(item.id)
                }
              }>
              <XCard padding={16} borderRadius={16}
                backgroundColor={level === item.id ? "#dedcdc62" : colors.card}

              >
                <XColumn alignItems='flex-start' gap={8}>
                  {
                    item.recommended && <XCard backgroundColor={colors.primary} borderRadius={16} padding={4}>
                      <XRow gap={8}>
                        <Ionicons name="star-outline" size={16} color="black" />
                        <XText title='Recommandé' color="black" fontSize={12} />
                      </XRow>
                    </XCard>
                  }

                  <XRow gap={12} width='100%' justifyContent='space-between'>
                    <XRow gap={12}>
                      <XCard backgroundColor={colors.primary} padding={8} borderRadius={8}>
                        <Ionicons name={item.icon} size={18} color="black" />
                      </XCard>
                      <XColumn alignItems='flex-start' gap={4}>
                        <XText title={item.title} fontSize={24} fontWeight={"700"} />
                        <XText title={item.level} />
                      </XColumn>
                    </XRow>
                    {
                      level === item.id ?
                        <Ionicons name="radio-button-on-outline" size={24} color={colors.primary} />
                        :
                        <Ionicons name="radio-button-off-outline" size={24} color={colors.primary} />
                    }
                  </XRow>
                  <XText title={item.description} color={colors.textSecondary} />

                </XColumn>
              </XCard>
            </TouchableOpacity>
          )
        }
      />
      <XButton backgroundColor={colors.primary} onPress={navigateToGame}>
        <XRow padding={16} gap={8}>
          <XText title="COMMENCER" color="#000" fontWeight={"bold"} />
          <Ionicons name="arrow-forward-outline" size={24} />
        </XRow>
      </XButton>


    </XScreen>
  )
}

export default Level

const styles = StyleSheet.create({})