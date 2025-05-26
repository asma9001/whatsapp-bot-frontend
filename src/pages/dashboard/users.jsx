"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSeparator } from "../../components/ui/dropdown"

// Sample users data
const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "Today at 10:45 AM",
  },
  {
    id: 2,
    name: "Marketing User",
    email: "marketing@example.com",
    role: "Editor",
    status: "Active",
    lastActive: "Today at 09:30 AM",
  },
  {
    id: 3,
    name: "Support User",
    email: "support@example.com",
    role: "Viewer",
    status: "Active",
    lastActive: "Yesterday at 4:15 PM",
  },
  {
    id: 4,
    name: "Sales User",
    email: "sales@example.com",
    role: "Editor",
    status: "Inactive",
    lastActive: "3 days ago",
  },
]

export default function UsersPage() {
  const [openMenuId, setOpenMenuId] = useState(null)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-slate-500">Manage user access to the WhatsApp automation system</p>
        </div>
        <Button>
          <span className="mr-2">👤+</span>
          Add New User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all users with access to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "Admin" && <Badge variant="success">Admin</Badge>}
                    {user.role === "Editor" && <Badge variant="warning">Editor</Badge>}
                    {user.role === "Viewer" && <Badge variant="secondary">Viewer</Badge>}
                  </TableCell>
                  <TableCell>
                    {user.status === "Active" ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <Dropdown>
                      <DropdownTrigger onClick={() => setOpenMenuId(user.id === openMenuId ? null : user.id)}>
                        <Button variant="ghost" className="p-2">
                          <span className="text-xl">⋮</span>
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu open={user.id === openMenuId} onClose={() => setOpenMenuId(null)} align="right">
                        <div className="p-2 font-medium">Actions</div>
                        <DropdownSeparator />
                        <DropdownItem>
                          <span className="mr-2">⚙️</span>
                          Edit User
                        </DropdownItem>
                        {user.status === "Active" ? (
                          <DropdownItem>
                            <span className="mr-2">🚫</span>
                            Deactivate User
                          </DropdownItem>
                        ) : (
                          <DropdownItem>
                            <span className="mr-2">✅</span>
                            Activate User
                          </DropdownItem>
                        )}
                        <DropdownSeparator />
                        <DropdownItem className="text-red-600">
                          <span className="mr-2">🗑️</span>
                          Delete User
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>
          <CardDescription>Description of available user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Badge variant="success">Admin</Badge>
                <h3 className="font-semibold">Administrator</h3>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Full access to all features, including user management, system settings, and campaign management.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Badge variant="warning">Editor</Badge>
                <h3 className="font-semibold">Editor</h3>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Can create, edit, and manage campaigns, but cannot modify system settings or manage users.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Viewer</Badge>
                <h3 className="font-semibold">Viewer</h3>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Read-only access to view campaigns, messages, and analytics, but cannot make any changes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
