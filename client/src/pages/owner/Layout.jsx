import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import SidebarOwner from '../../components/owner/SidebarOwner'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex flex-col'>
        <NavbarOwner />
        <div className='flex'>
            <SidebarOwner />
            <Outlet />
        </div>

    </div>
  )
}

export default Layout