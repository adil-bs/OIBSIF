'use client'
import React from 'react'
import {Timeline,TimelineItem,TimelineSeparator,TimelineConnector,TimelineContent, TimelineOppositeContent} from '@mui/lab'
import { achievementsData } from '@/components/data'
import { Circle } from '@mui/icons-material'
import Image from 'next/image'
import { Fade } from '@mui/material'
import { getWindowSize } from '@/components/utility'

const Achievement = () => {
    const windowSize = getWindowSize()

  return (
    <div className='text-white bg-black bg-opacity-60 py-10'>

        <Fade in>
        <Timeline position={windowSize.width<640 ? 'right' : 'alternate-reverse'} >

        {achievementsData.map((achievement,i) => 
            <TimelineItem key={i}>
                <TimelineSeparator>
                    <div className='h-16 aspect-square relative'>
                    {/* <TimelineDot className=' text-2xl h-full !m-0'/> */}
                        <Image src={achievement.img} alt='' fill/>
                    </div>
                    <TimelineConnector className={` min-h-[4rem] ${i === achievementsData.length-1 && 'hidden'}`}/>
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