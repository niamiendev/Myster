import useThemes from '@/hook/useThemes';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

type Props = ViewProps & {
    padding?: number;
    paddingHorizontal?: number;
    backgroundColor?: string;
    borderRadius?: number;
    width?: string;
    height?:number;
    alignItems?: ViewStyle["alignItems"]
    children: ReactNode
}

const XCard = (
    { backgroundColor, alignItems = "center", width,height,paddingHorizontal,  padding = 0, borderRadius = 4, children, ...rest }: Props
) => {
    const { colors } = useThemes()
    return (
        <View
            {...rest} style={
                [
                    styles.container, {
                        backgroundColor: backgroundColor? backgroundColor : colors.card,
                        padding, borderRadius, width, height,
                        paddingHorizontal,
                        alignItems
                    }
                ]
            } >
            {children}
        </View>
    )
}

export default XCard

const styles = StyleSheet.create({
    container: {
        //justifyContent: "center",
        //alignItems: "center",
    }
})