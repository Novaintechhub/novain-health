"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Checkout() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://placehold.co/64x64.png" alt="Dr. Tosin Adebayo" data-ai-hint="female doctor" />
                  <AvatarFallback>TA</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold">Dr. Tosin Adebayo</h3>
                  <p className="text-sm text-muted-foreground">MBBS, DOMS, MS - Ophthalmology</p>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>11th Dec 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>10:00 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span>New Patient</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span>₦150.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Booking Fee</span>
                  <span>₦10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-green-600">-₦5.00</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₦155.00</span>
              </div>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                Proceed to Pay
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
