"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Pencil } from "lucide-react";

const days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];
const timeSlots = [
  "8:00am - 9:30am",
  "11:30am - 1:20pm",
  "3:00pm - 4:45pm",
  "5:00pm - 6:30pm",
];

export default function ScheduleTimings() {
  const [activeDay, setActiveDay] = useState("MONDAY");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Schedule Timings</h1>
      <Card className="bg-white rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Schedule Timings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2 max-w-xs">
              <label
                htmlFor="timing-slot-duration"
                className="text-sm font-medium text-muted-foreground"
              >
                Timing Slot Duration
              </label>
              <Select defaultValue="30">
                <SelectTrigger id="timing-slot-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 mins</SelectItem>
                  <SelectItem value="30">30 mins</SelectItem>
                  <SelectItem value="45">45 mins</SelectItem>
                  <SelectItem value="60">60 mins</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-wrap gap-2 border-b pb-4">
              {days.map((day) => (
                <Button
                  key={day}
                  variant={activeDay === day ? "default" : "outline"}
                  onClick={() => setActiveDay(day)}
                  className={`rounded-md ${
                    activeDay === day
                      ? "bg-pink-600 text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {day}
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Time Slots</h3>
                <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600">
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-cyan-400 text-white rounded-md px-3 py-1.5 text-sm"
                  >
                    <span>{slot}</span>
                    <button className="hover:bg-cyan-500 rounded-full p-0.5">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
