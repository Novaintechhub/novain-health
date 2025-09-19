
"use client";

import LandingHeader from "./landing-header";
import LandingFooter from "./landing-footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, ShieldAlert, Ambulance } from "lucide-react";

export default function EmergencyResponseInfo() {
  return (
    <div className="bg-white">
      <LandingHeader />
      <main>
        <section className="py-20 px-4 text-center bg-destructive text-white">
          <h1 className="text-5xl font-bold font-serif">Emergency Response</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            In case of a medical emergency, please follow the guidelines below.
          </p>
        </section>

        <section className="py-16 px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto space-y-8">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <ShieldAlert className="w-6 h-6" />
                            What Constitutes a Medical Emergency?
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            A medical emergency is a sudden and unforeseen injury or illness that requires immediate medical attention to prevent death or serious long-term disability. Examples include severe chest pain, difficulty breathing, uncontrolled bleeding, poisoning, or major injuries.
                        </p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Phone className="w-6 h-6" />
                            Immediate Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                            <li><strong>Dial Your Local Emergency Number:</strong> The first and most important step is to call your local emergency services (e.g., 911 in the US, 112 in the UK/EU, 199 in Nigeria).</li>
                            <li><strong>Stay Calm and Provide Information:</strong> Clearly state your location, the nature of the emergency, and the condition of the person.</li>
                            <li><strong>Do Not Move the Person:</strong> Unless they are in immediate danger, do not move someone who is seriously injured, especially with a suspected head or neck injury.</li>
                       </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ambulance className="w-6 h-6" />
                            Using NovainHealth in an Emergency
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                           <strong>NovainHealth is NOT a substitute for emergency services.</strong> Our platform is designed for non-emergency consultations. While we can provide guidance for urgent but non-life-threatening issues, you must always contact your local emergency services first in a true emergency.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
