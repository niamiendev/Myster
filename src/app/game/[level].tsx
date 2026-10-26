
import XButton from '@/components/XButton'
import XCard from '@/components/XCard'
import XColumn from '@/components/XColumn'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import useThemes from '@/hook/useThemes'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

const Game = () => {

    const { colors } = useThemes()
    const router = useRouter()
    const { level } = useLocalSearchParams<{ level: string }>()

    const [volume, setVolume] = useState(true)
    const [playerNumber, setPlayerNumber] = useState('')
    const [message, setMessage] = useState('Devinez le nombre')
    const [lastGuess, setLastGuess] = useState<number | null>(null)
    const [attempts, setAttempts] = useState(0)
    const [elapsedSeconds, setElapsedSeconds] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    // Déterminer le niveau
    const max = level === '1' ? 50 : level === '2' ? 100 : 1000

    const levelMessage =
        level === '1' ? 'Facile' : level === '2' ? 'Moyen' : 'Difficile'

    // Générer le nombre mystère
    const [maggic, setMaggic] = useState(
        () => Math.floor(Math.random() * max) + 1
    )
    useEffect(() => {
        if (gameOver) return

        const interval = setInterval(() => {
            setElapsedSeconds((seconds) => seconds + 1)
        }, 1000)

        return () => clearInterval(interval)
    }, [gameOver])

    useEffect(() => {
        setMaggic(Math.floor(Math.random() * max) + 1)
        setPlayerNumber('')
        setLastGuess(null)
        setAttempts(0)
        setMessage('Devinez le nombre')
    }, [max])

    const formattedTime = `${Math.floor(elapsedSeconds / 60)
        .toString()
        .padStart(2, '0')}:${(elapsedSeconds % 60)
            .toString()
            .padStart(2, '0')}`

    const navigateToHome = () => {
        router.navigate('/')
    }

    const toggleVolume = () => {
        setVolume(current => !current)
    }
    const restartGame = () => {
        setMaggic(Math.floor(Math.random() * max) + 1)
        setPlayerNumber('')
        setMessage('Devinez le nombre')
        setLastGuess(null)
        setAttempts(0)
        setElapsedSeconds(0)
        setGameOver(false)
    }

    // Vérifier la proposition
    const handleCalcul = () => {
        if (gameOver) return

        if (playerNumber.trim() === '') {
            setMessage('Saisissez un nombre')
            return
        }

        const player = Number(playerNumber)

        if (!Number.isInteger(player) || player < 1 || player > max) {
            setMessage(`Saisissez un nombre entre 1 et ${max}`)
            return
        }

        const nextAttempts = attempts + 1

        setLastGuess(player)
        setAttempts(nextAttempts)
        setPlayerNumber('')

        if (player === maggic) {
            setMessage('Bravo, le nombre est trouvé !')

            router.replace({
                pathname: '/win',
                params: {
                    number: String(maggic),
                    attempts: String(nextAttempts),
                    level: String(level),
                    time: String(elapsedSeconds),
                },
            })

            return
        }

        if (nextAttempts >= 10) {
            setGameOver(true)
            setMessage(`Partie terminée ! Le nombre était ${maggic}`)
            return
        }

        if (player > maggic) {
            setMessage('Le nombre proposé est trop grand')
        } else {
            setMessage('Le nombre proposé est trop petit')
        }
    }

    // Gérer les touches du clavier
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '⌫']

    const handleKeyPress = (key: string) => {
        if (key === 'C') {
            setPlayerNumber('')
            return
        }

        if (key === '⌫') {
            setPlayerNumber(current => current.slice(0, -1))
            return
        }

        setPlayerNumber(current => {
            if (current.length >= String(max).length) return current

            // Éviter les zéros inutiles au début
            if (current === '0') return key

            return current + key
        })
    }

    const iconName =
        lastGuess === null
            ? 'help-circle-outline'
            : lastGuess > maggic
                ? 'arrow-down-outline'
                : lastGuess < maggic
                    ? 'arrow-up-outline'
                    : 'checkmark-outline'

    return (
        <XScreen>
            {/* En-tête */}
            <XRow justifyContent="space-between" width="100%">
                <XRow gap={8}>
                    <XCard padding={8}>
                        <XText title="#" color={colors.primary} />
                    </XCard>
                    <XText title="Partie en cours" fontWeight="bold" />
                </XRow>
                <TouchableOpacity onPress={toggleVolume} activeOpacity={0.6}>
                    <Ionicons
                        name={volume ? 'volume-high-outline' : 'volume-mute-outline'}
                        size={24}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </XRow>

            {/* Niveau et record */}
            <XRow justifyContent="space-between" width="100%">
                <XCard paddingHorizontal={8} borderRadius={16}>
                    <XText title={`${levelMessage} : 1 - ${max}`} fontSize={12} />
                </XCard>

                <XRow gap={8}>
                    <Ionicons name="trophy-outline" size={12} color={colors.primary} />
                    <XText title="Essais : record à venir" fontSize={12} />
                </XRow>
            </XRow>

            {/* Statistiques */}
            <XRow width="100%" justifyContent="space-between" gap={8}>
                <XCard width="32%" borderRadius={12} padding={8}>
                    <XColumn gap={4}>
                        <XText title="ESSAIS" />
                        <XText title={String(attempts)} fontWeight="bold" fontSize={18} />
                    </XColumn>
                </XCard>

                <XCard width="32%" borderRadius={12} padding={8}>
                    <XColumn gap={4}>
                        <XText title="CHRONO" />
                        <XText
                            title={formattedTime}
                            fontWeight="900"
                            fontSize={18}
                            color={colors.primary}
                        />
                    </XColumn>
                </XCard>

                <XCard width="32%" borderRadius={12} padding={8}>
                    <XColumn gap={4}>
                        <XText title="RESTANTS" />
                        <XText title={String(Math.max(0, 10 - attempts))} fontWeight="bold" fontSize={18} />
                    </XColumn>
                </XCard>
            </XRow>

            {/* Coffre et indication */}
            <XColumn gap={8} width="100%">
                <XCard padding={16} borderRadius={12}>
                    <XColumn gap={8}>
                        <XRow width="100%" justifyContent="space-between">
                            <XRow gap={8}>
                                <Ionicons name="lock-closed-outline" size={16} color={colors.text} />
                                <XText title="Coffre scellé" />
                            </XRow>

                            <XText title={`Intervalle [1 - ${max}]`} />
                        </XRow>

                        <XCard padding={16} paddingHorizontal={40} backgroundColor={colors.background}>
                            <XText
                                title={
                                    gameOver || lastGuess === maggic
                                        ? String(maggic)
                                        : '? ? ?'
                                }
                                fontSize={32}
                                fontWeight="900"
                                color={gameOver ? '#EF4444' : colors.text}
                            />
                        </XCard>

                        <XText title={`Trouver le nombre entre 1 et ${max}`} />
                    </XColumn>
                </XCard>

                <XCard padding={12} borderRadius={12}>
                    <XRow width="100%" justifyContent="space-between" gap={8}>
                        <XRow gap={12}>
                            <XCard padding={6} backgroundColor="#4d4b4bb6" borderRadius={4}>
                                <Ionicons name={iconName} size={16} color={colors.primary} />
                            </XCard>

                            <XText title={message} />
                        </XRow>

                        <XCard backgroundColor="#4d4b4bb6" paddingHorizontal={8} borderRadius={4}>
                            <XText
                                title={lastGuess === null ? '--' : String(lastGuess)}
                                color={colors.primary}
                            />
                        </XCard>
                    </XRow>
                </XCard>

                {/* Nombre saisi */}
                <XCard width="100%" borderRadius={12} padding={8}>
                    <XText
                        title={playerNumber || '0'}
                        color={colors.text}
                        fontWeight="900"
                        fontSize={45}
                    />
                </XCard>
            </XColumn>

            {/* Clavier numérique */}
            <FlatList
                data={keys}
                numColumns={3}
                keyExtractor={item => item}
                scrollEnabled={false}
                columnWrapperStyle={styles.keyRow}
                contentContainerStyle={styles.keyboard}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.keyButton}
                        activeOpacity={0.6}
                        onPress={() => handleKeyPress(item)}
                    >
                        <XCard
                            width="100%"
                            padding={12}
                            borderRadius={12}
                            backgroundColor={colors.card}
                        >
                            <XText
                                title={item}
                                fontSize={18}
                                fontWeight="bold"
                                color={colors.text}
                            />
                        </XCard>
                    </TouchableOpacity>
                )}
            />

            {/* Validation */}
            {!gameOver && (
                <XButton
                    backgroundColor={colors.primary}
                    onPress={handleCalcul}
                >
                    <XRow padding={16} gap={8}>
                        <XText
                            title="DEVINER"
                            color="#000"
                            fontWeight="bold"
                        />
                        <Ionicons name="checkmark-done-outline" size={24} />
                    </XRow>
                </XButton>
            )}
            {gameOver && (
                <XButton
                    backgroundColor={colors.primary}
                    onPress={restartGame}
                >
                    <XRow padding={16} gap={8}>
                        <Ionicons name="refresh-outline" size={24} />
                        <XText
                            title="RÉESSAYER"
                            color="#000"
                            fontWeight="bold"
                        />
                    </XRow>
                </XButton>
            )}
        </XScreen>
    )
}

export default Game

const styles = StyleSheet.create({
    keyboard: {
        gap: 8,
    },
    keyRow: {
        justifyContent: 'space-between',
        gap: 8,
    },
    keyButton: {
        width: '31%',
    },
})
