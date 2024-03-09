export async function getVideoPost(file: File, second: number = 0) {
    return new Promise(async (resolve, reject) => {
        const url = window.URL.createObjectURL(file);
        const video = document.createElement('video');
        video.setAttribute('crossOrigin', 'anonymous'); // 处理跨域
        video.setAttribute('src', url);
        video.setAttribute('autoplay', 'true'); // 预加载
        // 静音操作，防止播放失败
        video.setAttribute('muted', 'muted');
        video.oncanplay = async () => {
            const canvas = document.createElement('canvas');
            const { videoWidth, videoHeight, duration } = video; // canvas的尺寸和图片一样

            canvas.width = videoWidth;
            canvas.height = videoHeight;
            if (second) {
                video.currentTime = second;
                // 播放到当前时间的帧，才能截取到当前的画面
                await video.play();
                await video.pause();
            }
            canvas.getContext('2d')?.drawImage(video, 0, 0, videoWidth, videoHeight);
            canvas.toBlob(async (blob) => {
                const resultFile = new File([blob], `post-${file.name}.png`, { type: 'image' });
                video.remove()
                canvas.remove()
                resolve({ file: resultFile, duration });
            });
        };
    })
}