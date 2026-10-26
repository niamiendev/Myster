import useThemes from '@/hook/useThemes';
import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

type Props = ViewProps & {
  padding? : number;
  justifyContent? :ViewStyle["justifyContent"];
  width? :string;
  backgroundColor? :string;
  gap? :number;
  children: ReactNode;
}

const XRow = (
  {
    children, padding, justifyContent, width, backgroundColor, gap, ...rest
  }: Props
) => {
  const { colors } = useThemes()
  return (
    <View {...rest} style={[styles.container, { padding, gap, justifyContent,  width, backgroundColor}]}>
      {children}
    </View>
  )
}

export default XRow

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent"
  }
})