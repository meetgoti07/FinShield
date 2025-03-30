"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function UsersFilters() {
  return (
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          className="pl-9 w-full lg:w-[400px]"
        />
      </div>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Users</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
          <SelectItem value="flagged">Flagged</SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Risk Level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="high">High Risk</SelectItem>
          <SelectItem value="medium">Medium Risk</SelectItem>
          <SelectItem value="low">Low Risk</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}