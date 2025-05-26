// "use client"

// import { useState, useRef, useEffect } from "react"
// import { Card } from "../../components/ui/card"
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Eye, Search, Calendar, ChevronDown, MoreVertical, CheckCircle2, AlertCircle } from "lucide-react"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"

// export default function MessageLogs() {
//   // Date state
//   const [fromDate, setFromDate] = useState(null)
//   const [toDate, setToDate] = useState(null)

//   // Format date for display
//   const formatDate = (date) => {
//     if (!date) return ""
//     return date.toLocaleDateString("en-US", {
//       month: "2-digit",
//       day: "2-digit",
//       year: "numeric",
//     })
//   }

//   // Sample log data
//   const logs = [
//     {
//       id: "1",
//       campaign: "Summer Promotion",
//       message: "Don't miss our summer sale! 20% off all products until June 30th.",
//       status: "Delivered",
//       sentTime: "May 17, 2023 22:47",
//       phoneNumber: "+1 (555) 123-4567",
//       group: "Marketing Group",
//       hasMedia: true,
//     },
//     {
//       id: "2",
//       campaign: "Summer Promotion",
//       message: "Use code SUMMER25 for an extra 5% off your purchase!",
//       status: "Read",
//       sentTime: "May 17, 2023 21:47",
//       phoneNumber: "+1 (555) 123-4567",
//       group: "Marketing Group",
//       hasMedia: false,
//     },
//     {
//       id: "3",
//       campaign: "New Product Launch",
//       message: "Introducing our newest product line! Check it out now.",
//       status: "Delivered",
//       sentTime: "May 17, 2023 20:47",
//       phoneNumber: "+1 (555) 987-6543",
//       group: "Sales Prospects",
//       hasMedia: true,
//     },
//     {
//       id: "4",
//       campaign: "New Product Launch",
//       message: "Limited time offer: Get a free sample with your first purchase!",
//       status: "Failed",
//       sentTime: "May 17, 2023 19:47",
//       phoneNumber: "+1 (555) 987-6543",
//       group: "Sales Prospects",
//       hasMedia: false,
//     },
//     {
//       id: "5",
//       campaign: "Customer Feedback",
//       message: "We value your feedback! Please take our quick survey.",
//       status: "Read",
//       sentTime: "May 17, 2023 00:47",
//       phoneNumber: "+1 (555) 123-4567",
//       group: "Customer Support",
//       hasMedia: false,
//     },
//     {
//       id: "6",
//       campaign: "Customer Feedback",
//       message: "Thank you for being a valued customer!",
//       status: "Delivered",
//       sentTime: "May 17, 2023 00:17",
//       phoneNumber: "+1 (555) 123-4567",
//       group: "Customer Support",
//       hasMedia: false,
//     },
//   ]

//   // Dropdown state
//   const [openDropdownId, setOpenDropdownId] = useState(null)
//   const dropdownRef = useRef(null)

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpenDropdownId(null)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [])

//   // Toggle dropdown
//   const toggleDropdown = (id) => {
//     setOpenDropdownId(openDropdownId === id ? null : id)
//   }

//   // Get status badge styling
//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Delivered":
//         return (
//           <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//             <CheckCircle2 className="w-3 h-3 mr-1" />
//             Delivered
//           </div>
//         )
//       case "Read":
//         return (
//           <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//             <CheckCircle2 className="w-3 h-3 mr-1" />
//             Read
//           </div>
//         )
//       case "Failed":
//         return (
//           <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//             <AlertCircle className="w-3 h-3 mr-1" />
//             Failed
//           </div>
//         )
//       default:
//         return (
//           <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//             {status}
//           </div>
//         )
//     }
//   }

//   // Custom date picker input
//   const CustomDatePickerInput = ({ value, onClick, placeholder }) => (
//     <div className="relative">
//       <Input
//         type="text"
//         value={value}
//         onClick={onClick}
//         placeholder={placeholder}
//         className="pl-3 pr-10 cursor-pointer"
//         readOnly
//       />
//       <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//     </div>
//   )

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-xl sm:text-2xl font-bold">Message Logs</h1>
//         <p className="text-gray-500 text-sm sm:text-base">View detailed logs of all sent WhatsApp messages</p>
//       </div>

