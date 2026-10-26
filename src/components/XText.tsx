import useThemes from '@/hook/useThemes';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';


type Props = TextProps & {
    title: string;
    color?: string;
    fontSize?: number;
    fontWeight?: TextStyle["fontWeight"];
}

const XText = (
    { title, color,fontWeight, fontSize, ...rest }: Props
) => {
    const { colors } = useThemes()

    return (
        <Text {...rest} style={
            [
                { color: color ? color : colors.text , fontSize, fontWeight },
            ]
        }
        >{title}</Text>
    )
}

export default XText

const styles = StyleSheet.create({

})