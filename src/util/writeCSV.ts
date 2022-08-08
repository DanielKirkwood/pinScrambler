import * as FileSystem from "expo-file-system"
import { StorageAccessFramework } from "expo-file-system"
import * as Sharing from "expo-sharing"
import { Platform } from "react-native"
import type { SavedData } from "../features/saveData/dataSlice"

async function writeToCSV(filename: string, data: SavedData[]) {
  // create csv string from data object
  // code from https://dev.to/samueldjones/convert-an-array-of-objects-to-csv-string-in-javascript-337d
  const csvString = [
    ["uid", "pin", "layout", "timeToUnlock", "numErrors"],
    ...data.map((item) => [
      item.uid,
      item.pin,
      item.layout,
      item.timeToUnlock,
      item.numErrors,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n")

  const fullFilename = `${filename}.csv`
  const fileUri: string = `${FileSystem.documentDirectory}${fullFilename}`

  if (Platform.OS === "ios") {
    await FileSystem.writeAsStringAsync(fileUri, csvString, {
      encoding: FileSystem.EncodingType.UTF8,
    })
    await Sharing.shareAsync(fileUri, {
      UTI: "public.text",
    })
    return { success: true, payload: "Download complete." }
  }

  if (Platform.OS === "android") {
    const permissions =
      await StorageAccessFramework.requestDirectoryPermissionsAsync()

    if (!permissions.granted) {
      return { success: false, payload: "Permissions not granted." }
    }

    try {
      await StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fullFilename,
        "text/comma-separated-values",
      )
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, csvString, {
            encoding: FileSystem.EncodingType.Base64,
          })
        })
        .catch((e) => {
          console.log(e)
        })
      return { success: true, payload: "Download complete." }
    } catch (error) {
      console.log(error)
      return { success: false, payload: "An unknown error occured. " }
    }
  }

  return { success: false, payload: "Platform is neither android nor ios" }
}

export default writeToCSV
