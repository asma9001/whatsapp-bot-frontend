import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { BarChart3, MessageSquare, CheckCircle2, Clock, Calendar } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Monitor campaign performance and message delivery metrics</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="delivery">Delivery</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24,351</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2s</div>
                <p className="text-xs text-muted-foreground">-0.1s from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Message Volume</CardTitle>
              <CardDescription>Number of messages sent over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-slate-300" />
                  <p className="mt-2 text-sm text-muted-foreground">Message volume chart will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Status</CardTitle>
                <CardDescription>Breakdown of message delivery status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-sm text-muted-foreground">Delivery status chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Comparison of campaign performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Campaign performance chart will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance</CardTitle>
              <CardDescription>Detailed performance metrics for each campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Summer Promotion</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Messages Sent</div>
                      <div className="text-xl font-bold">1,245 / 2,500</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Delivery Rate</div>
                      <div className="text-xl font-bold">99.1%</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Failed Messages</div>
                      <div className="text-xl font-bold">11</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-xl font-bold">49.8%</div>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: "49.8%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">New Product Launch</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Messages Sent</div>
                      <div className="text-xl font-bold">856 / 3,000</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Delivery Rate</div>
                      <div className="text-xl font-bold">97.5%</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Failed Messages</div>
                      <div className="text-xl font-bold">21</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-xl font-bold">28.5%</div>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: "28.5%" }}></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Spring Sale (Completed)</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Messages Sent</div>
                      <div className="text-xl font-bold">2,500 / 2,500</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Delivery Rate</div>
                      <div className="text-xl font-bold">98.8%</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Failed Messages</div>
                      <div className="text-xl font-bold">30</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="text-xl font-bold">100%</div>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="delivery" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Metrics</CardTitle>
              <CardDescription>Detailed analysis of message delivery performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold">Delivery Status</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                        <span>Delivered</span>
                      </div>
                      <span className="font-medium">23,913 (98.2%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-emerald-500" style={{ width: "98.2%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <span>Pending</span>
                      </div>
                      <span className="font-medium">125 (0.5%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "0.5%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <span>Failed</span>
                      </div>
                      <span className="font-medium">313 (1.3%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: "1.3%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Failure Reasons</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <span>Network Issues</span>
                      </div>
                      <span className="font-medium">156 (49.8%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-red-400" style={{ width: "49.8%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <span>Invalid Number</span>
                      </div>
                      <span className="font-medium">94 (30.0%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-red-400" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <span>WhatsApp Error</span>
                      </div>
                      <span className="font-medium">63 (20.2%)</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-red-400" style={{ width: "20.2%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold">Delivery Time Distribution</h3>
                <div className="mt-4 h-[250px] w-full rounded-md border border-dashed p-4 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="mx-auto h-12 w-12 text-slate-300" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Delivery time distribution chart will be displayed here
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
