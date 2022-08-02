import React, { useState } from "react"
import { Button, StyleSheet, Text, View } from "react-native"
import PinInput from "./PinInput"

type Props = {}

const SetPin = (props: Props) => {
  const [pin, setPin] = useState<string>("")
  const updatePin = (n: number) => setPin(pin + n.toString())
  const order: number[] = [1, 4, 7, 2, 5, 8, 3, 6, 9, 0]

  const onPressHandler = () => {
    setPin("")
  }

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

  return (
    <View>
      {pin.length === 4 && (
        <View>
          <Text style={{ fontSize: 34, color: "white" }}>PIN Set</Text>
          <View style={{ backgroundColor: "blue", marginVertical: 20 }}>
            <Button
              title="Reset"
              color="white"
              onPress={() => onPressHandler()}
            />
          </View>
        </View>
      )}
      {pin.length !== 4 && (
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
                  paddingBottom: 10,
                  fontSize: 24,
                  color: "white",
                }}
              >
                Set PIN:
              </Text>
              {renderStepper(pin.length)}
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
              <View>
                <PinInput number={order[0]} updatePin={updatePin} />
              </View>
              <View>
                <PinInput number={order[1]} updatePin={updatePin} />
              </View>
              <View>
                <PinInput number={order[2]} updatePin={updatePin} />
              </View>
            </View>
            <View>
              <View>
                <PinInput number={order[3]} updatePin={updatePin} />
              </View>
              <View>
                <PinInput number={order[4]} updatePin={updatePin} />
              </View>
              <View>
                <PinInput number={order[5]} updatePin={updatePin} />
              </View>
            </View>
            <View>
              <View>
                <PinInput number={order[6]} updatePin={updatePin} />
              </View>
              <View>
                <PinInput number={order[7]} updatePin={updatePin} />
              </View>
              <View>
                <PinInput number={order[8]} updatePin={updatePin} />
              </View>
            </View>
          </View>
          <View>
            <PinInput number={order[9]} updatePin={updatePin} />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  circleLine: {
    marginHorizontal: 5,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 200,
    borderWidth: 2,
    borderColor: "white",
  },
  circleFill: {
    backgroundColor: "white",
  },
})

export default SetPin
