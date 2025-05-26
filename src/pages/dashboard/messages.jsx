"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  Search,
  MoreVertical,
  Clock,
  Eye,
  Edit,
  XCircle,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import axios from "axios";
import constant from "../constant";
// Custom Dropdown
function Dropdown({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <MoreVertical className="h-4 w-4" />
        <span className="sr-only">More Options</span>
      </Button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                className={`flex w-full items-center px-4 py-2 text-sm hover:bg-gray-100 ${
                  item.className || ""
                }`}
                onClick={() => {
                  if (item.onClick) item.onClick();
                  setIsOpen(false);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Sample Data (unchanged)
const upcomingMessages = [
  {
    id: 1,
    campaign: "Summer Promotion",
    content: "Don't miss our summer sale! 20% off all...",
    scheduledTime: "in 5 minutes",
    recipient: "+1 (555) 123-4567",
    group: "Marketing Group",
    hasMedia: true,
  },
  {
    id: 2,
    campaign: "Summer Promotion",
    content: "Use code SUMMER25 for an extra 5% off your purchase!",
    scheduledTime: "in 15 minutes",
    recipient: "+1 (555) 123-4567",
    group: "Marketing Group",
    hasMedia: false,
  },
  {
    id: 3,
    campaign: "New Product Launch",
    content: "Introducing our newest product line! Check it...",
    scheduledTime: "in 25 minutes",
    recipient: "+1 (555) 987-6543",
    group: "Sales Prospects",
    hasMedia: true,
  },
  {
    id: 4,
    campaign: "New Product Launch",
    content: "Limited time offer: Get a free sample with your first...",
    scheduledTime: "in 35 minutes",
    recipient: "+1 (555) 987-6543",
    group: "Sales Prospects",
    hasMedia: false,
  },
];
const sentMessages = [
  {
    id: 1,
    campaign: "Summer Promotion",
    content: "Summer is here! Check out our new collection.",
    status: "delivered",
    recipient: "+1 (555) 123-4567",
    group: "Marketing Group",
    hasMedia: true,
  },
  {
    id: 2,
    campaign: "Summer Promotion",
    content: "Flash sale today only! Use code FLASH15 for 15% off.",
    status: "read",
    recipient: "+1 (555) 123-4567",
    group: "Marketing Group",
    hasMedia: false,
  },
  {
    id: 3,
    campaign: "New Product Launch",
    content: "Our new product line launches tomorrow! Be...",
    status: "delivered",
    recipient: "+1 (555) 987-6543",
    group: "Sales Prospects",
    hasMedia: true,
  },
  {
    id: 4,
    campaign: "New Product Launch",
    content: "Get ready for our biggest launch yet!",
    status: "failed",
    recipient: "+1 (555) 987-6543",
    group: "Sales Prospects",
    hasMedia: false,
  },
];

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [upcomingCampaigns, setUpcomingCampaigns] = useState([]);

  const [sentMessages, setSentMessages] = useState([]); // Optional: Add if using "sent" tab
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingCampaign = async () => {
      try {
        const response = await axios.get(
          `${constant.apiUrl}/upcoming-messages`
        );
        console.log("API Response:", response.data); // 🔍 Debug log
        setUpcomingCampaigns(response.data.upcomingCampaigns); // update this after seeing the response
      } catch (error) {
        setError("Error fetching upcoming messages");
      } finally {
        setLoading(false);
      }
    };
    fetchUpcomingCampaign();
  }, []);

  useEffect(() => {
    const fetchSentCampaigns = async () => {
      try {
        const response = await axios.get(`${constant.apiUrl}/sent-messages`);
        console.log("API Response:", response.data); // 🔍 Debug log
        setSentMessages(response.data.sentCampaigns); // update this after seeing the response
      } catch (error) {
        setError("Error fetching upcoming messages");
      } finally {
        setLoading(false);
      }
    };
    fetchSentCampaigns();
  }, []);
  function getRelativeMinutes(scheduledTime) {
    const now = new Date();
    const scheduledDate = new Date(scheduledTime);
    const diffMs = scheduledDate - now;
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins <= 0) return "now";
    return `in ${diffMins} minute${diffMins > 1 ? "s" : ""}`;
  }

  const filteredUpcoming = upcomingCampaigns.filter((message) => {
    const matchSearch = message.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCampaign =
      campaignFilter === "all" || message.campaign === campaignFilter;
    return matchSearch && matchCampaign;
  });

  const filteredSent = sentMessages.filter((message) => {
    const matchSearch = message.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCampaign =
      campaignFilter === "all" || message.campaign === campaignFilter;
    const matchStatus =
      statusFilter === "all" || message.status === statusFilter;
    return matchSearch && matchCampaign && matchStatus;
  });

  const upcomingDropdownItems = [
    {
      icon: <Eye className="mr-2 h-4 w-4" />,
      label: "View Detail",
      onClick: () => console.log("View Detail clicked"),
    },
    {
      icon: <Edit className="mr-2 h-4 w-4" />,
      label: "Edit Detail",
      onClick: () => console.log("Edit Detail clicked"),
    },
    {
      icon: <XCircle className="mr-2 h-4 w-4" />,
      label: "Cancel Message",
      className: "text-red-600",
      onClick: () => console.log("Cancel Message clicked"),
    },
  ];

  const sentDropdownItems = [
    {
      icon: <Eye className="mr-2 h-4 w-4" />,
      label: "View Detail",
      onClick: () => console.log("View Detail clicked"),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Message Queue
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Monitor and manage your scheduled WhatsApp messages
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">
            Message Queue Status
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            View and manage upcoming and sent messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Responsive tab layout: column on xs, row on sm+ */}
          <div className="mb-6">
            <div className="bg-gray-100 rounded-md p-1">
              <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-0 sm:min-w-0">
                <button
                  className={`flex-1 py-3 px-4 rounded-md text-center min-w-[120px] transition-all ${
                    activeTab === "upcoming"
                      ? "bg-white text-gray-800 shadow"
                      : "bg-transparent text-gray-600"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`flex-1 py-3 px-4 rounded-md text-center min-w-[120px] transition-all ${
                    activeTab === "sent"
                      ? "bg-white text-gray-800 shadow"
                      : "bg-transparent text-gray-600"
                  }`}
                  onClick={() => setActiveTab("sent")}
                >
                  Sent
                </button>
              </div>
            </div>
          </div>

          {/* FILTERS */}
          {/* <div className="mb-4 flex flex-col gap-3 sm:gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-2 w-full md:w-auto">
              {activeTab === "sent" ? (
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              ) : null}
              <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  <SelectItem value="summer">Summer Promotion</SelectItem>
                  <SelectItem value="product">New Product Launch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div> */}

          {/* Table for md+ screens */}
          <div className="rounded-md border hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Message</TableHead>
                  {activeTab === "upcoming" ? (
                    <TableHead>Scheduled</TableHead>
                  ) : (
                    <TableHead>Status</TableHead>
                  )}
                  <TableHead>WhatsApp Number</TableHead>
                  <TableHead>Group</TableHead>
                  {/* <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeTab === "upcoming" ? (
                  filteredUpcoming.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center text-muted-foreground py-6"
                      >
                        No upcoming messages scheduled.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUpcoming.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium">
                          {message.campaignInfo?.name}
                        </TableCell>
                        <TableCell className="max-w-[300px] truncate">
                          {message.content}
                          {message.hasMedia && (
                            <Badge
                              variant="outline"
                              className="ml-2 bg-slate-100 text-slate-700"
                            >
                              Media
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4 text-amber-500" />
                            <span className="text-amber-500 font-medium">
                              {getRelativeMinutes(
                                message.campaignInfo.scheduledTime
                              )}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>+{message.campaignInfo.sessionId}</TableCell>
                        <TableCell>{message.campaignInfo.groupName}</TableCell>
                      </TableRow>
                    ))
                  )
                ) : filteredSent.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-muted-foreground py-6"
                    >
                      No sent messages yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSent.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">
                        {message.campaignInfo.name}
                      </TableCell>
                      <TableCell className="max-w-[300px] truncate">
                        {message.content}
                        {message.hasMedia && (
                          <Badge
                            variant="outline"
                            className="ml-2 bg-slate-100 text-slate-700"
                          >
                            Media
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {message.status === "sent" && (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Delivered
                          </Badge>
                        )}
                        {message.status === "completed" && (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Queued
                          </Badge>
                        )}
                        {message.status === "failed" && (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Failed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>+{message.campaignInfo.sessionId}</TableCell>
                      <TableCell>{message.campaignInfo.groupName}</TableCell>
                      <TableCell className="text-right">
                        <Dropdown items={sentDropdownItems} />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Cards for mobile screens */}
          <div className="md:hidden flex flex-col gap-4">
            {activeTab === "upcoming"
              ? filteredUpcoming.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-lg border bg-white p-4 flex flex-col gap-3 shadow-sm"
                  >
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
                      <div className="font-medium text-base">
                        {message.campaign}
                      </div>
                      <Dropdown items={upcomingDropdownItems} />
                    </div>
                    <div className="text-sm text-slate-700 break-words">
                      {message.content}
                      {message.hasMedia && (
                        <Badge
                          variant="outline"
                          className="ml-2 bg-slate-100 text-slate-700"
                        >
                          Media
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-4 w-4 text-amber-500" />
                      <span className="text-amber-500 font-medium">
                        {message.scheduledTime}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                      <div>
                        <span className="font-semibold">Number:</span>{" "}
                        {message.recipient}
                      </div>
                      <div>
                        <span className="font-semibold">Group:</span>{" "}
                        {message.group}
                      </div>
                    </div>
                  </div>
                ))
              : filteredSent.map((message) => (
                  <div
                    key={message.id}
                    className="rounded-lg border bg-white p-4 flex flex-col gap-3 shadow-sm"
                  >
                    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2">
                      <div className="font-medium text-base">
                        {message.campaignInfo.name}
                      </div>
                      <Dropdown items={sentDropdownItems} />
                    </div>
                    <div className="text-sm text-slate-700 break-words">
                      {message.content}
                      {message.hasMedia && (
                        <Badge
                          variant="outline"
                          className="ml-2 bg-slate-100 text-slate-700"
                        >
                          Media
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      {message.status === "sent" && (
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Delivered
                        </Badge>
                      )}
                      {message.status === "pending" && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 hover:text-green-700">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Queued
                        </Badge>
                      )}
                      {message.status === "failed" && (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100 hover:text-red-700">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                      <div>
                        <span className="font-semibold">Number:</span>{" "}
                        {message.campaignInfo.sessionId}
                      </div>
                      <div>
                        <span className="font-semibold">Group:</span>{" "}
                        {message.campaignInfo.groupName}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          {/* Pagination */}
          {/* <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-sm text-muted-foreground text-center sm:text-left">
              Showing{" "}
              <strong>
                {activeTab === "upcoming"
                  ? filteredUpcoming.length
                  : filteredSent.length}
              </strong>{" "}
              of{" "}
              <strong>
                {activeTab === "upcoming"
                  ? upcomingMessages.length
                  : sentMessages.length}
              </strong>{" "}
              messages
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
