import { ReviewsList } from "@/components/admin/reviews/reviews-list"
import { ReviewsHeader } from "@/components/admin/reviews/reviews-header"

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <ReviewsHeader />
      <ReviewsList />
    </div>
  )
}
