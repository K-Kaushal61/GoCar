import React, { useEffect } from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import SidebarOwner from '../../components/owner/SidebarOwner'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext.jsx'

const Layout = () => {

  const { isOwner, navigate } = useAppContext()
  useEffect(() => {
    if(!isOwner){
      navigate('/')
    }
  }, [isOwner])

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