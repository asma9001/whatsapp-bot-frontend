"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSeparator } from "./ui/dropdown"

export function DashboardHeader() {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white px-4 shadow-sm md:px-6">
      <div className="flex flex-1 items-center">
        <h1 className="text-lg font-semibold">WhatsApp Automation</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Button variant="ghost" className="relative p-2" onClick={() => setNotificationsOpen(!notificationsOpen)}>
            <span className="text-xl">🔔</span>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Dropdown>
            <DropdownMenu
              open={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
              align="right"
              className="w-80"
            >
              <div className="p-2 font-medium">Notifications</div>
              <DropdownSeparator />
              <div className="p-4 text-center text-sm text-slate-500">No new notifications</div>
            </DropdownMenu>
          </Dropdown>
        </div>

        <Dropdown>
          <DropdownTrigger onClick={() => setUserMenuOpen(!userMenuOpen)}>
            <Button variant="ghost" className="p-2">
              <span className="text-xl">👤</span>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownTrigger>
          <DropdownMenu open={userMenuOpen} onClose={() => setUserMenuOpen(false)} align="right">
            <div className="p-2 font-medium">My Account</div>
            <DropdownSeparator />
            <DropdownItem onClick={() => console.log("Profile clicked")}>Profile</DropdownItem>
            <DropdownItem onClick={() => console.log("Settings clicked")}>Settings</DropdownItem>
            <DropdownSeparator />
            <DropdownItem onClick={() => console.log("Logout clicked")}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  )
}
