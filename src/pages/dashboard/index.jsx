import { useState, useEffect } from "react";
import axios from "axios";
import constant from "../constant";

export default function DashboardPage() {
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalFailedMessages, setTotalFailedMessages] = useState(0);
  const [totalQueuedMessages, setTotalQueuedMessages] = useState(0);
  const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentCampaigns, setRecentCampaigns] = useState([]);
  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);
        const [
          campaignRes,
          sentRes,
          failedRes,
          queueRes,
          upcomingRes,
          recentRes,
        ] = await Promise.all([
          axios.get(`${constant.apiUrl}/totalCampaign`),
          axios.get(`${constant.apiUrl}/sent-message`),
          axios.get(`${constant.apiUrl}/failed-message`),
          axios.get(`${constant.apiUrl}/queue-message`),
          axios.get(`${constant.apiUrl}/upcoming-messages`),
          axios.get(`${constant.apiUrl}/recent-compaigns`),
        ]);

        setTotalCampaigns(campaignRes.data.totalCampaigns ?? 0);
        setTotalMessages(sentRes.data.messagesSent ?? 0);
        setTotalFailedMessages(failedRes.data.failedMessages ?? 0);
        setTotalQueuedMessages(queueRes.data.queuedMessages ?? 0);
        setUpcomingCampaigns(upcomingRes.data.upcomingCampaigns ?? []);
        setRecentCampaigns(recentRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  const getTimeDiffMinutes = (scheduledAt) => {
    const now = new Date();
    const scheduledDate = new Date(scheduledAt);
    const diffMs = scheduledDate - now;
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins <= 0) return "now";
    return `in ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-gray-500 text-lg">Loading dashboard...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-red-600 text-lg">{error}</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Monitor your WhatsApp campaigns and message delivery status
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Campaigns
            </CardTitle>
            <span className="text-xl">📊</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCampaigns}</div>
            <p className="text-xs text-slate-500">Campaigns created overall</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-1">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>

            <span className="text-xl">💬</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-xs text-slate-500">Messages successfully sent</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Failed Messages
            </CardTitle>
            <span className="text-xl">❌</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFailedMessages}</div>
            <p className="text-xs text-slate-500">Delivery failures detected</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Queued Messages
            </CardTitle>
            <span className="text-xl">⏱️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQueuedMessages}</div>
            <p className="text-xs text-slate-500">Pending messages in queue</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns & Upcoming Messages */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {/* Recent Campaigns */}
        <div className="rounded-lg border border-slate-200 p-4 sm:p-6 bg-white">
          <h2 className="text-lg sm:text-2xl font-bold">Recent Campaigns</h2>
          <p className="text-slate-500 mb-4 sm:mb-6 text-sm sm:text-base">
            Your most recent WhatsApp campaigns
          </p>
          <div className="space-y-6">
            {recentCampaigns.length === 0 ? (
              <p className="text-slate-500">No recent campaigns found.</p>
            ) : (
              recentCampaigns.map((campaign, index) => (
                <RecentCampaign
                  key={index}
                  title={campaign.title}
                  status={{
                    text:
                      campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1),
                    color:
                      campaign.status === "active"
                        ? "green"
                        : campaign.status === "completed"
                        ? "blue"
                        : campaign.status === "paused"
                        ? "yellow"
                        : "gray",
                  }}
                  progress={campaign.progress}
                  messages={campaign.messages}
                  started={new Date(campaign.started).toLocaleDateString()}
                />
              ))
            )}
          </div>
        </div>
        {/* Upcoming Messages */}
        <div className="rounded-lg border border-slate-200 p-4 sm:p-6 bg-white">
          <h2 className="text-lg sm:text-2xl font-bold">Upcoming Messages</h2>
          <p className="text-slate-500 mb-4 sm:mb-6 text-sm sm:text-base">
            Messages scheduled to be sent soon
          </p>
          <div className="space-y-4">
            {upcomingCampaigns.length === 0 ? (
              <p className="text-slate-500">No upcoming messages.</p>
            ) : (
              upcomingCampaigns.map((item) => {
                const hasMedia = !!item.mediaUrl;
                const timeTag = getTimeDiffMinutes(item.scheduledAt);

                return (
                  <UpcomingMessage
                    key={item._id}
                    campaign={item.campaignInfo?.name || "Unnamed Campaign"}
                    tags={[
                      ...(hasMedia ? [{ text: "Media", color: "blue" }] : []),
                      { text: timeTag, color: "green" },
                    ]}
                    message={item.content}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Card components
const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border border-slate-200 ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className = "" }) => (
  <div className={`p-3 sm:p-4 ${className}`}>{children}</div>
);
const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-medium ${className}`}>{children}</h3>
);
const CardContent = ({ children, className = "" }) => (
  <div className={`p-3 pt-0 sm:p-4 sm:pt-0 ${className}`}>{children}</div>
);

// Recent Campaign component
function RecentCampaign({ title, status, progress, messages, started }) {
  const statusColors = {
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    yellow: "bg-yellow-500 text-white",
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
        <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
        <span
          className={`px-4 py-1 rounded-full text-xs sm:text-sm ${
            statusColors[status.color]
          }`}
        >
          {status.text}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 mb-2 sm:h-2.5">
        <div
          className="bg-blue-600 h-2 rounded-full sm:h-2.5"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm text-slate-500 gap-1">
        <span>{messages}</span>
        <span>Started: {started}</span>
      </div>
    </div>
  );
}

// Upcoming Message component
function UpcomingMessage({ campaign, tags, message }) {
  const tagColors = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
  };
  return (
    <div className="border rounded-lg p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
        <h3 className="font-semibold text-sm sm:text-base">{campaign}</h3>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`px-3 py-1 rounded-full text-xs ${
                tagColors[tag.color] || ""
              }`}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
      <p className="text-slate-600 text-sm sm:text-base">{message}</p>
    </div>
  );
}
