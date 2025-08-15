"use client"

import type React from "react"
import {useState} from "react"
import {Header} from "@/src/components/header"
import {Sidebar} from "@/src/components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
    
    
  return (
    <div className="flex h-screen bg-gradient-to-br from-background to-background/95 overflow-hidden">

      <Sidebar open={sidebarOpen} setOpenAction={setSidebarOpen}
                              userRole={} userName={} userEmail={}/>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
