"use client";

import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { ArrowLeft, Upload, CalendarIcon, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import constant from "../../constant";
export default function NewCampaignPage() {
  const [activeTab, setActiveTab] = useState("manual");
  const [campaignName, setCampaignName] = useState("");
  const [messageText, setMessageText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [targetGroup, setTargetGroup] = useState("");
  const [groupOptions, setGroupOptions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [messageInterval, setMessageInterval] = useState("5");
  const [csvFile, setCsvFile] = useState(null);
  const rawPhone = localStorage.getItem("userPhone");
  const sessionId = `session-${rawPhone}`;
  const handleCsvUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const removeCsvFile = () => {
    setCsvFile(null);
  };

  useEffect(() => {
    async function fetchGroups() {
      if (!whatsappNumber) {
        setGroupOptions([]);
        return;
      }

      try {
        // const sessionId = whatsappNumber.replace(/\+/g, "");
        const res = await fetch(
          `${constant.apiUrl}/groups?sessionId=${encodeURIComponent(sessionId)}`
        );
        console.log(res);
        if (!res.ok) throw new Error("Failed to fetch groups");
        const data = await res.json();
        setGroupOptions(data);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        setGroupOptions([]);
      }
    }

    fetchGroups();
    setTargetGroup("");
  }, [whatsappNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!campaignName || !whatsappNumber || !targetGroup || !startDate) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // const sessionId = whatsappNumber.replace(/\+/g, "");
    const localISOTime = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 19);

    try {
      if (activeTab === "manual") {
        if (!messageText) {
          toast.error("Please enter message content.");
          return;
        }

        const formData = new FormData();
        formData.append("name", campaignName);
        formData.append("caption", messageText);
        formData.append("sessionId", sessionId);
        formData.append("groupId", targetGroup);
        formData.append("scheduledTime", localISOTime);

        if (imageFile) {
          formData.append("image", imageFile);
        }

        // DEBUG: Log formData keys and values
        console.log("FormData entries:");
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        const response = await fetch(`${constant.apiUrl}/send`, {
          method: "POST",
          body: formData,
          // Do NOT set Content-Type header manually for multipart/form-data
        });
        const result = await response.json(); // ✅ Fix here
        console.log("manual", result); // Not response.data
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error || "Failed to create manual campaign"
          );
        }

        toast.success("Manual campaign created successfully.");
      } else {
        // CSV upload logic (unchanged)
        if (!csvFile) {
          toast.error("Please upload a CSV file.");
          return;
        }

        const formData = new FormData();
        formData.append("sessionId", sessionId);
        formData.append("groupId", targetGroup);
        formData.append("name", campaignName);
        formData.append("startTime", localISOTime);
        formData.append("messageInterval", Number(messageInterval) * 60 * 1000); // Convert minutes → milliseconds

        formData.append("file", csvFile);

        const response = await fetch(`${constant.apiUrl}/send-csv-messages`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to send CSV messages");
        }

        toast.success("CSV campaign created successfully.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const CustomDatePickerInput = ({ value, onClick }) => (
    <div className="relative">
      <Input
        type="text"
        value={value}
        onClick={onClick}
        placeholder="mm/dd/yyyy --:-- --"
        className="pl-3 pr-10 cursor-pointer"
        readOnly
      />
      <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Create New Campaign
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Set up a new WhatsApp message campaign
          </p>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 w-full sm:w-auto"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </Button>
      </div>

      <div className="bg-gray-100 rounded-md p-2 max-w-sm">
        <div className="flex flex-row gap-2 justify-start">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "manual"
                ? "bg-white text-gray-800 shadow-sm"
                : "bg-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("manual")}
          >
            Manual Entry
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "csv"
                ? "bg-white text-gray-800 shadow-sm"
                : "bg-transparent text-gray-600"
            }`}
            onClick={() => setActiveTab("csv")}
          >
            CSV Upload
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border p-3 sm:p-6 max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Campaign Name
              </label>
              <Input
                placeholder="e.g. Summer Promo"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>

            {activeTab === "manual" ? (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message Content
                </label>
                <Textarea
                  placeholder="Enter your message content here..."
                  rows={5}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />

                <div className="mt-2">
                  <label className="block text-sm font-medium mb-1">
                    Attach Image (optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                  {imageFile && (
                    <p className="text-sm mt-1 text-gray-600">
                      Selected: <strong>{imageFile.name}</strong>
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium mb-1">
                  CSV File
                </label>
                {!csvFile ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <input
                      type="file"
                      id="csv-upload"
                      accept=".csv"
                      onChange={handleCsvUpload}
                      className="hidden"
                    />
                    <label htmlFor="csv-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          CSV file with message data
                        </p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-100 border border-gray-300 px-4 py-3 rounded-md text-sm text-gray-700">
                    <span>
                      Selected file: <strong>{csvFile.name}</strong>
                    </span>
                    <button type="button" onClick={removeCsvFile}>
                      <X className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  WhatsApp Number
                </label>
                <select
                  className="w-full h-10 pl-3 pr-10 border rounded-md"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  required
                >
                  <option value="">Select WhatsApp number</option>
                  <option value="923488685901">+{rawPhone}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Target Group
                </label>
                <select
                  className="w-full h-10 pl-3 pr-10 border rounded-md"
                  value={targetGroup}
                  onChange={(e) => setTargetGroup(e.target.value)}
                  required
                  disabled={!groupOptions.length}
                >
                  <option value="">Select group</option>
                  {groupOptions.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Time
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="h:mm aa"
                  timeIntervals={1}
                  dateFormat="MM/dd/yyyy h:mm aa"
                  customInput={<CustomDatePickerInput />}
                  required
                />
              </div>
              {activeTab === "csv" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message Interval (minutes)
                  </label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={messageInterval}
                    onChange={(e) => setMessageInterval(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            >
              Create Campaign
            </Button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
