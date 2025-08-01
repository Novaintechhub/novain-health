"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Star, Search, MessageSquare, Flag } from "lucide-react";

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

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default function Reviews() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reviews</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Reviews</CardTitle>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeholder="Search Reviews" className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reviews</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                  <SelectItem value="highest">Highest</SelectItem>
                  <SelectItem value="lowest">Lowest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {reviews.map((review, index) => (
              <div key={index} className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={review.avatarUrl} alt={review.name} data-ai-hint={review.avatarHint} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
                    <div>
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {review.reviewedDate}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {review.comment}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-600">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Flag className="w-4 h-4 mr-1" />
                      Report
                    </Button>
                  </div>
                  {index < reviews.length - 1 && <hr className="mt-6"/>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
