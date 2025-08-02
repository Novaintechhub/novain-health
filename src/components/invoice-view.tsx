
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Printer } from "lucide-react";

const DoccureLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="150" height="40" viewBox="0 0 150 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M43.719 12.868h-5.65V6.726h5.65v6.142zm2.825 0h5.65V6.726h-5.65v6.142zM57.844 6.726h-5.65v18.428h5.65V6.726zM69.169 12.868h-5.65V6.726h5.65v6.142zM32.394 6.726H21.09v18.428h11.304V6.726zm-2.825 12.286H23.915V12.87h5.654v6.142zM12.719 6.726H1.414v18.428h11.305V6.726zm-2.825 12.286H4.239V12.87h5.655v6.142zM74.819 6.726l-4.25 9.172-4.225-9.172h-5.65l7.9 18.428h4.225l7.925-18.428h-5.925z" fill="#0DE3B5"></path>
        <path d="M126.96 17.143c0-3.357-2.825-5.928-5.65-5.928s-5.65 2.571-5.65 5.928c0 3.358 2.825 5.929 5.65 5.929s5.65-2.571 5.65-5.929zm-16.95 0c0-7.07 5.65-12.009 11.3-12.009s11.3 4.938 11.3 12.009-5.65 12.008-11.3 12.008-11.3-4.938-11.3-12.008z" fill="#1B90FF"></path>
        <path d="M101.385 6.726h5.65v18.428h-5.65z" fill="#1B90FF"></path>
        <path d="M86.31 6.726h-5.65v18.428h11.3V6.726H86.31zm0 12.286V12.87h2.824v6.142H86.31z" fill="#1B90FF"></path>
        <path d="M149.255 25.154l-7.075-7.071-2.225 2.225 7.075 7.071a2.5 2.5 0 003.55 0c.975-.975.975-2.55 0-3.525z" fill="#1B90FF"></path>
        <path d="M142.205 18.083l-1.125-1.125-9.9 9.9 1.125 1.125a2.5 2.5 0 003.55 0l6.35-6.35z" fill="#1B90FF"></path>
    </svg>
)

export default function InvoiceView() {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-4 sm:p-8">
        <div className="flex justify-end gap-2 mb-4 print:hidden">
            <Button variant="outline"><Send className="mr-2 h-4 w-4" /> Send</Button>
            <Button onClick={handlePrint}><Printer className="mr-2 h-4 w-4" /> Print</Button>
        </div>

        <Card className="shadow-lg mx-auto max-w-4xl p-8 border">
            <CardContent className="space-y-8">
                <header className="flex justify-between items-start">
                    <div>
                        <DoccureLogo />
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold uppercase">Invoice</h2>
                        <p className="text-muted-foreground">Order: #00124</p>
                        <p className="text-muted-foreground">Issued: 20/07/2019</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h3 className="font-semibold mb-2">Invoice From</h3>
                        <p className="font-bold">Dr. Darren Elder</p>
                        <p className="text-muted-foreground text-sm">806 Twin Willow Lane, Old Forge,</p>
                        <p className="text-muted-foreground text-sm">Newyork, USA</p>
                    </div>
                    <div className="text-right">
                        <h3 className="font-semibold mb-2">Invoice To</h3>
                        <p className="font-bold">Walter Roberson</p>
                        <p className="text-muted-foreground text-sm">299 Star Trek Drive, Panama City,</p>
                        <p className="text-muted-foreground text-sm">Florida, 32405, USA</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <p className="font-bold">Debit Card</p>
                    <p className="text-muted-foreground text-sm">XXXXXXXXXXXX-2541</p>
                    <p className="text-muted-foreground text-sm">HDFC Bank</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                            <tr className="border-b">
                                <th className="p-3 text-left font-semibold">Description</th>
                                <th className="p-3 text-center font-semibold">Quantity</th>
                                <th className="p-3 text-center font-semibold">VAT</th>
                                <th className="p-3 text-right font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3">General Consultation</td>
                                <td className="p-3 text-center">1</td>
                                <td className="p-3 text-center">₦0</td>
                                <td className="p-3 text-right">₦100</td>
                            </tr>
                            <tr>
                                <td className="p-3">Video Call Booking</td>
                                <td className="p-3 text-center">1</td>
                                <td className="p-3 text-center">₦0</td>
                                <td className="p-3 text-right">₦250</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end">
                    <div className="w-full max-w-xs space-y-2">
                        <div className="flex justify-between">
                            <span className="font-semibold">Subtotal:</span>
                            <span>₦350</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-semibold">Discount:</span>
                            <span>-10%</span>
                        </div>
                        <hr/>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total Amount:</span>
                            <span>₦315</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-2">Other information</h3>
                    <p className="text-muted-foreground text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed dictum ligula, cursus blandit risus. Maecenas eget metus non tellus dignissim aliquam ut a ex. Maecenas sed vehicula dui, ac suscipit lacus. Sed finibus leo vitae lorem interdum, eu scelerisque tellus fermentum. Curabitur sit amet lacinia lorem. Nullam finibus pellentesque libero.</p>
                </div>

            </CardContent>
        </Card>
    </div>
  );
}
