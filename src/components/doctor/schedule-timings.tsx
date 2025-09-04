
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, PlusCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type TimeSlot = { start: string; end: string };

type Availability = {
  // Date string in YYYY-MM-DD format
  [date: string]: TimeSlot[];
};

const formatTo12Hour = (time24: string) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const formattedMinutes = minutes.padStart(2, '0');
    return `${h12}:${formattedMinutes} ${ampm}`;
};

export default function ScheduleTimings() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<Availability>({});
  const [slotDuration, setSlotDuration] = useState<string>('30');
  const [newTimeSlot, setNewTimeSlot] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const idToken = await user.getIdToken();
          const response = await fetch('/api/doctor/schedule', {
            headers: {
              'Authorization': `Bearer ${idToken}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to fetch schedule');
          }
          const data = await response.json();
          // The API returns a schedule object which might be empty
          setAvailability(data.schedule || {});
          setSlotDuration(data.slotDuration || '30');
        } catch (error) {
          console.error("Error fetching schedule:", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Could not load your schedule.",
          });
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to view your schedule.",
        });
      }
    });

    return () => unsubscribe();
  }, [toast]);

  const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : "";
  const timeSlotsForSelectedDate = availability[selectedDateString] || [];

  const handleAddTimeSlot = () => {
    if (!newTimeSlot.from || !newTimeSlot.to || !selectedDateString) {
        toast({ variant: "destructive", title: "Error", description: "Please select both a start and end time." });
        return;
    }
    
    if (newTimeSlot.from >= newTimeSlot.to) {
        toast({ variant: "destructive", title: "Error", description: "Start time must be before end time." });
        return;
    }
    
    const newSlot: TimeSlot = { start: newTimeSlot.from, end: newTimeSlot.to };

    const overlaps = timeSlotsForSelectedDate.some(existingSlot =>
        (newSlot.start < existingSlot.end && newSlot.end > existingSlot.start)
    );

    if (overlaps) {
        toast({ variant: "destructive", title: "Error", description: "This time slot overlaps with an existing one." });
        return;
    }

    const updatedSlots = [...timeSlotsForSelectedDate, newSlot].sort((a, b) => a.start.localeCompare(b.start));
    setAvailability(prev => ({
        ...prev,
        [selectedDateString]: updatedSlots
    }));
    setNewTimeSlot({ from: "", to: "" });
  };

  const handleRemoveTimeSlot = (slotToRemove: TimeSlot) => {
    if (selectedDateString) {
      setAvailability(prev => ({
        ...prev,
        [selectedDateString]: prev[selectedDateString].filter(slot => slot.start !== slotToRemove.start || slot.end !== slotToRemove.end)
      }));
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    if (!currentUser) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in to save changes." });
        setIsSaving(false);
        return;
    }
    try {
        const idToken = await currentUser.getIdToken();
        const response = await fetch('/api/doctor/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify({ schedule: availability, slotDuration }), // Send under 'schedule' key
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to save schedule');
        }
        toast({
            title: "Success",
            description: "Your schedule has been updated.",
        });
    } catch (error: any) {
        console.error("Error saving schedule:", error);
        toast({
            variant: "destructive",
            title: "Error",
            description: error.message || "Could not save your schedule.",
        });
    } finally {
        setIsSaving(false);
    }
  }
  
  if (loading) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Schedule Timings</h1>
            <Card>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Skeleton className="rounded-md w-full h-[300px]" />
                    <div className="space-y-6">
                        <Skeleton className="h-8 w-3/4" />
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Schedule Timings</h1>
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
             <div className="mt-6 space-y-2">
                <Label htmlFor="slot-duration">Appointment Slot Duration</Label>
                <Select value={slotDuration} onValueChange={setSlotDuration}>
                    <SelectTrigger id="slot-duration">
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
          </div>
          <div className="space-y-6">
            <CardHeader className="p-0">
              <CardTitle>
                Available Slots for <span className="text-cyan-500">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) || 'No date selected'}</span>
              </CardTitle>
            </CardHeader>

            <div className="space-y-4">
              {timeSlotsForSelectedDate.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {timeSlotsForSelectedDate.map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-cyan-400 text-white rounded-md px-3 py-1.5 text-sm"
                    >
                      <span>{formatTo12Hour(slot.start)} - {formatTo12Hour(slot.end)}</span>
                      <button onClick={() => handleRemoveTimeSlot(slot)} className="hover:bg-cyan-500 rounded-full p-0.5">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No time slots scheduled for this day.</p>
              )}
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-semibold">Add New Time Slot</h4>
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-2">
                  <label htmlFor="from-time" className="text-sm font-medium text-muted-foreground">From</label>
                  <Input 
                    id="from-time" 
                    type="time" 
                    value={newTimeSlot.from} 
                    onChange={(e) => setNewTimeSlot({...newTimeSlot, from: e.target.value})}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label htmlFor="to-time" className="text-sm font-medium text-muted-foreground">To</label>
                  <Input 
                    id="to-time" 
                    type="time" 
                    value={newTimeSlot.to} 
                    onChange={(e) => setNewTimeSlot({...newTimeSlot, to: e.target.value})}
                  />
                </div>
              </div>
              <Button onClick={handleAddTimeSlot} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Slot
              </Button>
            </div>
             <div className="flex justify-end pt-6 border-t">
                <Button onClick={handleSaveChanges} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
