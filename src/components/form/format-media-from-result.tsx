export const formatImageFromResult = (res: any) => {
  return {
    type: 'image',
    uid: res.url,
    name: res.name,
    status: 'done',
    url: res.url,
    thumbUrl: res.compressUrl
  }
}
export const formatVideoFromResult = (res: any) => {
  return {
    uid: res.url,
    name: res.name,
    status: 'done',
    url: res.url,
    thumbUrl: res.post.compressUrl,
    type: 'video',
    post: {
      uid: res.post.url,
      name: res.post.name,
      status: 'done',
      url: res.post.url,
      thumbUrl: res.post.compressUrl
    }
  }
}
export const formatFileFromResult = (res: any) => {
  return {
    uid: res.url,
    name: res.name,
    status: 'done',
    url: res.url,
    type: 'file'
  }
}
