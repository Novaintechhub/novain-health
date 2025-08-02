
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

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
            <p className="text-sm text-muted-foreground"><Link href="/doctor">Home</Link> / Payouts</p>
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
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 p-0">
                        <Settings className="mr-2 h-5 w-5" />
                        Setup payout account
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Setup Payout Account</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Input id="bank-name" placeholder="Enter bank name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input id="account-number" placeholder="Enter account number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="account-name">Account Holder Name</Label>
                            <Input id="account-name" placeholder="Enter account holder name" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button style={{ backgroundColor: '#46C8F5', color: 'white' }}>Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <br/>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost" className="text-cyan-500 hover:text-cyan-600 p-0">
                        <Send className="mr-2 h-5 w-5" />
                        Place a withdrawal request
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Request Withdrawal</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">Amount (Naira)</Label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">₦</span>
                                <Input id="amount" placeholder="" className="pl-8" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="withdrawal-account">Choose withdrawal account</Label>
                            <Select>
                                <SelectTrigger id="withdrawal-account">
                                    <SelectValue placeholder="Select account" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="account1">** ** **** 4267 - GTBank</SelectItem>
                                    <SelectItem value="account2">** ** **** 8921 - First Bank</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Enter Password</Label>
                            <Input id="password" type="password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button style={{ backgroundColor: '#46C8F5', color: 'white' }}>Submit</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    </div>
  );
}
