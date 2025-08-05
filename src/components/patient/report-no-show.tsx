"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, CalendarClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ReportNoShow() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Report Submitted",
      description: "Your no-show report has been processed.",
    });
    router.push("/patients/appointments");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Report Doctor No-Show</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://placehold.co/80x80.png" alt="Dr. Darren Elder" data-ai-hint="male doctor" />
              <AvatarFallback>DE</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Appointment with Dr. Darren Elder</CardTitle>
              <p className="text-muted-foreground">On 12th October 2025, 4:00 PM</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            We are sorry to hear that your doctor did not attend the scheduled appointment. Please select one of the options below to resolve this issue.
          </p>
          <RadioGroup defaultValue="refund" className="space-y-4">
            <Label htmlFor="refund-option" className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
              <RadioGroupItem value="refund" id="refund-option" className="mt-1" />
              <div className="grid gap-1.5">
                  <div className="font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Get a Full Refund to Your Wallet
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The full amount of ₦200 will be credited to your in-app wallet immediately. You can use it for any future appointment.
                  </p>
              </div>
            </Label>
            <Label htmlFor="reschedule-option" className="flex items-start gap-4 rounded-lg border p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:bg-accent has-[[data-state=checked]]:border-primary">
                <RadioGroupItem value="reschedule" id="reschedule-option" className="mt-1" />
                <div className="grid gap-1.5">
                    <div className="font-semibold flex items-center gap-2">
                        <CalendarClock className="w-5 h-5 text-primary" />
                        Reschedule for Free
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Book a new appointment with Dr. Darren Elder for a future date at no additional cost.
                    </p>
                </div>
            </Label>
          </RadioGroup>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Confirm and Proceed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
