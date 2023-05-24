import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/header/Header'
import { MainComp } from '@/components/main/MainComp'
import { data } from '@/Constants/data/DataContent'
import { FloatButton } from 'antd'
// import { Service } from '@/models/models'
// import { setCache, getCache } from '../utils/cache'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // if (data) {
  //   data = JSON.parse(data)
  // }
  return (
    <>
      <Head>
        <title>
          Установка Триколор ТВ | НТВ плюс | Эфирного телевидения
        </title>
        <meta
          name="description"
          content=""
          key="desc"
        />
        <meta name="google-site-verification" content="yHeMoL1xSs-aElrsHOMQKed8ekfXmz6I8qqe57_px9A" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <link rel="android-chrome-192x192" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
        <link rel="android-chrome-512x512" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon/apple-touch-icon.png" />
      </Head>
      <Header data={data[0]} />
      <main
        className={`flex 
        flex-col min-h-screen
         ${inter.className} overflow-hidden
         `}
      >
        <div
          style={{ '--image-url': `url(/uploads/${data[0].img_fon})` }}
          className={`w-full h-screen fon bg-[image:var(--image-url)] 
          bg-cover bg-center`}
        />
        <MainComp />
        <FloatButton.BackTop />
      </main >
    </>
  )
}

// export async function getStaticProps() {
//   try {
//     const cachedData = await getCache('serviceData')
//     if (!cachedData) {
//       const response = await Service.findAll()
//       const newData = JSON.stringify([...response]) || []
//       setCache('serviceData', newData, 59);
//       return {
//         props: {
//           data: newData,
//         },
//         revalidate: 10,
//       }
//     }
//     return {
//       props: {
//         data: cachedData,
//       },
//       revalidate: 59,
//     };
//   } catch (error) {
//     console.error('Ошибка при выборке данных:', error);
//     return {
//       props: {
//         data: null,
//       },
//     }
//   }
// }
