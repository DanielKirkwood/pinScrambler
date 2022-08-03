import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import type { RootStackParamList } from "../../App"
import { RootState } from "../../redux/store"
import { setPin, setStatus, unlockPin } from "./pinSlice"

type Props = NativeStackScreenProps<RootStackParamList, "Locked">

const PinScreen = ({ navigation }: Props) => {
  const status = useSelector((state: RootState) => state.pin.status)
  const order = useSelector((state: RootState) => state.pin.order)

  const dispatch = useDispatch()

  const [userPin, setUserPin] = useState("")

  if (userPin.length === 4) {
    if (status === "NOT SET") {
      dispatch(setPin(userPin))
      setUserPin("")
    } else {
      dispatch(unlockPin(userPin))
      setUserPin("")
    }
  }

  useEffect(() => {
    if (status === "SUCCESS") {
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
            alignSelf: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={(e) =>
              setUserPin(userPin.substring(0, userPin.length - 1))
            }
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                paddingRight: 15,
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>
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
})

export default PinScreen
