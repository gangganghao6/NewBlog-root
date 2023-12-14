import SparkMD5 from 'spark-md5'
export async function createHash(file: File): Promise<string> {
  return await new Promise((resolve, reject): void => {
    const chunkSize = 1024 * 1024 * 2
    const chunks = Math.ceil(file.size / chunkSize)
    const fileReader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()
    let currentChunk = 0

    fileReader.onload = function (e) {
      postMessage({
        type: 'progress',
        msg: `Total:${chunks} Current:${currentChunk}`
      })
      spark.append(e.target!.result as ArrayBuffer) // Append array buffer
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end()) // Compute hash
      }
    }

    fileReader.onerror = function () {
      reject(new Error('oops, something went wrong.'))
    }
    function loadNext(): void {
      const start = currentChunk * chunkSize
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize

      fileReader.readAsArrayBuffer(file.slice(start, end))
    }
    loadNext()
  })
}
onmessage = async (e) => {
  postMessage({ type: 'count', msg: await createHash(e.data) })
}
