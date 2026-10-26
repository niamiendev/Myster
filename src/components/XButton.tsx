import useThemes from '@/hook/useThemes';
import { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & {
    backgroundColor?: string;
    color?: string;
    onPress?: () => void;
    children: ReactNode
}

const XButton = (
    { children, onPress, backgroundColor , ...rest }: Props
) => {
    const { colors } = useThemes()
    return (
        <TouchableOpacity
        onPress={onPress}
            activeOpacity={.6}
            {...rest} style={[styles.container, { backgroundColor }]} >
            {children}
        </TouchableOpacity>
    )
}

export default XButton

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: 16,
    }
})