'use client'
import { Timeline, TimelineConnector, TimelineContent, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab'
import { Collapse, Divider, IconButton, Slide } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import { getWindowSize } from './getWindowSize'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

const ExpandableContent = ({label,content}) => {
    const [expand, setExpand] = useState(false)
    const windowSize = getWindowSize()
    return(
        <TimelineContent sx={{marginBottom:3,}}>
            <div className='flex items-center justify-between'>
                <p className='font-semibold text-lg'>{label}</p>
                <IconButton onClick={() => setExpand(prev => !prev)} sx={{display:{sm:'none'},color:'white'}}> 
                  {expand ? <ExpandLess/> : <ExpandMore/>}
                </IconButton>
            </div>
            <Collapse in={windowSize.width>640 || expand}>
                <p>{content}</p>
            </Collapse>            
        </TimelineContent>
    )
}

const DataTimeline = (props) => {
    const {headerlabel,data,transitionProps,className} = props

  return (
    <Slide {...transitionProps} >
        <div className={'pt-10 flex flex-1 items-center flex-col '+className}>
            <p className='font-bold text-2xl mb-5'>{headerlabel}</p>
            <Divider className='w-40'/>
            <Timeline className='my-8'>
            {data.map((ele,i) => 
                <TimelineItem key={i}>

                <TimelineOppositeContent sx={{maxWidth:{xs:'30vw',md:'20vw'}}}>
                    <p className='font-semibold text-lg'>{ele.oppositeLabel}</p>
                </TimelineOppositeContent>

                <TimelineSeparator>
                <div className='h-[40px] aspect-square relative'>
                    <Image src={ele.img} alt={i} fill/>
                </div>
                <TimelineConnector/>
                </TimelineSeparator>

                <ExpandableContent label={ele.label} content={ele.content} key={i}/> 

                </TimelineItem>
            )}
            </Timeline>
        </div>
    </Slide>
  )
}

export default DataTimeline