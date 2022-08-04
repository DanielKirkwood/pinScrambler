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
import { resetAllStats } from "./pinSlice"

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
          <Text>Normal Layout</Text>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title numberOfLines={3} numeric>
                Successful Unlocks
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Unsuccessful Unlocks
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Total Attempts
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Total Time Spent Unlocking (milliseconds)
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell numeric>{numNormalLayoutSuccess}</DataTable.Cell>
              <DataTable.Cell numeric>{numNormalLayoutErrors}</DataTable.Cell>
              <DataTable.Cell numeric>
                {numNormalLayoutSuccess + numNormalLayoutErrors}
              </DataTable.Cell>
              <DataTable.Cell numeric>{timeNormal}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View
          style={{
            paddingTop: 30,
          }}
        >
          <Text>Random Layout</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title numberOfLines={3} numeric>
                Successful Unlocks
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Unsuccessful Unlocks
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Total Attempts
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Total Time Spent Unlocking (milliseconds)
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell numeric>{numRandomLayoutSuccess}</DataTable.Cell>
              <DataTable.Cell numeric>{numRandomLayoutErrors}</DataTable.Cell>
              <DataTable.Cell numeric>
                {numRandomLayoutSuccess + numRandomLayoutErrors}
              </DataTable.Cell>
              <DataTable.Cell numeric>{timeRandom}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View
          style={{
            paddingTop: 30,
          }}
        >
          <Text>Total Stats</Text>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title numberOfLines={3} numeric>
                Successful Unlocks
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Unsuccessful Unlocks
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Total Attempts
              </DataTable.Title>
              <DataTable.Title numberOfLines={3} numeric>
                Total Time Spent Unlocking (milliseconds)
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell numeric>{numSuccess}</DataTable.Cell>
              <DataTable.Cell numeric>{numErrors}</DataTable.Cell>
              <DataTable.Cell numeric>
                {numNormalLayoutSuccess +
                  numRandomLayoutSuccess +
                  numNormalLayoutErrors +
                  numRandomLayoutErrors}
              </DataTable.Cell>
              <DataTable.Cell numeric>{totalTime}</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>

        <View
          style={{
            paddingTop: 30,
          }}
        >
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

          <View style={styles.twoButtons}>
            <View style={styles.buttonStyle}>
              <Button
                color={"blue"}
                title="Download Stats"
                onPress={() => null}
              />
            </View>
            <View style={styles.buttonStyle}>
              <Button
                color={"red"}
                title="Reset All Stats"
                onPress={() => dispatch(resetAllStats())}
              />
            </View>
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
  twoButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default StatsScreen
