
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const allTimeSlots = [
  "12:00 AM", "12:30 AM", "1:00 AM", "1:30 AM", "2:00 AM", "2:30 AM", "3:00 AM", "3:30 AM", "4:00 AM", "4:30 AM", "5:00 AM", "5:30 AM",
  "6:00 AM", "6:30 AM", "7:00 AM", "7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
  "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
];

type Schedule = Record<string, string[]>; // Key is YYYY-MM-DD date string

export default function ScheduleTimings() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<Schedule>({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDateKey = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const slotsForSelectedDate = schedule[selectedDateKey] || [];

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
        setSchedule(data || {});
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

  const addSlot = () => {
    if (!selectedDateKey) return;
    const existingSlots = schedule[selectedDateKey] || [];
    const newSlot = allTimeSlots.find(slot => !existingSlots.includes(slot)) || "09:00 AM";
    setSchedule({ ...schedule, [selectedDateKey]: [...existingSlots, newSlot] });
  };
  
  const removeSlot = (index: number) => {
    if (!selectedDateKey) return;
    const newSlots = [...slotsForSelectedDate];
    newSlots.splice(index, 1);
    setSchedule({ ...schedule, [selectedDateKey]: newSlots });
  };
  
  const handleSlotChange = (index: number, value: string) => {
    if (!selectedDateKey) return;
    const newSlots = [...slotsForSelectedDate];
    newSlots[index] = value;
    setSchedule({ ...schedule, [selectedDateKey]: newSlots });
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
  
  const DayWithDot = ({ date }: { date: Date }) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const hasSlots = schedule[dateKey] && schedule[dateKey].length > 0;
    return (
      <div className="relative">
        {date.getDate()}
        {hasSlots && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-cyan-500"></div>}
      </div>
    );
  };

  if (loading || authLoading) {
    return <Skeleton className="w-full h-96" />;
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Schedule Timings</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
            <CardContent className="p-2">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="w-full"
                    components={{
                        Day: ({ date }) => <DayWithDot date={date} />,
                    }}
                />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
            <CardTitle>
                Available Slots for {selectedDate ? format(selectedDate, 'PPP') : '...'}
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {slotsForSelectedDate.length > 0 ? (
                    slotsForSelectedDate.map((slot, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <select
                                value={slot}
                                onChange={(e) => handleSlotChange(index, e.target.value)}
                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                            >
                                {allTimeSlots.map(time => (
                                    <option key={time} value={time} disabled={slotsForSelectedDate.includes(time) && slot !== time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                            <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeSlot(index)}>
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))
                ) : (
                    <p className="text-muted-foreground">No slots added for this day.</p>
                )}
                <Button type="button" variant="outline" size="sm" onClick={addSlot} disabled={!selectedDate} className="text-cyan-500 border-cyan-500">
                    <PlusCircle className="mr-2 h-4 w-4"/> Add Slot
                </Button>
            </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSubmitting} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
