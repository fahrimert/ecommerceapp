import localFont from '@next/font/local'

export const satoshi_regular = localFont({
    src: [
      {
        path: '../../public/fonts/Satoshi-Medium.ttf',
        weight:'300'
        },
    ],
    variable: '--font-satoshi'
  })

  
export const satoshi_black = localFont({
    src: [
      {
        path: '../../public/fonts/Satoshi-Black.ttf',
        weight:'500'
        },
    ],
    variable: '--font-satoshi'
  })