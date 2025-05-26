"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { Phone, QrCode, RefreshCw, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "../../hooks/use-toast"

export default function AccountsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [primaryConnected, setPrimaryConnected] = useState(true)
  const [secondaryConnected, setSecondaryConnected] = useState(true)

  const handleDisconnect = (account) => {
    if (account === "primary") {
      setPrimaryConnected(false)
      toast({
        title: "Account disconnected",
        description: "Primary WhatsApp account has been disconnected.",
      })
    } else {
      setSecondaryConnected(false)
      toast({
        title: "Account disconnected",
        description: "Secondary WhatsApp account has been disconnected.",
      })
    }
  }

  const handleConnect = (account) => {
    setIsLoading(true)

    // Simulate connection process
    setTimeout(() => {
      if (account === "primary") {
        setPrimaryConnected(true)
        toast({
          title: "Account connected",
          description: "Primary WhatsApp account has been connected successfully.",
        })
      } else {
        setSecondaryConnected(true)
        toast({
          title: "Account connected",
          description: "Secondary WhatsApp account has been connected successfully.",
        })
      }
      setIsLoading(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">WhatsApp Accounts</h1>
        <p className="text-muted-foreground">Manage your WhatsApp accounts for message sending</p>
      </div>

      <Tabs defaultValue="accounts">
        <TabsList>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="logs">Connection Logs</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Primary Account</CardTitle>
              <CardDescription>+1 (555) 123-4567</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <Phone className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Primary Account</h3>
                    <div className="flex items-center gap-2">
                      {primaryConnected ? (
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                          <XCircle className="mr-1 h-3 w-3" />
                          Disconnected
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">Last active: Today at 10:45 AM</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {primaryConnected ? (
                    <Button variant="outline" onClick={() => handleDisconnect("primary")}>
                      Disconnect
                    </Button>
                  ) : (
                    <Button onClick={() => handleConnect("primary")} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <QrCode className="mr-2 h-4 w-4" />
                          Connect via QR
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {primaryConnected && (
                <div className="mt-6 rounded-lg border p-4">
                  <h4 className="font-medium">Account Statistics</h4>
                  <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Messages Sent</div>
                      <div className="text-xl font-bold">15,432</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Active Campaigns</div>
                      <div className="text-xl font-bold">2</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Delivery Rate</div>
                      <div className="text-xl font-bold">98.7%</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Connected Since</div>
                      <div className="text-xl font-bold">14 days</div>
                    </div>
                  </div>
                </div>
              )}

              {!primaryConnected && (
                <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <QrCode className="h-32 w-32 text-slate-300" />
                  <p className="mt-4 text-center text-muted-foreground">
                    Click "Connect via QR" to display the QR code for WhatsApp Web
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secondary Account</CardTitle>
              <CardDescription>+1 (555) 987-6543</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <Phone className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Secondary Account</h3>
                    <div className="flex items-center gap-2">
                      {secondaryConnected ? (
                        <Badge
                          variant="outline"
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700">
                          <XCircle className="mr-1 h-3 w-3" />
                          Disconnected
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">Last active: Today at 09:30 AM</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {secondaryConnected ? (
                    <Button variant="outline" onClick={() => handleDisconnect("secondary")}>
                      Disconnect
                    </Button>
                  ) : (
                    <Button onClick={() => handleConnect("secondary")} disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <QrCode className="mr-2 h-4 w-4" />
                          Connect via QR
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {secondaryConnected && (
                <div className="mt-6 rounded-lg border p-4">
                  <h4 className="font-medium">Account Statistics</h4>
                  <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Messages Sent</div>
                      <div className="text-xl font-bold">8,919</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Active Campaigns</div>
                      <div className="text-xl font-bold">1</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Delivery Rate</div>
                      <div className="text-xl font-bold">97.5%</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Connected Since</div>
                      <div className="text-xl font-bold">7 days</div>
                    </div>
                  </div>
                </div>
              )}

              {!secondaryConnected && (
                <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed p-8">
                  <QrCode className="h-32 w-32 text-slate-300" />
                  <p className="mt-4 text-center text-muted-foreground">
                    Click "Connect via QR" to display the QR code for WhatsApp Web
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connection Logs</CardTitle>
              <CardDescription>Recent connection activity for your WhatsApp accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Primary Account Connected</h4>
                      <span className="text-sm text-muted-foreground">Today at 10:45 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp account +1 (555) 123-4567 connected successfully
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Secondary Account Connected</h4>
                      <span className="text-sm text-muted-foreground">Today at 09:30 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp account +1 (555) 987-6543 connected successfully
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <RefreshCw className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Primary Account Refreshed</h4>
                      <span className="text-sm text-muted-foreground">Yesterday at 2:15 PM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Session refreshed for WhatsApp account +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Secondary Account Disconnected</h4>
                      <span className="text-sm text-muted-foreground">Yesterday at 11:30 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">WhatsApp account +1 (555) 987-6543 was disconnected</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Secondary Account Connected</h4>
                      <span className="text-sm text-muted-foreground">Yesterday at 11:20 AM</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      WhatsApp account +1 (555) 987-6543 connected successfully
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Logs
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
