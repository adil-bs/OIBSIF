'use client'
import DataTimeline from '@/components/dataTimeline'
import {  Divider, Fade, Slide, } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const About = () => {
  const clubData = [
    {img:'/genk.png',label:'Getting Started',oppositeLabel:'2008-12',content:'De Bruyne made his professional debut for KRC Genk in 2008 at the age of 17. He played for Genk for four seasons, helping the team win the Belgian Pro League in 2010-2011. In his final season with the club, De Bruyne was named the Belgian Footballer of the Year.'},
    {img:'/uefa.png',label:'Onto The Big Leagues',oppositeLabel:'2012-14',content:'In January 2012, De Bruyne signed for Chelsea, but he was immediately loaned back to Genk for the remainder of the season. He joined Chelsea ahead of the 2012-2013 season but struggled to break into the first team. He was loaned out to Werder Bremen in the Bundesliga for the 2012-2013 season and then to VfL Wolfsburg in the Bundesliga for the 2013-2014 season.'},
    {img:'/wolfsburg.png',label:'Rise',oppositeLabel:'2014-15',content:'He was sold to Wolfsburg ahead of the 2014-15 season. It was at the German club where De Bruyne burst onto the scene, he became a world-beater with every top European club looking for his signature. He won two domestic trophies and scored 20 goals in 73 appearances during his time in Germany.'},
    {img:'/mancity.png',label:'Immortal',oppositeLabel:'2015-Present',content:"Manchester City won the race and forked out a reported fee of £55 million (€75 million) for his services. Since joining City in 2015, Kevin De Bruyne has raised his game and is now considered one of the best players of this generation.\n The Belgian international has been sensational for Manchester City as he has played a pivotal role in his team's domestic success. With the guidance of City manager Pep Guardiola, De Bruyne has won 4 Premier League titles, 5 Carabao Cups, and an FA cup for the Cityzens. He was also selected twice as the Player of the Year for City. He has amassed 343 appearances, scoring 92 goals."},
  ]

  const internationalData = [
    {img:'/belgium.png',label:'Debut in Nationals',oppositeLabel:'2010-14',content:"De Bruyne made his debut for the senior Belgian national team in August 2010 in a friendly against Finland. He was included in the Belgian squad for the 2014 FIFA World Cup in Brazil, where he played in all five of Belgium's matches and helped the team reach the quarter-finals."},
    {img:'/wc.png',label:'Big Leagues',oppositeLabel:'2016-18',content:"De Bruyne played a key role for Belgium at the 2016 UEFA European Championship, scoring a goal and providing two assists in the team's run to the quarter-finals. He also featured in the 2018 FIFA World Cup, helping the team finish in third place. He scored one goal and provided two assists in the tournament, including a stunning strike against Brazil in the quarter-finals."},
    {img:'/uefa.png',label:'King without crown',oppositeLabel:'2020-22',content:"On 17 June 2021, De Bruyne scored his first and the winning goal in Belgium's second match of UEFA Euro 2020, a 2–1 win over Denmark, having earlier in the game assisted the team's first goal. During the round of 16 clash with Portugal, De Bruyne suffered an ankle injury from a tackle from behind, by Portugal's Joao Palhinha. On 2 July Belgium manager Roberto Martinez said that De Bruyne could recover in time for the quarter-final match, later that day, despite not training all week and he was later confirmed in the starting line-up. De Bruyne started all three games in the 2022 FIFA World Cup as Belgium were eliminated in the group stage"},
    {img:'/belgium.png',label:'New wave',oppositeLabel:'2023',content:"On 21 March 2023, De Bruyne was announced as Belgium's new captain, following the international retirement of Eden Hazard. A week later, he led Belgium to beat Germany in a friendly match for the first time since 1954, by scoring a goal and providing two assists in a 3–2 away win."},
  ]

  const drawerList = [
    {label:'Early Life'},
    {label:'Club Career'},
    {label:'International Career'},
    {label:'Records'},
  ]

  return (
    <div className=''>
{/* 
      <div className='max-lg:hidden max-w-[200px] w-[70%] p-3 flex flex-col items-center sticky top-10 border-r-2 border-blue-600'>
        <p className='text-lg font-semibold mb-3'>Content</p>
        <ul>
        {drawerList.map((ele,i)=> 
          <li
            className='text-sm mb-2'
            key={i}
          >{ele.label}</li>
        )}
        </ul>
      </div> */}

      {/* <div> */}
      <div className='flex space-x-6 items-center p-[3vw] lg:p-10 max-lg:relative max-lg:min-h-[85vh] max-lg:text-white max-lg:bg-black max-lg:bg-opacity-50'>

        <Fade in timeout={1500}>
        <div className='lg:relative aspect-video lg:flex-1'>
          <Image src='/youngkdb.jpg' alt='' fill className='-z-10 object-cover object-top'/>
          <div className='absolute p-2 w-full bottom-0 bg-black bg-opacity-50 text-center text-white max-lg:hidden'>Young Kevin  de Bruyne at KRC Genk training academy</div>
        </div>  
        </Fade>      

        <Slide in timeout={1500} direction='left'>
        <div className='space-y-4 lg:flex-1 relative'>
          <p className='font-bold text-2xl'>Early Life</p>
          <Divider/>
          <p>Kevin De Bruyne was born on June 28, 1991, in Ghent, Belgium. From a young age, De Bruyne showed a natural talent for football, and he began playing for local club KVV Drongen when he was just four years old. He later moved to Gent, where he joined the youth academy of KAA Gent.</p>
          <p>De Bruyne's skills on the pitch quickly caught the attention of scouts from other clubs, and at the age of 14, he was offered a place at Genk's youth academy, which he accepted. He moved to Genk with his family and began training with the club's youth teams while continuing his education at a local high school.</p>
        </div>  
        </Slide>
          
      </div>

      <div style={{backgroundImage:"url('/kdbclub.webp')",backgroundAttachment: "fixed",backgroundPosition:"center top",color:'white'}} >
      <DataTimeline 
        className="bg-blue-800 bg-opacity-70"
        headerlabel='Club Career' 
        data={clubData} 
        transitionProps={{ in:true, timeout:1500, direction:'right' }} 
      />
      </div>

      <div style={{backgroundImage:"url('/kdbnational.jpg')",backgroundAttachment: "fixed",backgroundPosition:"center top",color:'white'}} >
      <DataTimeline 
        className='bg-red-700 bg-opacity-50'
        headerlabel='International Career' 
        data={internationalData} 
        transitionProps={{ in:true, timeout:1500, direction:'left' }} 
      />
      </div>

      <div style={{backgroundImage:"url('/kdbrecord.png')",color:'white',backgroundPosition:"center top"}}>
      <div className='bg-violet-700 bg-opacity-70 p-10 space-y-5 flex flex-col items-center justify-center lg:px-[20vw]'>
        <p className='font-bold text-2xl'>Records</p>
        <Divider className='w-40'/>
        <p>In the 2019-2020 Premier League season, De Bruyne provided 20 assists, breaking the previous record of 19 assists set by Thierry Henry.</p>
        <p>De Bruyne reached 50 Premier League assists in just 123 appearances, making him the fastest player to achieve this milestone.</p>
        <p>In the 2017-2018 season, De Bruyne created 106 chances for his teammates, breaking the previous record of 96 chances created by Mesut Ozil in the Premier League.</p>
        <p>In 2017, De Bruyne provided 16 assists in the Premier League, setting a new record for the most assists in a calendar year.</p>
        <p>De Bruyne provided four assists in a single Premier League match against Tottenham Hotspur in December 2017, becoming only the second player in the league's history to achieve this feat.</p>
      </div>
      </div>
      {/* </div> */}
      
    </div>
  )
}

export default About