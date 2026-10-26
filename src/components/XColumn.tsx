import useThemes from '@/hook/useThemes';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

type Props = ViewProps & {
  width?: string;
  alignItems?: ViewStyle["alignItems"];
  gap?:number;
  height?:number;
  children: ReactNode
}

const XColumn = (
  {
    width, height, gap, children, alignItems = "center", ...rest
  }: Props
) => {
  const { colors } = useThemes()
  return (
    <View {...rest} style={
      [
        styles.container, { alignItems, width, height, gap }
      ]
    }>
      {children}
    </View>
  )
}

export default XColumn

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent"
  }
})