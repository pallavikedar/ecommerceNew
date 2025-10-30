"use client"

import { Star, Trash2, CheckCircle } from "lucide-react"

const reviewsData = [
  {
    id: 1,
    product: "Wireless Headphones",
    customer: "John Doe",
    rating: 5,
    date: "Jun 20, 2024",
    review: "Excellent product! Great sound quality and very comfortable to wear.",
    status: "Approved",
  },
  {
    id: 2,
    product: "USB-C Cable",
    customer: "Sarah Smith",
    rating: 4,
    date: "Jun 19, 2024",
    review: "Good quality cable, works as expected. Delivery was fast.",
    status: "Approved",
  },
  {
    id: 3,
    product: "Phone Case",
    customer: "Mike Johnson",
    rating: 3,
    date: "Jun 18, 2024",
    review: "Average product. Does the job but could be better quality.",
    status: "Pending",
  },
  {
    id: 4,
    product: "Screen Protector",
    customer: "Emma Wilson",
    rating: 2,
    date: "Jun 17, 2024",
    review: "Not satisfied with this product. It scratched my screen.",
    status: "Pending",
  },
]

export function ReviewsList() {
  return (
    <div className="space-y-4">
      {reviewsData.map((review) => (
        <div key={review.id} className="bg-white rounded-lg border border-border shadow-sm p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-foreground">{review.product}</h3>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                By {review.customer} on {review.date}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                review.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {review.status}
            </span>
          </div>
          <p className="text-sm text-foreground mb-4">{review.review}</p>
          <div className="flex items-center gap-2">
            {review.status === "Pending" && (
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded transition-colors">
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
            )}
            <button className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
