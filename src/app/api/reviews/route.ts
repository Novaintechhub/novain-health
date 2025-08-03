
import { NextResponse } from 'next/server';

const reviews = [
  {
    name: "Vera Ogechi, Lagos",
    reviewedDate: "Reviewed 2 Days ago",
    reviewDate: "17th January 2025",
    rating: 5,
    comment:
      "Dr. Susan was incredibly professional and kind. The consultation was seamless, and he explained everything clearly. I felt confident about my treatment plan. Highly recommended!",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman smiling",
  },
  {
    name: "Towning Zearman, New York",
    reviewedDate: "17th January 2025",
    rating: 4,
    comment:
      "Dr. Susan was thorough and attentive during our video consultation. The only issue was a slight delay in starting the session, but overall, a great experience.",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman portrait",
  },
  {
    name: "Amina Suliat, Kano",
    reviewedDate: "Reviewed 6 Days ago",
    rating: 4,
    comment:
      "Very patient and understanding! Dr. Susan answered all my questions, even though I had a lot. The only improvement would be better audio during the call.",
    avatarUrl: "https://placehold.co/80x80.png",
    avatarHint: "woman traditional",
  },
];

export async function GET() {
  return NextResponse.json(reviews);
}
