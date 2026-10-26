import XCard from '@/components/XCard'
import XRow from '@/components/XRow'
import XScreen from '@/components/XScreen'
import XText from '@/components/XText'
import useThemes from '@/hook/useThemes'
import { StyleSheet, Switch } from 'react-native'

const Setting = () => {

  const { theme, colors, toggleTheme } = useThemes()
  const isEnabled = theme === 'dark' ? true : false

  return (
    <XScreen  >
      {/** header */}
      <XRow justifyContent="space-between" width="100%">
        <XRow gap={8}>
          <XCard padding={8}>
            <XText title="#" color={colors.primary} />
          </XCard>
          <XText title="Paramètre" fontWeight={"bold"} />
        </XRow>
      </XRow>
      <XCard width='100%' borderRadius={16}>
        <XRow justifyContent='space-between' width='100%' padding={12}>
          <XText title={`${theme}`} />
          <Switch
            trackColor={{ false: colors.textSecondary, true: colors.card }}
            thumbColor={isEnabled ? colors.primary : '#f4f3f4'}
            ios_backgroundColor={colors.textSecondary}
            value={
              isEnabled
            }
            onChange={toggleTheme}
          />
        </XRow>

      </XCard>
    </XScreen>
  )
}

export default Setting

const styles = StyleSheet.create({})