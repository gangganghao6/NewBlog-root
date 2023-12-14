import SparkMD5 from 'spark-md5'
export async function createHash(file: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const chunkSize = 1024 * 1024 * 2
        const chunks = Math.ceil(file.size / chunkSize)
        const fileReader = new FileReader();
        const spark = new SparkMD5.ArrayBuffer()
        let currentChunk = 0

        fileReader.onload = function (e) {
            spark.append(e.target!.result as ArrayBuffer);                   // Append array buffer
            currentChunk++;
            if (currentChunk < chunks) {
                loadNext();
            } else {
                resolve(spark.end());  // Compute hash
            }
        };

        fileReader.onerror = function () {
            reject('oops, something went wrong.');
        };
        function loadNext() {
            const start = currentChunk * chunkSize,
                end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

            fileReader.readAsArrayBuffer(file.slice(start, end));
        }
        loadNext();
    })
}


