import os from 'os'
import dayjs, { Dayjs } from 'dayjs'
import { message } from 'antd'
export function getLocalIp(): string {
  let needHost = '' // 打开的host
  try {
    // 获得网络接口列表
    const network = os.networkInterfaces()
    for (const dev in network) {
      const iface = network[dev]!
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i]
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          needHost = alias.address
        }
      }
    }
  } catch (e) {
    needHost = 'localhost'
  }

  return needHost
}
export function formatTime(time: number | string | Dayjs | null, hasHour: boolean = true): string {
  return time ? dayjs(time).format(hasHour ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD') : '--'
}
export function handleCopy(text: string): void {
  if (!text) return;
  var tag = document.createElement('textarea');
  tag.value = text;
  document.body.appendChild(tag);
  tag.select();
  document.execCommand('copy');
  tag.remove();
  message.success('复制成功');
}
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
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
      const { videoWidth, videoHeight } = video; // canvas的尺寸和图片一样
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
        resolve(resultFile);
      });
    };
  })
}