
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Trash2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

type Review = {
  id: string;
  patientName: string;
  patientAvatar: string;
  patientAvatarHint: string;
  doctorName: string;
  doctorAvatar: string;
  doctorAvatarHint: string;
  rating: number;
  description: string;
  date: string;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch('/api/admin-reviews');
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Reviews List</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Patient</TableHead>
                            <TableHead>Doctor</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.map(review => (
                            <TableRow key={review.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={review.patientAvatar} alt={review.patientName} data-ai-hint={review.patientAvatarHint} />
                                            <AvatarFallback>{review.patientName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{review.patientName}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={review.doctorAvatar} alt={review.doctorName} data-ai-hint={review.doctorAvatarHint} />
                                            <AvatarFallback>{review.doctorName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{review.doctorName}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <StarRating rating={review.rating} />
                                </TableCell>
                                <TableCell>{review.description}</TableCell>
                                <TableCell>{review.date}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    </Card>
  );
}
