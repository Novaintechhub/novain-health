
"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void; }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-8 w-8 cursor-pointer ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
        onClick={() => onRatingChange(i + 1)}
      />
    ))}
  </div>
);

export default function WriteReview() {
  const router = useRouter();
  const { toast } = useToast();
  const [rating, setRating] = React.useState(0);
  const [reviewText, setReviewText] = React.useState("");
  const [recommend, setRecommend] = React.useState(false);

  const handleSubmit = () => {
    // Logic to submit review would go here
    toast({
        title: "Review Submitted!",
        description: "Thank you for your feedback."
    });
    router.push('/patients/appointments');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Write a Review</h1>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://placehold.co/80x80.png" alt="Dr. Darren Elder" data-ai-hint="male doctor" />
              <AvatarFallback>DE</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Review for Dr. Darren Elder</CardTitle>
              <p className="text-muted-foreground">Completed on 12th October 2025</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="font-semibold">Your Rating</Label>
            <div className="mt-2">
              <StarRating rating={rating} onRatingChange={setRating} />
            </div>
          </div>
          <div>
            <Label htmlFor="review-text" className="font-semibold">Your Review</Label>
            <Textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              rows={5}
              className="mt-2"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="recommend" checked={recommend} onCheckedChange={(checked) => setRecommend(Boolean(checked))} />
            <Label htmlFor="recommend" className="flex items-center gap-2 text-sm font-normal">
              <ThumbsUp className="w-4 h-4 text-green-500" />
              I would recommend this doctor to a friend or family member.
            </Label>
          </div>
           <div className="flex justify-end">
            <Button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white">
              Submit Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
