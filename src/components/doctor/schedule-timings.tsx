
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const allTimeSlots = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = i % 2 === 0 ? "00" : "30";
  const period = hours < 12 ? "AM" : "PM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${displayHours}:${minutes} ${period}`;
});

type WeeklySchedule = {
  [key: string]: { start: string; end: string }[];
};

const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export default function ScheduleTimings() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [schedule, setSchedule] = useState<WeeklySchedule>({});
  const [selectedDay, setSelectedDay] = useState("monday");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slotDuration, setSlotDuration] = useState("30");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [tempSlots, setTempSlots] = useState<{ start: string; end: string }[]>([]);

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
        setSchedule(data.schedule || {});
        setSlotDuration(data.slotDuration || "30");
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
  
  const handleEditClick = () => {
    setTempSlots(schedule[selectedDay] || [{ start: "09:00 AM", end: "10:00 AM" }]);
    setIsEditDialogOpen(true);
  };
  
  const handleSaveSlots = () => {
    setSchedule(prev => ({ ...prev, [selectedDay]: tempSlots }));
    setIsEditDialogOpen(false);
  };

  const handleAddSlot = () => {
    setTempSlots(prev => [...prev, { start: "09:00 AM", end: "10:00 AM" }]);
  };

  const handleRemoveSlot = (index: number) => {
    setTempSlots(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleSlotChange = (index: number, part: 'start' | 'end', value: string) => {
    setTempSlots(prev => {
        const newSlots = [...prev];
        newSlots[index][part] = value;
        return newSlots;
    });
  };

  const handleSaveSchedule = async () => {
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
            body: JSON.stringify({ schedule, slotDuration })
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
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <Label>Timing Slot Duration</Label>
              <Select value={slotDuration} onValueChange={setSlotDuration}>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 mins</SelectItem>
                  <SelectItem value="30">30 mins</SelectItem>
                  <SelectItem value="45">45 mins</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Card className="p-4">
                <div className="flex flex-wrap gap-2 border-b pb-4">
                    {daysOfWeek.map(day => (
                        <Button
                            key={day}
                            variant={selectedDay === day ? 'default' : 'outline'}
                            onClick={() => setSelectedDay(day)}
                            className={cn(
                                "capitalize",
                                selectedDay === day && "bg-pink-500 hover:bg-pink-600 text-white"
                            )}
                        >
                            {day}
                        </Button>
                    ))}
                </div>
                <div className="pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">Time Slots</h3>
                        <Button variant="ghost" className="text-blue-500 hover:text-blue-600" onClick={handleEditClick}>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                        </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(schedule[selectedDay] || []).map((slot, index) => (
                             <Badge key={index} variant="destructive" className="bg-pink-500 text-white text-sm py-1 px-3 rounded-md">
                                {slot.start} - {slot.end}
                            </Badge>
                        ))}
                         {(schedule[selectedDay] || []).length === 0 && (
                            <p className="text-sm text-muted-foreground">Not available on {selectedDay}s.</p>
                         )}
                    </div>
                </div>
            </Card>
          </div>
        </CardContent>
      </Card>
       <div className="flex justify-end">
        <Button onClick={handleSaveSchedule} disabled={isSubmitting} className="bg-cyan-500 hover:bg-cyan-600 text-white">
            {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>

       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Time Slots for <span className="capitalize">{selectedDay}</span></DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                {tempSlots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Select value={slot.start} onValueChange={(value) => handleSlotChange(index, 'start', value)}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                {allTimeSlots.map(time => <SelectItem key={`start-${time}`} value={time}>{time}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <span>-</span>
                        <Select value={slot.end} onValueChange={(value) => handleSlotChange(index, 'end', value)}>
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                {allTimeSlots.map(time => <SelectItem key={`end-${time}`} value={time}>{time}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemoveSlot(index)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
             <Button variant="outline" onClick={handleAddSlot} className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Slot
            </Button>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSaveSlots}>Save</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
