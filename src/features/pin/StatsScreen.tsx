import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { DataTable } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { useDispatch, useSelector } from "react-redux"
import { RootStackParamList } from "src/App"
import { RootState } from "src/redux/store"
import {
  resetErrorStats,
  resetPinHistory,
  resetSuccessStats,
  resetTime,
} from "./pinSlice"

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

  // Time Data
  const totalTime = useSelector((state: RootState) => state.totalTimeTaken)
  const timeNormal = useSelector((state: RootState) => state.timeTakenNormal)
  const timeRandom = useSelector((state: RootState) => state.timeTakenRandom)

  // PIN History
  const pinList = useSelector((state: RootState) => state.pinList)
  const pinHistory = []

  for (let index = 0; index < pinList.length; ++index) {
    const element = pinList[index]

    const obj = {
      key: index,
      pin: element,
    }

    pinHistory.push(obj)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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

        <View>
          <Text>Time Taken (milliseconds)</Text>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title numeric>Total Time</DataTable.Title>
              <DataTable.Title numeric>Time (Random)</DataTable.Title>
              <DataTable.Title numeric>Time (Normal)</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell numeric>{totalTime}</DataTable.Cell>
              <DataTable.Cell numeric>{timeRandom}</DataTable.Cell>
              <DataTable.Cell numeric>{timeNormal}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
          <View style={styles.buttonStyle}>
            <Button
              title="Reset Time Stats"
              onPress={() => {
                dispatch(resetTime())
              }}
            />
          </View>
        </View>

        <View>
          <Text>PIN History</Text>
          <View>
            {pinHistory.map((item) => {
              return (
                <Text key={item.key} style={styles.item}>
                  {item.key === pinHistory.length - 1
                    ? `${item.pin} - current PIN`
                    : `${item.pin}`}
                </Text>
              )
            })}
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Reset Pin History"
              onPress={() => {
                dispatch(resetPinHistory())
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  buttonStyle: {
    padding: 50,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default StatsScreen
