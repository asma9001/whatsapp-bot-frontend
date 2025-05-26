"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card } from "../../components/ui/card"
import { RefreshCcw, QrCode } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("whatsapp")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 text-sm sm:text-base">Configure your WhatsApp campaign automation system</p>
      </div>

      {/* Responsive tab layout: column on mobile, row on desktop */}
      <div className="bg-gray-100 rounded-md p-1">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:min-w-0">
          {/* <button
            className={`flex-1 py-3 px-4 rounded-md text-center min-w-[140px] transition-all ${
              activeTab === "general" ? "bg-white text-gray-800 shadow" : "bg-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button> */}
          <button
            className={`flex-1 py-3 px-4 rounded-md text-center min-w-[140px] transition-all ${
              activeTab === "whatsapp" ? "bg-white text-gray-800 shadow" : "bg-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("whatsapp")}
          >
            WhatsApp
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-md text-center min-w-[140px] transition-all ${
              activeTab === "account" ? "bg-white text-gray-800 shadow" : "bg-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
        </div>
      </div>

      {/* {activeTab === "general" && (
        <Card className="p-3 sm:p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold">General Settings</h2>
              <p className="text-gray-600 text-sm">Configure general system settings</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <Input defaultValue="CodeCrafts LLC" className="max-w-full sm:max-w-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Default Message Interval (minutes)</label>
                <Input type="number" defaultValue="5" className="max-w-full sm:max-w-md" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between max-w-full sm:max-w-md gap-2">
                <label className="text-sm font-medium">Auto-retry failed messages</label>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between max-w-full sm:max-w-md gap-2">
                <label className="text-sm font-medium">Email notifications for campaign completion</label>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                  <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                </div>
              </div>
              <div>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Save Settings</Button>
              </div>
            </div>
          </div>
        </Card>
      )} */}

      {activeTab === "whatsapp" && (
        <div className="space-y-6">
          <Card className="p-3 sm:p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">WhatsApp Connections</h2>
                <p className="text-gray-600 text-sm">Manage your WhatsApp number connections</p>
              </div>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div>
                      <div className="font-medium">+1 (555) 123-4567</div>
                      <div className="text-sm text-gray-500">Last active: 2 hours ago</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div>
                      <div className="font-medium">+1 (555) 987-6543</div>
                      <div className="text-sm text-gray-500">Not currently connected</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Disconnected
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                    <RefreshCcw className="h-4 w-4" />
                    Refresh Connection
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 w-full sm:w-auto">
                    <QrCode className="h-4 w-4" />
                    Connect via QR Code
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          {/* <Card className="p-3 sm:p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">WhatsApp Settings</h2>
                <p className="text-gray-600 text-sm">Configure WhatsApp messaging settings</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Maximum Messages Per Day</label>
                  <Input type="number" defaultValue="1000" className="max-w-full sm:max-w-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Retry Attempts</label>
                  <Input type="number" defaultValue="3" className="max-w-full sm:max-w-md" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between max-w-full sm:max-w-md gap-2">
                  <label className="text-sm font-medium">Enable media messages</label>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                  </div>
                </div>
                <div>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Save Settings</Button>
                </div>
              </div>
            </div>
          </Card> */}
        </div>
      )}

      {activeTab === "account" && (
        <div className="space-y-6">
          <Card className="p-3 sm:p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Account Settings</h2>
                <p className="text-gray-600 text-sm">Update your account information</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input defaultValue="Zain Rashid" className="max-w-full sm:max-w-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <Input type="email" defaultValue="zain@codecrafts.com" className="max-w-full sm:max-w-md" />
                </div>
                <div>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Update Account</Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-3 sm:p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Change Password</h2>
                <p className="text-gray-600 text-sm">Update your account password</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <Input type="password" className="max-w-full sm:max-w-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <Input type="password" className="max-w-full sm:max-w-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                  <Input type="password" className="max-w-full sm:max-w-md" />
                </div>
                <div>
                  <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">Change Password</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}