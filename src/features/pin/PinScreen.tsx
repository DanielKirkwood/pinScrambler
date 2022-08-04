import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import type { RootStackParamList } from "../../App"
import { RootState } from "../../redux/store"
import { addTime, setPin, setStatus, unlockPin } from "./pinSlice"

type Props = NativeStackScreenProps<RootStackParamList, "Locked">

function getTimeDiff(startDate: Date, endDate: Date) {
  // if you want seconds then divide by 1000
  // const msInSecond = 1000

  return Math.abs(endDate.getTime() - startDate.getTime())
}

const PinScreen = ({ navigation }: Props) => {
  const status = useSelector((state: RootState) => state.status)
  const order = useSelector((state: RootState) => state.order)

  const dispatch = useDispatch()

  const [userPin, setUserPin] = useState<string>("")
  const [attempts, setAttempts] = useState<number>(0)

  let firstTime = new Date()
  let lastTime = new Date()

  if (userPin.length === 4) {
    if (status === "NOT SET") {
      dispatch(setPin(userPin))
      setUserPin("")
    } else {
      dispatch(unlockPin(userPin))

      if (status !== "SUCCESS") {
        setAttempts(attempts + 1)
      }
      setUserPin("")
    }
  }

  if (userPin.length === 1 && attempts === 0 && status !== "NOT SET") {
    // start taking time once user clicks first input
    firstTime = new Date()
    console.log("start time: ", firstTime)
  }

  useEffect(() => {
    if (status === "SUCCESS") {
      // record time taken to complete pin
      lastTime = new Date()
      console.log("end time: ", lastTime)

      let time: number = getTimeDiff(firstTime, lastTime)
      console.log("time: ", time)

      dispatch(addTime(time))
      setAttempts(0)
      dispatch(setStatus("READY"))
      navigation.navigate("Unlocked")
    }

    return
  }, [userPin])

  const renderStepper = (numFilled: number) => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            margin: 0,
            padding: 0,
          }}
        >
          <View
            style={[styles.circleLine, numFilled >= 1 && styles.circleFill]}
          />
          <View
            style={[styles.circleLine, numFilled >= 2 && styles.circleFill]}
          />
          <View
            style={[styles.circleLine, numFilled >= 3 && styles.circleFill]}
          />
          <View
            style={[styles.circleLine, numFilled >= 4 && styles.circleFill]}
          />
        </View>
      </View>
    )
  }

  const renderPinButton = (number: string) => {
    return (
      <TouchableOpacity
        onPress={(e) => setUserPin(userPin + number)}
        style={styles.circleButton}
      >
        <Text style={styles.number}>{number}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "column",
              margin: 0,
              padding: 30,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                paddingBottom: 15,
                fontSize: 20,
                color: "white",
              }}
            >
              {status === "NOT SET" && "Set PIN"}
              {status === "ERROR" && "Incorrect PIN"}
              {status === "READY" && "Enter PIN"}
            </Text>
            {renderStepper(userPin.length)}
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 0,
            padding: 0,
          }}
        >
          <View>
            <View>{renderPinButton(order[0])}</View>
            <View>{renderPinButton(order[1])}</View>
            <View>{renderPinButton(order[2])}</View>
          </View>
          <View>
            <View>{renderPinButton(order[3])}</View>
            <View>{renderPinButton(order[4])}</View>
            <View>{renderPinButton(order[5])}</View>
          </View>
          <View>
            <View>{renderPinButton(order[6])}</View>
            <View>{renderPinButton(order[7])}</View>
            <View>{renderPinButton(order[8])}</View>
          </View>
        </View>
        <View>
          <View>{renderPinButton(order[9])}</View>
        </View>

        <View
          style={{
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute", //Here is the trick
            bottom: 25,
            alignSelf: "flex-start",
          }}
        >
          <Button
            title="Unlock"
            onPress={() => {
              setUserPin("")
              dispatch(setStatus("READY"))
              navigation.navigate("Unlocked")
            }}
            color="white"
          />
        </View>

        <View
          style={{
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute", //Here is the trick
            bottom: 25,
            alignSelf: "flex-end",
          }}
        >
          <Button
            title="Delete"
            onPress={() => setUserPin(userPin.substring(0, userPin.length - 1))}
            color="white"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(99,102,106, 0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  circleLine: {
    marginHorizontal: 15,
    height: 13,
    width: 13,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
  },
  circleFill: {
    backgroundColor: "white",
  },
  circleButton: {
    margin: 10,
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 160,
    backgroundColor: "rgb(128,128,128)",
  },
  number: {
    color: "white",
    fontSize: 24,
  },
  twoButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default PinScreen
