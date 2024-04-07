import ShareFilePng from '@/asserts/sharefile.png'
import styles from './sharefile.module.scss'
import { useEffect, useId, useRef, useState } from 'react'
import { useRequest } from 'ahooks'
import {
  GetRandomShareFile,
  GetShareFileDownload
} from '@/requests/share_files/share_file'
import { Button, Image } from 'antd'
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Pagination,
  Navigation,
  EffectCoverflow,
  Virtual,
  Autoplay
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'
import { DownloadOutlined, PlayCircleOutlined } from '@ant-design/icons'

export default function ShareFile(props: any) {
  const [fileList, setFileList] = useState<any[]>([])
  const activeIndexRef = useRef(1)
  const { data, loading, run } = useRequest(
    (data = 1) => GetRandomShareFile({ size: data }),
    {
      manual: true
    }
  )
  useEffect(() => {
    const files = data?.data
    if (files) {
      setFileList((preFile: any) => [...preFile, ...files])
    }
  }, [data])
  useEffect(() => {
    run(20)
  }, [])

  return (
    <div className={styles.sharefile}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false
        }}
        coverflowEffect={{
          rotate: 80,
          stretch: 0,
          // depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation, Virtual, EffectCoverflow, Autoplay]}
        className={styles.swiper}
        virtual={true}
        onSlideChange={(swiper) => {
          activeIndexRef.current = swiper.activeIndex
          if (
            swiper.previousIndex < swiper.activeIndex &&
            activeIndexRef.current === fileList.length - 1
          ) {
            run(20)
          }
        }}
      >
        {fileList.map((item, index) => {
          const downloadUrl =
            item?.image?.url || item?.video?.url || item?.file.url
          return (
            <SwiperSlide
              key={index}
              className={styles['swiper-slide']}
              virtualIndex={index}
            >
              <div key={Math.random()} className={clsx(styles['share-file'])}>
                {item.image && <Image src={downloadUrl} />}
                {item.video && (
                  <Image
                    src={item?.video?.post?.url}
                    preview={{
                      imageRender: videoRender(downloadUrl),
                      mask: <PlayCircleOutlined className="text-6xl" />
                    }}
                  />
                )}
                {item.file && (
                  <img
                    src={ShareFilePng}
                    alt="sharefile"
                    className={styles.img}
                  />
                )}
                <div className={styles['download-container']}>
                  <div className={styles['file-name']}>{item?.name}</div>
                  <Button
                    type="text"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      void GetShareFileDownload({ id: item.id })
                      window.open(downloadUrl)
                    }}
                  >
                    下载
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}
const videoRender = (url: string) => {
  return (ele: any) => {
    return (
      <video
        className="w-[auto] max-h-[80%]"
        src={url}
        controls
        autoPlay
        muted
      ></video>
    )
  }
}
