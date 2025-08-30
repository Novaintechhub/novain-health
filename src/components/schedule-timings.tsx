
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, PlusCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";


type Availability = {
  [date: string]: string[];
};

export default function ScheduleTimings() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [availability, setAvailability] = useState<Availability>({});
  const [newTimeSlot, setNewTimeSlot] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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
          setAvailability(data);
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
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, toast]);

  const selectedDateString = selectedDate ? selectedDate.toISOString().split('T')[0] : "";
  const timeSlotsForSelectedDate = availability[selectedDateString] || [];

  const handleAddTimeSlot = () => {
    if (newTimeSlot.from && newTimeSlot.to && selectedDateString) {
      const formattedSlot = `${newTimeSlot.from} - ${newTimeSlot.to}`;
      const updatedSlots = [...timeSlotsForSelectedDate, formattedSlot].sort();
      setAvailability(prev => ({
        ...prev,
        [selectedDateString]: updatedSlots
      }));
      setNewTimeSlot({ from: "", to: "" });
    }
  };

  const handleRemoveTimeSlot = (slotToRemove: string) => {
    if (selectedDateString) {
      setAvailability(prev => ({
        ...prev,
        [selectedDateString]: prev[selectedDateString].filter(slot => slot !== slotToRemove)
      }));
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const user = auth.currentUser;
    if (!user) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in to save changes." });
        setIsSaving(false);
        return;
    }
    try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/doctor/schedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`
            },
            body: JSON.stringify(availability),
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
                      <span>{slot}</span>
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
