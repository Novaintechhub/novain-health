
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { AlertTriangle, PhoneCall } from "lucide-react";

export default function EmergencyResponseInfo() {
  return (
    <div className="bg-gray-50/50">
      <LandingHeader />
      <main>
        <section className="relative py-20 sm:py-28 lg:py-32 text-center bg-red-600">
            <div className="relative z-10 px-4">
                <AlertTriangle className="mx-auto h-16 w-16 text-white" />
                <h1 className="text-4xl sm:text-5xl font-bold text-white font-serif mt-4">Emergency Response Information</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-red-100">
                    Important information for medical emergencies.
                </p>
            </div>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold">Disclaimer</h2>
                    <p className="mt-2">NovainHealth is intended for non-emergency consultations. If you are experiencing a medical emergency, please do not use this service. Instead, you should immediately contact your local emergency services.</p>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-center">What To Do In An Emergency</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">1. Call Emergency Services Immediately</h3>
                            <p className="mt-2 text-muted-foreground">This is the most critical step. Provide your location and a clear description of the emergency.</p>
                            <div className="mt-4 flex items-center gap-3 bg-gray-100 p-3 rounded-md">
                                <PhoneCall className="w-6 h-6 text-red-500"/>
                                <span className="text-lg font-bold">911 (or your local emergency number)</span>
                            </div>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">2. Do Not Delay</h3>
                            <p className="mt-2 text-muted-foreground">In a life-threatening situation, every second counts. Do not attempt to book an appointment or wait for an online consultation.</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">3. Follow Operator Instructions</h3>
                            <p className="mt-2 text-muted-foreground">The emergency operator will provide instructions. Follow them carefully until help arrives.</p>
                        </div>
                         <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">4. Inform a Family Member or Friend</h3>
                            <p className="mt-2 text-muted-foreground">If possible, let someone know what is happening so they can assist or provide information to responders.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
