"use client"

export default function BannerMarquee() {
  return (
    <section aria-label="Promotions" className="mt-6 w-full border-y bg-muted/40">
      <div className="relative overflow-hidden">
        <div
          className="animate-[marquee_20s_linear_infinite] whitespace-nowrap py-3 text-center text-sm font-medium"
          style={{
            // keyframes are provided by tw-animate-css, fallback below
            // @ts-ignore
            ["--tw-animate-duration" as any]: "20s",
          }}
        >
          <span className="mx-6">Free shipping on orders above ₹499</span>
          <span className="mx-6">New arrivals every week</span>
          <span className="mx-6">Exclusive online offers</span>
          <span className="mx-6">Cruelty-free & high-performance</span>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          `,
        }}
      />
    </section>
  )
}
