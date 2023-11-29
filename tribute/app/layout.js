import './globals.css'
import { Breadcrumbs } from '@mui/material'
import ThemeRegistry from '@/components/themeregistry'
import Head from 'next/head'
import NavLink from '@/components/navLink'

export const metadata = {
  title: 'Tribute page',
  description: 'Tribute page for Kevin De Bruyne',
}

export default function RootLayout({ children }) {
  const navList = [
    {name:'Overview',address:'/'},
    {name:'Achievements',address:'/achievements'},
    {name:'Stats',address:'/stats'},
    {name:'History',address:'/history'},
  ]
  return (
    <html lang="en">
      {/* <Head>
        <meta name='title' content='Tribute page'/>
        <meta name='description' content='Tribute page for Kevin De Bruyne'/>
      </Head> */}
      <body className='min-h-screen'>
        <ThemeRegistry>
          <nav className=' sticky w-full z-50 opacity-100 bg-slate-100 p-2 flex flex-col items-center space-y-4'>
            <p className='text-4xl font-semibold'>Kevin De Bruyne</p>
            <Breadcrumbs separator='|'>
              {navList.map(({name,address}) => <NavLink key={name} {...{name,address}} />  )}
            </Breadcrumbs>
          </nav>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
