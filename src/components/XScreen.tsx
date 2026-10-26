import useThemes from '@/hook/useThemes'
import { ReactNode } from 'react'
import { Platform, StyleSheet, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import XColumn from './XColumn'

type Props = ViewProps & {
  children: ReactNode
}

const XScreen = ({ children, style, ...props }: Props) => {
  const { colors } = useThemes()

  return (
    <SafeAreaView
      {...props}
      edges={['top', 'left', 'right', 'bottom']}
      style={[
        styles.container,
        { backgroundColor: colors.background },
        style,
      ]}
    >
      <XColumn
        gap={16}
        style={{
          //paddingTop: Platform.OS === 'android' ? 12 : 0,
        }}
      >
        {children}
      </XColumn>
    </SafeAreaView>
  )
}

export default XScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS ==='android' ? 16 : 0
  },
})