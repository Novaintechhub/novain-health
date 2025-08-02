"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Send } from "lucide-react";

const EarningCard = ({ label, value, icon, subtext }: { label: string, value: string, icon?: React.ReactNode, subtext: string }) => (
    <div className="flex flex-col p-4 rounded-lg bg-gray-50 flex-1">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        {icon && <div className="text-2xl font-bold">{icon}</div>}
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <p className="text-xs text-muted-foreground">{subtext}</p>
    </div>
);

export default function Payouts() {
  return (
    <div className="space-y-6">
        <div>
            <p className="text-sm text-muted-foreground">Home / Payouts</p>
            <h1 className="text-2xl font-bold">Payouts</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
            <EarningCard label="Wallet Balance" value="150,000.00" icon={<span className="text-2xl font-normal">₦</span>} subtext="One hundred and fifty thousand naira" />
            <EarningCard label="Total Withdrawal" value="65,000" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M12 2a5 5 0 0 0-5 5c0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3a5 5 0 0 0-5-5z"/><path d="M12 22a5 5 0 0 0 5-5c0-1.66-1.34-3-3-3h-4c-1.66 0-3 1.34-3 3a5 5 0 0 0 5 5z"/></svg>} subtext="" />
            <EarningCard label="Total Earnings" value="172,000" icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M12 2a5 5 0 0 0-5 5c0 1.66 1.34 3 3 3h4c1.66 0 3-1.34 3-3a5 5 0 0 0-5-5z"/><path d="M12 22a5 5 0 0 0 5-5c0-1.66-1.34-3-3-3h-4c-1.66 0-3 1.34-3 3a5 5 0 0 0 5 5z"/></svg>} subtext="After 20% commission" />
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Payouts</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-center text-muted-foreground py-16">
                    <p>No records found!</p>
                </div>
            </CardContent>
        </Card>

        <div className="space-y-4">
            <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 p-0">
                <Settings className="mr-2 h-5 w-5" />
                Setup payout account
            </Button>
            <br/>
            <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 p-0">
                <Send className="mr-2 h-5 w-5" />
                Place a withdrawal request
            </Button>
        </div>
    </div>
  );
}
