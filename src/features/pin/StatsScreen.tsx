import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React from "react"
import { StyleSheet, View } from "react-native"
import { DataTable } from "react-native-paper"
import { RootStackParamList } from "src/App"

type Props = NativeStackScreenProps<RootStackParamList, "Unlocked">

const StatsScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Email</DataTable.Title>
          <DataTable.Title numeric>Age</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>John</DataTable.Cell>
          <DataTable.Cell>john@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>33</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Bob</DataTable.Cell>
          <DataTable.Cell>test@test.com</DataTable.Cell>
          <DataTable.Cell numeric>105</DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Mei</DataTable.Cell>
          <DataTable.Cell>mei@kindacode.com</DataTable.Cell>
          <DataTable.Cell numeric>23</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
  },
})

export default StatsScreen
