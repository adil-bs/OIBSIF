'use client'
import React, { useEffect, useState } from 'react'
import {Timeline,TimelineItem,TimelineSeparator,TimelineConnector,TimelineContent, TimelineOppositeContent, TimelineDot} from '@mui/lab'
import { achievementsData } from '@/components/data'
import { Circle } from '@mui/icons-material'
import Image from 'next/image'
import {  Button, Chip, Fab, Fade, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { getWindowSize } from '@/components/getWindowSize'

const Achievement = () => {
    const windowSize = getWindowSize()
    const [autoNextImg, setAutoNextImg] = useState(0)
    const [category, setCategory] = useState('individual')
    const bgImgs = ['/withEngChamp.jpg','/withidk.jpg','/withPL.jfif','/withPL2.png','/withPoty.jfif']
    useEffect(() => {
        const timer = setInterval(
            () => setAutoNextImg(prev => (prev +1 ) % bgImgs.length)
            , 3000
        );

        return () => {
          clearInterval(timer);
        };
    }, [])
  return (
    <div className='flex flex-col items-center space-y-8 py-10'>

        {/* <div className='inset-0 fixed -z-10 bg-gradient-to-tr from-amber-400 via-orange-200 to-red-100'>
            <Image 
                className='object-contain object-top md:object-cover md:object-center shadow-xl shadow-red-950'
                src={bgImgs[autoNextImg]} 
                alt=''
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
            />    
        </div>       */}
        <ToggleButtonGroup
            exclusive 
            value={category} 
            onChange={(_,val) => setCategory(prev => val || prev)}
            className=' sticky top-10 z-10'
        >
        {['individual','team'].map(ele =>
            <ToggleButton
                key={ele} 
                sx={{color:"black",backgroundColor:"#E5E4E4",borderRadius:3,
                    '&.Mui-selected':{
                        backgroundColor:'#5F5E5E',color:'white',
                        ':hover':{backgroundColor:'#5F5E5E90'},
                    },
                    ':hover':{backgroundColor:"#E5E4E470",},
                }} 
                value={ele}
                component={Chip}
                label={ele}
            /> 
        )}
        </ToggleButtonGroup>

        <Fade in>
        <Timeline position={windowSize.width<640 ? 'right' : 'alternate-reverse'} >

        {achievementsData[category].map((achievement,i) => 
            <TimelineItem key={i}>
                <TimelineSeparator>
                    <div className='h-16 aspect-square relative'>
                        <Image src={achievement.img} alt='' fill/>
                    </div>

                    <TimelineConnector className={` min-h-[4rem] border-2 border-black ${i === achievementsData[category].length-1 && 'hidden'}`}/>
                </TimelineSeparator>

                {windowSize.width<640 && <TimelineOppositeContent style={{ maxWidth: "1px", paddingLeft: '0px', paddingRight: '0px'}} />}
                
                <TimelineContent sx={{marginBottom:3,}}>
                    <p className='mb-2 md:text-xl font-semibold'>{achievement.title}</p>
                    {achievement.times.map((time,i) => 
                        <div className='max-md:text-sm space-x-1' key={i}>
                            <span>{time.season}</span>
                            <div className='text-[5px] inline-flex align-middle'><Circle fontSize='inherit' /></div>
                            <span>{time.team}</span>
                        </div>
                    )}
                </TimelineContent>
            </TimelineItem>
        )}

        </Timeline>
        </Fade>
    </div>
  )
}

export default Achievement