//       {/* Filter Card */}
//       <Card className="p-3 sm:p-6">
//         <div className="space-y-4">
//           <div>
//             <h2 className="text-lg font-medium">Filter Logs</h2>
//             <p className="text-sm text-gray-500">Narrow down logs by date, campaign, or status</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">From Date</label>
//               <DatePicker
//                 selected={fromDate}
//                 onChange={(date) => setFromDate(date)}
//                 customInput={<CustomDatePickerInput placeholder="mm/dd/yyyy" />}
//                 dateFormat="MM/dd/yyyy"
//                 isClearable
//                 placeholderText="mm/dd/yyyy"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">To Date</label>
//               <DatePicker
//                 selected={toDate}
//                 onChange={(date) => setToDate(date)}
//                 customInput={<CustomDatePickerInput placeholder="mm/dd/yyyy" />}
//                 dateFormat="MM/dd/yyyy"
//                 isClearable
//                 placeholderText="mm/dd/yyyy"
//                 minDate={fromDate}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Campaign</label>
//               <div className="relative">
//                 <select className="w-full h-10 pl-3 pr-10 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option>All Campaigns</option>
//                   <option>Summer Promotion</option>
//                   <option>New Product Launch</option>
//                   <option>Customer Feedback</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Status</label>
//               <div className="relative">
//                 <select className="w-full h-10 pl-3 pr-10 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
//                   <option>All Statuses</option>
//                   <option>Delivered</option>
//                   <option>Read</option>
//                   <option>Failed</option>
//                 </select>
//                 <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row justify-end gap-2">
//             <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
//               <Search className="w-4 h-4 mr-2" />
//               Apply Filters
//             </Button>
//           </div>
//         </div>
//       </Card>

//       {/* Logs Card */}
//       <Card className="p-3 sm:p-6">
//         <div>
//           <h2 className="text-lg font-medium mb-2">Message Logs</h2>
//           <p className="text-sm text-gray-500 mb-4">Detailed logs of all sent messages</p>

//           {/* Table for md+ screens */}
//           <div className="overflow-x-auto hidden md:block">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-3 px-4 font-medium">Campaign</th>
//                   <th className="text-left py-3 px-4 font-medium">Message</th>
//                   <th className="text-left py-3 px-4 font-medium">Status</th>
//                   <th className="text-left py-3 px-4 font-medium">Sent Time</th>
//                   <th className="text-left py-3 px-4 font-medium">WhatsApp Number</th>
//                   <th className="text-left py-3 px-4 font-medium">Group</th>
//                   <th className="text-right py-3 px-4 font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {logs.map((log) => (
//                   <tr key={log.id} className="border-b hover:bg-gray-50">
//                     <td className="py-3 px-4">{log.campaign}</td>
//                     <td className="py-3 px-4 max-w-xs truncate">
//                       {log.message}
//                       {log.hasMedia && (
//                         <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
//                           Media
//                         </span>
//                       )}
//                     </td>
//                     <td className="py-3 px-4">{getStatusBadge(log.status)}</td>
//                     <td className="py-3 px-4">{log.sentTime}</td>
//                     <td className="py-3 px-4">{log.phoneNumber}</td>
//                     <td className="py-3 px-4">{log.group}</td>
//                     <td className="py-3 px-4 text-right">
//                       <div className="relative" ref={dropdownRef}>
//                         <button onClick={() => toggleDropdown(log.id)} className="p-1 rounded-full hover:bg-gray-100">
//                           <MoreVertical className="h-5 w-5 text-gray-500" />
//                         </button>
//                         {openDropdownId === log.id && (
//                           <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                             <div className="py-1">
//                               <button
//                                 className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                 onClick={() => {
//                                   console.log("View details for", log.id)
//                                   setOpenDropdownId(null)
//                                 }}
//                               >
//                                 <Eye className="mr-2 h-4 w-4" />
//                                 View Detail
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Cards for mobile (below md) */}
//           <div className="md:hidden flex flex-col gap-4">
//             {logs.map((log) => (
//               <div key={log.id} className="rounded-lg border bg-white p-4 flex flex-col gap-2 shadow-sm">
//                 <div className="flex justify-between items-center">
//                   <span className="font-semibold text-base">{log.campaign}</span>
//                   <div className="relative" ref={dropdownRef}>
//                     <button onClick={() => toggleDropdown(log.id)} className="p-1 rounded-full hover:bg-gray-100">
//                       <MoreVertical className="h-5 w-5 text-gray-500" />
//                     </button>
//                     {openDropdownId === log.id && (
//                       <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                         <div className="py-1">
//                           <button
//                             className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                             onClick={() => {
//                               console.log("View details for", log.id)
//                               setOpenDropdownId(null)
//                             }}
//                           >
//                             <Eye className="mr-2 h-4 w-4" />
//                             View Detail
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="text-sm text-gray-800">
//                   {log.message}
//                   {log.hasMedia && (
//                     <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
//                       Media
//                     </span>
//                   )}
//                 </div>
//                 <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600 mt-1">
//                   <div>
//                     <span className="font-semibold">Status:</span> {getStatusBadge(log.status)}
//                   </div>
//                   <div>
//                     <span className="font-semibold">Sent:</span> {log.sentTime}
//                   </div>
//                 </div>
//                 <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-600">
//                   <div>
//                     <span className="font-semibold">Number:</span> {log.phoneNumber}
//                   </div>
//                   <div>
//                     <span className="font-semibold">Group:</span> {log.group}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Card>
//     </div>
//   )
// }