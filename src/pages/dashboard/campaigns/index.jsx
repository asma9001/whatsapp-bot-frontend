"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Card, CardContent } from "../../../components/ui/card";
import constant from "../../constant";

// Material UI Icons
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function CampaignsPage() {
  const [getCampaigns, setGetCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await axios.get(`${constant.apiUrl}/getCampaigns`);
        setGetCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, []);
console.log(getCampaigns)
  // Toggle campaign status
  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    try {
      await axios.put(`${constant.apiUrl}/campaigns/${id}/status`, {
        status: newStatus,
      });
      setGetCampaigns((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };
  console.log("toggle", toggleStatus);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-slate-500 text-sm">Manage your campaigns</p>
        </div>
        <Button>
          <Link to="/dashboard/campaigns/new">➕ New Campaign</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>WhatsApp Number</TableHead>
                  <TableHead>Group</TableHead>
                  <TableHead>Start Date</TableHead>

                  {/* <TableHead className="text-right">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {getCampaigns.length === 0 && !loading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-6 text-slate-500"
                    >
                      🚫 No campaigns found. Start by creating a new one!
                    </TableCell>
                  </TableRow>
                ) : (
                  getCampaigns.map((campaign) => (
                    <TableRow key={campaign._id}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-full font-medium ${
                            campaign.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </TableCell>
                           <TableCell>+{campaign.sessionId}</TableCell>
                      <TableCell>
                         {campaign.groupName}
                      </TableCell>
                      <TableCell>
                        {new Date(campaign.scheduledTime).toLocaleDateString()}
                      </TableCell>
                 
                      {/* <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          onClick={() =>
                            toggleStatus(campaign._id, campaign.status)
                          }
                        >
                          {campaign.status === "active" ? (
                            <PauseCircleIcon fontSize="medium" />
                          ) : (
                            <PlayArrowIcon fontSize="medium" />
                          )}
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
