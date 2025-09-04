
import { NextResponse } from 'next/server';

const medicalRecordsData = [
    {
        id: "#MR-0010",
        date: "14 Nov 2023",
        description: "General Checkup",
        doctor: {
            name: "Dr. Darren Elder",
            specialty: "Cardiology",
            clinic: "NovainHealth Medical Center",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "male doctor",
        },
        notes: "Patient reported mild chest pain and shortness of breath. ECG and blood pressure readings are normal. Advised lifestyle changes including diet and exercise. Follow-up in 3 months.",
        attachment: {
            name: "ECG_Report_14-11-23.pdf",
            url: "#"
        }
    },
    {
        id: "#MR-0009",
        date: "13 Nov 2023",
        description: "Blood Test Results",
        doctor: {
            name: "Dr. Linda Tobin",
            specialty: "Endocrinology",
            clinic: "NovainHealth Diagnostic Center",
            avatarUrl: "https://placehold.co/80x80.png",
            avatarHint: "female doctor smiling",
        },
        notes: "Reviewed patient's recent blood test results. All markers are within the normal range. Patient advised to continue current medication and re-test in 6 months.",
        attachment: {
            name: "Blood_Test_Results_13-11-23.pdf",
            url: "#"
        }
    },
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const recordId = params.id;
  const record = medicalRecordsData.find(r => r.id === recordId);

  if (!record) {
    return NextResponse.json({ error: "Medical record not found" }, { status: 404 });
  }

  return NextResponse.json(record);
}
