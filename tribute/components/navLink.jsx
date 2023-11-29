'use client'
import { Chip } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavLink = ({name,address}) => {
    const pathname = usePathname()
  return (
    <Link href={address}>
    <Chip
        label={name}
        clickable 
        sx={pathname===address?
            {
                backgroundColor : '#383737',
                color:'white',
                ':hover':{
                    backgroundColor:'#737171'
                },
            }
            :
            {}
        }
    />
    </Link>
  )
}

export default NavLink