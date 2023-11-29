import Image from 'next/image'
import KDBhome from '@/public/home.png'
import { Divider, Fade } from '@mui/material'

export default function Home() {
  return (
    <main className="min-h-[600px] relative" 
    // style={{backgroundImage:"url('/home.png')",BackgroundPositionY:30}}
    >
      <Image 
        className='fixed -z-10'
        src={KDBhome}
        alt=''
      />  
      
      <div className=' h-full flex justify-center xl:ml-[50%] max-xl:text-white max-xl:bg-black max-xl:bg-opacity-60'>

        <Fade in>
        <div className='min-h-[600px] text-left flex flex-col justify-center items-center space-y-3 w-[90%] md:w-[75%]'>
          <p className='text-2xl text-center font-semibold'>The Ginger Pele</p>
          <Divider variant='middle' sx={{borderWidth:2,width:200}}/>
          <p> <span className='text-xl font-semibold'>Born: </span>28 June 1991 </p>
          <p> Kevin De Bruyne is a Belgian professional footballer who plays as a midfielder for and captains both Premier League club Manchester City and the Belgium national team. He is widely regarded as one of the greatest players of his generation as well as one of the best midfielders in the world. Pundits have described him as a complete footballer. </p>
          <p>De Bruyne made his full international debut in 2010, and he has since earned over 90 caps and scored 26 goals for Belgium. He was a member of the Belgian squads that reached the quarter-finals both at the 2014 FIFA World Cup and at UEFA Euro 2016. He was named in the FIFA World Cup Dream Team of the 2018 FIFA World Cup as Belgium finished in third place, as well as appearing in UEFA Euro 2020 and the 2022 FIFA World Cup. </p>
        </div>
        </Fade>

      </div>
    </main>
  )
}
