
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const allTimeSlots = [
  "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
];

type Schedule = Record<string, string[]>;

export default function ScheduleTimings() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<Schedule>({});
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      if (!user) return;
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/schedule', {
          headers: { 'Authorization': `Bearer ${idToken}` },
        });
        if (!response.ok) throw new Error("Failed to fetch schedule");
        const data = await response.json();
        
        // Initialize days that are not in the data
        const initialSchedule: Schedule = {};
        daysOfWeek.forEach(day => {
            initialSchedule[day] = data[day] || [];
        });
        setSchedule(initialSchedule);
        
      } catch (error) {
        console.error("Error fetching schedule:", error);
        toast({ variant: "destructive", title: "Error", description: "Could not load your schedule." });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSchedule();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, toast]);

  const addSlot = (day: string) => {
    // Adds the first available timeslot that is not already in the schedule for that day
    const existingSlots = schedule[day] || [];
    const newSlot = allTimeSlots.find(slot => !existingSlots.includes(slot));
    if (newSlot) {
        setSchedule({ ...schedule, [day]: [...existingSlots, newSlot] });
    }
  };
  
  const removeSlot = (day: string, index: number) => {
    const newSlots = [...(schedule[day] || [])];
    newSlots.splice(index, 1);
    setSchedule({ ...schedule, [day]: newSlots });
  };
  
  const handleSlotChange = (day: string, index: number, value: string) => {
    const newSlots = [...(schedule[day] || [])];
    newSlots[index] = value;
    setSchedule({ ...schedule, [day]: newSlots });
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/schedule', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${idToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        });

        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to save schedule");
        }
        toast({ title: "Success", description: "Your schedule has been updated." });
    } catch (error: any) {
        toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading || authLoading) {
    return <Skeleton className="w-full h-96" />;
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Schedule Timings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Availability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            {daysOfWeek.map(day => (
                <div key={day} className="rounded-lg border p-4">
                    <h3 className="font-semibold mb-3">{day}</h3>
                    <div className="space-y-3">
                    {(schedule[day] || []).map((slot, index) => (
                        <div key={index} className="flex items-center gap-2">
                           <div className="flex-1 grid grid-cols-2 gap-2">
                             <select
                                value={slot}
                                onChange={(e) => handleSlotChange(day, index, e.target.value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {allTimeSlots.map(time => (
                                    <option key={time} value={time} disabled={(schedule[day] || []).includes(time) && slot !== time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                           </div>
                            <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeSlot(day, index)}>
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))}
                    </div>
                     <Button type="button" variant="outline" size="sm" onClick={() => addSlot(day)} className="mt-4 text-cyan-500 border-cyan-500">
                        <PlusCircle className="mr-2 h-4 w-4"/> Add Slot
                    </Button>
                </div>
            ))}
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSubmitting} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}

