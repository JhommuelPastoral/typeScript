import React from 'react'
import AppSideBar from './Sidebar.tsx'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({children} : {children: React.ReactNode}) {
  
  return (
    <>

    <SidebarProvider className='' >
      <AppSideBar />
      
      <main className='relative flex flex-1 min-h-screen ' >
        <div className=''>
          <SidebarTrigger className='sticky top-1'/>
        </div>
        <div className='flex flex-col flex-1 py-1 '>
          {children}
        </div>
      </main>
    </SidebarProvider>

    
    
    
    </>
  )
}
