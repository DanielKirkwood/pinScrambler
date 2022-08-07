import * as FileSystem from "expo-file-system"
import * as MediaLibrary from "expo-media-library"
import * as Permissions from "expo-permissions"
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

  const fileExtension = ".csv"
  const fileUri: string = `${FileSystem.documentDirectory}${filename}${fileExtension}`

  await FileSystem.writeAsStringAsync(fileUri, csvString, {
    encoding: FileSystem.EncodingType.UTF8,
  })

  if (Platform.OS === "ios") {
    await Sharing.shareAsync(fileUri, {
      UTI: "public.text",
    })
    return { success: true, payload: "Download complete." }
  }

  if (Platform.OS === "android") {
    const permissions = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)

    if (permissions.status != "granted") {
      return { success: false, payload: "Permissions not granted." }
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      const album = await MediaLibrary.getAlbumAsync("Download")
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false)
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
      }
      return { success: true, payload: "Download complete." }
    } catch (error) {
      return { success: false, payload: error as string }
    }
  }

  return { success: false, payload: "Platform is neither android nor ios" }
}

export default writeToCSV
