import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import { DataTable } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux"
import { RootStackParamList } from "src/App"
import { RootState } from "src/redux/store"
import { resetErrorStats, resetSuccessStats } from "./pinSlice"

type Props = NativeStackScreenProps<RootStackParamList, "Unlocked">

const StatsScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch()

  // Error Info
  const numErrors = useSelector((state: RootState) => state.numErrors)
  const numRandomLayoutErrors = useSelector(
    (state: RootState) => state.numRandomLayoutErrors,
  )
  const numNormalLayoutErrors = useSelector(
    (state: RootState) => state.numNormalLayoutErrors,
  )

  // Success Info
  const numSuccess = useSelector((state: RootState) => state.numSuccess)
  const numRandomLayoutSuccess = useSelector(
    (state: RootState) => state.numRandomLayoutSuccess,
  )
  const numNormalLayoutSuccess = useSelector(
    (state: RootState) => state.numNormalLayoutSuccess,
  )

  return (
    <View style={styles.container}>
      <View>
        <Text>Error Stats</Text>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title numeric>Total Errors</DataTable.Title>
            <DataTable.Title numeric>Errors (Random)</DataTable.Title>
            <DataTable.Title numeric>Errors (Normal)</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell numeric>{numErrors}</DataTable.Cell>
            <DataTable.Cell numeric>{numRandomLayoutErrors}</DataTable.Cell>
            <DataTable.Cell numeric>{numNormalLayoutErrors}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={styles.buttonStyle}>
          <Button
            title="Reset Error Stats"
            onPress={() => {
              dispatch(resetErrorStats())
            }}
          />
        </View>
      </View>

      <View
        style={{
          paddingTop: 30,
        }}
      >
        <Text>Success Stats</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title numeric>Total Success</DataTable.Title>
            <DataTable.Title numeric>Success (Random)</DataTable.Title>
            <DataTable.Title numeric>Success (Normal)</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell numeric>{numSuccess}</DataTable.Cell>
            <DataTable.Cell numeric>{numRandomLayoutSuccess}</DataTable.Cell>
            <DataTable.Cell numeric>{numNormalLayoutSuccess}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>

        <View style={styles.buttonStyle}>
          <Button
            title="Reset Success Stats"
            onPress={() => {
              dispatch(resetSuccessStats())
            }}
          />
        </View>
      </View>

      <View style={styles.buttonStyle}>
        <Button
          title="Go Back"
          onPress={() => {
            navigation.goBack()
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 5,
  },
  buttonStyle: {
    padding: 50,
  },
})

export default StatsScreen
