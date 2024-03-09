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
