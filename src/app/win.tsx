import XButton from '@/components/XButton'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import useThemes from '@/hook/useThemes'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import LottieView from 'lottie-react-native'
import { useState } from 'react'
import { StyleSheet } from 'react-native'


const Win = () => {

    const { colors } = useThemes()
    const router = useRouter()
    const [volume, setVolume] = useState(true)

    const navigateToHome = () => {
        router.navigate('/')
    }
    const replayGame = () => {
        router.replace('/level')
    }

    const toggleVolume = () => {
        setVolume(current => !current)
    }

    return (
        <XScreen style={styles.screen}>
            {/* En-tête */}
            <LottieView
                source={require('../../assets/animations/trophy.json')}
                autoPlay
                loop={false}
                style={styles.animation}
            />
            {/* body */}
            <XText title="BRAVO, TU AS TROUVÉ !" fontWeight="bold" fontSize={18} />
            <XButton
                backgroundColor={colors.primary}
                onPress={replayGame}
            >
                <XRow padding={16} gap={8}>
                    <Ionicons name="refresh" size={24} />
                    <XText title="REJOUER" color="#000" />
                </XRow>
            </XButton>

            <XButton
                backgroundColor={colors.card}
                onPress={navigateToHome}
            >
                <XRow padding={16} gap={8}>
                    <Ionicons
                        name="home-outline"
                        size={24}
                        color={colors.text}
                    />
                    <XText title="Retour à l'accueil" color={colors.text} />
                </XRow>
            </XButton>

        </XScreen>
    )
}

export default Win

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        //alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 220,
        height: 220,
    },
});