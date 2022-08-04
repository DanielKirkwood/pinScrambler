import { Platform } from "react-native"
import RNFetchBlob from "rn-fetch-blob"

function writeToCSV(filename: string, data: string[][], headers: string[]) {
  // construct csvString
  const headerString = headers.join(",") + "\n"
  const rowString = data.map((d) => d.join(",")).join("\n")
  const csvString = `${headerString}${rowString}`

  // write the current list of answers to a local csv file
  const pathToWrite =
    Platform.OS === "ios"
      ? `${RNFetchBlob.fs.dirs.DocumentDir}/${filename}.csv`
      : `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}.csv`
  console.log("pathToWrite", pathToWrite)
  // pathToWrite /storage/emulated/0/Download/data.csv
  RNFetchBlob.fs
    .writeFile(pathToWrite, csvString, "utf8")
    .then(() => {
      console.log(`wrote file ${pathToWrite}`)
      // wrote file /storage/emulated/0/Download/data.csv
    })
    .catch((error) => console.error(error))
}

export default writeToCSV
