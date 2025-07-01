import React from 'react'
import AppSideBar from './Sidebar.tsx'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Layout({children} : {children: React.ReactNode}) {
  
  return (
    <>

    <SidebarProvider className='' >
      <AppSideBar />
      
      <main className='h-[2000px] flex  flex-1 relative '>
        <div className=''>
          <SidebarTrigger className='sticky top-1'/>
        </div>
        <div className='flex flex-1 '>
          {children}
        </div>
      </main>
    </SidebarProvider>

    
    
    
    </>
  )
}
