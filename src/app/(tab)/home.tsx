import XButton from "@/components/XButton"
import XCard from "@/components/XCard"
import XColumn from "@/components/XColumn"
import XRow from "@/components/XRow"
import XScreen from "@/components/XScreen"
import XText from "@/components/XText"
import useThemes from "@/hook/useThemes"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native"

function Home() {
  const { colors } = useThemes()
  const router = useRouter()

  const navigateToSetting = () => {
    router.navigate("/(tab)/setting")
  }
  const navigateToLevel = () => {
    router.navigate("/(tab)/level")
  }
  const [showRules, setShowRules] = useState(false)

  return (
    <XScreen>
      {/** header */}
      <XRow justifyContent="space-between" width="100%">
        <XRow gap={8}>
          <XCard padding={8}>
            <XText title="#" color={colors.primary} />
          </XCard>
          <XText title="Accueil" fontWeight={"bold"} />
        </XRow>
        <TouchableOpacity onPress={navigateToSetting} activeOpacity={.6}>
          <Ionicons name="settings-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </XRow>

      {/** best score */}


      {/** title */}
      <XColumn gap={4}>
        <XText title="NOMBRE MYSTÈRE" fontSize={28} fontWeight={"bold"} />
        <XText title="A toi de trouver le nombre secret" />
      </XColumn>

      {/** big card */}
      <XCard width="100%" padding={16} borderRadius={16}>
        <XColumn gap={50} >
          <XRow width="100%" justifyContent="space-between">
            <XText title="7" color={colors.textTernary} fontSize={24} />
            <XText title="42" color={colors.textTernary} fontSize={24} />
          </XRow>
          <XRow width="100%">
            <XText title="?" color={colors.text} fontSize={48} fontWeight={"900"} />
          </XRow>
          <XRow width="100%" justifyContent="space-between" >
            <XText title="9" color={colors.textTernary} fontSize={24} />
            <XText title="48" color={colors.textTernary} fontSize={24} />
          </XRow>
        </XColumn>
      </XCard>

      {/** stat */}
      <XRow gap={8}>
        <XCard width="50%" borderRadius={12} alignItems="flex-start" padding={16}>
          <XColumn alignItems="flex-start" gap={4}>
            <XRow gap={8} >
              <Ionicons name="stats-chart-outline" size={18} color={colors.text} />
              <XText title="Parties gagnées" color={colors.text} />
            </XRow>
            
          </XColumn>
        </XCard>
        <XCard width="50%" borderRadius={12} alignItems="flex-start" padding={16}>
          <XColumn alignItems="flex-start" gap={4} >
            <XRow gap={8} >
              <Ionicons name="pie-chart-outline" size={18} color={colors.text} />
              <XText title="Série en cours" color={colors.text} />
            </XRow>
            
          </XColumn>
        </XCard>
      </XRow>

      {/** bouton */}
      <XColumn gap={8} width="100%">
        <XButton backgroundColor={colors.primary} onPress={navigateToLevel}>
          <XRow padding={16} gap={8}>
            <Ionicons name="play" size={24} />
            <XText title="JOUER" color="#000" />
          </XRow>
        </XButton>
        <XButton
          backgroundColor={colors.card}
          onPress={() => setShowRules(true)}
        >
          <XRow padding={16} gap={8}>
            <Ionicons
              name="information-circle-outline"
              size={24}
              color={colors.text}
            />
            <XText title="Comment jouer ?" color={colors.text} />
          </XRow>
        </XButton>
      </XColumn>
      <Modal
        visible={showRules}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRules(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Fond sombre : cliquer dessus ferme la fenêtre */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowRules(false)}
          />

          {/* Contenu du Bottom Sheet */}
          <View
            style={[
              styles.bottomSheet,
              { backgroundColor: colors.background },
            ]}
          >
            <XRow justifyContent="space-between" width="100%">
              <XText title="Comment jouer ?" fontSize={20} fontWeight="bold" />

              <TouchableOpacity
                onPress={() => setShowRules(false)}
                activeOpacity={0.6}
              >
                <Ionicons name="close" size={26} color={colors.text} />
              </TouchableOpacity>
            </XRow>

            <XCard width="100%" padding={24} borderRadius={16}>
              <XColumn alignItems="flex-start" gap={16}>
                <XRow gap={12} >
                  <Ionicons name="game-controller-outline" size={18} color={colors.primary} />
                  <XColumn alignItems="flex-start" gap={4} >
                    <XText title="1. Choisis ton niveau" fontWeight="bold" />
                    <XText title="Sélectionne la difficulté de ta partie." color={colors.textTernary} />
                  </XColumn>
                </XRow>

                <XRow gap={12} >
                  <Ionicons name="help-circle-outline" size={18} color={colors.primary} />
                  <XColumn alignItems="flex-start" gap={4} >
                    <XText title="2. Devine le nombre secret" fontWeight="bold" />
                    <XText title="Saisis un nombre à l'aide du clavier numérique." color={colors.textTernary} />
                  </XColumn>
                </XRow>

                <XRow gap={12} >
                  <Ionicons name="swap-vertical-outline" size={18} color={colors.primary} />
                  <XColumn alignItems="flex-start" gap={4} >
                    <XText title="3. Suis les indices" fontWeight="bold" />
                    <XText title="La flèche vers le haut signifie que le nombre secret est plus grand. La flèche vers le bas signifie qu'il est plus petit." color={colors.textTernary} />
                  </XColumn>
                </XRow>

                <XRow gap={12} >
                  <Ionicons name="trophy-outline" size={18} color={colors.primary} />
                  <XColumn alignItems="flex-start" gap={4} >
                    <XText title="4. Remporte la partie" fontWeight="bold" />
                    <XText title="Trouve le bon nombre et célèbre ta victoire !" color={colors.textTernary} />
                  </XColumn>
                </XRow>
              </XColumn>
            </XCard>

            <XButton
              backgroundColor={colors.primary}
              onPress={() => setShowRules(false)}
            >
              <XRow padding={14} justifyContent="center">
                <XText title="J'ai compris" color="#000" fontWeight="bold" />
              </XRow>
            </XButton>
          </View>
        </View>
      </Modal>
    </XScreen>
  )
}

export default Home

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    padding: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 20,
  },
})