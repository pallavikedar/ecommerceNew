// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { BACKEND_BASE } from "@/lib/backend";
// import Image from "next/image";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [token, setToken] = useState<string | null>(null);
//   const [processing, setProcessing] = useState(false);
//   const [cartItems, setCartItems] = useState<any[]>([]);

//   const shipping = 99;
//   const subtotal = cartItems.reduce(
//     (sum, item) =>
//       sum + (item.price || item.variant?.discountedPrice || 0) * (item.quantity || 1),
//     0
//   );
//   const total = subtotal + shipping;

//   // ✅ Load token and cart data from sessionStorage
//   useEffect(() => {
//     const userToken = localStorage.getItem("userToken");
//     if (!userToken) {
//       router.push("/login");
//       return;
//     }

//     setToken(userToken);

//     const storedCart = sessionStorage.getItem("checkoutData");
//     if (storedCart) {
//       setCartItems(JSON.parse(storedCart));
//     } else {
//       router.push("/cart"); // redirect if no cart data found
//     }
//   }, [router]);

//   if (!token || !cartItems.length)
//     return (
//       <main className="container mx-auto px-4 py-10 text-center">
//         <p className="text-muted-foreground">Loading checkout...</p>
//       </main>
//     );

//   // ✅ Checkout form submission
//   async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setProcessing(true);

//     const formData = new FormData(e.currentTarget);
//     const addressData = {
//       fullName: formData.get("name"),
//       street: formData.get("address"),
//       city: formData.get("city"),
//       state: formData.get("state"),
//       zipCode: formData.get("zip"),
//       country: formData.get("country"),
//       phoneNumber: formData.get("phone"),
//     };

//     try {
//       const addressRes = await fetch(`${BACKEND_BASE}/Address/add`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(addressData),
//       });

//       if (!addressRes.ok) throw new Error("Failed to add address");
//       const address = await addressRes.json();
//       const shippingAddressId = address?.id;

//       // ✅ Create Razorpay order
//       const orderRes = await fetch(`${BACKEND_BASE}/order/verify`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           amount: total * 100,
//           currency: "INR",
//         }),
//       });

//       const orderData = await orderRes.json();
//       const razorpayOrderId = orderData.razorpayOrderId;

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount: total * 100,
//         currency: "INR",
//         name: "Your Store",
//         description: "Order Payment",
//         order_id: razorpayOrderId,
//         handler: async function (response: any) {
//           const verifyRes = await fetch(`${BACKEND_BASE}/order/verify`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               razorpayOrderId: response.razorpay_order_id,
//               razorpayPaymentId: response.razorpay_payment_id,
//               razorpaySignature: response.razorpay_signature,
//             }),
//           });

//           if (verifyRes.ok) {
//             // ✅ Place order
//             const placeRes = await fetch(`${BACKEND_BASE}/api/order/place`, {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//               },
//               body: JSON.stringify({
//                 shippingAddressId,
//                 paymentMethod: "Razorpay",
//                 items: cartItems.map((item) => ({
//                   productId: item.productId || item.product?.id,
//                   variantId: item.variant?.id || 0,
//                   quantity: item.quantity,
//                 })),
//               }),
//             });

//             if (placeRes.ok) {
//               sessionStorage.removeItem("checkoutData");
//               router.push("/success");
//             } else {
//               alert("Failed to place order");
//             }
//           } else {
//             alert("Payment verification failed");
//           }
//         },
//         theme: { color: "#D63384" },
//       };

//       const razorpay = new (window as any).Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error(error);
//       alert("Something went wrong.");
//     } finally {
//       setProcessing(false);
//     }
//   }

//   return (
//     <main className="container mx-auto px-4 py-10">
//       <h1 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
//         Checkout
//       </h1>

//       <form
//         onSubmit={onSubmit}
//         className="grid grid-cols-1 gap-8 lg:grid-cols-3"
//       >
//         {/* Left - shipping details */}
//         <section className="space-y-4 lg:col-span-2">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//             <div>
//               <Label htmlFor="name">Full Name</Label>
//               <Input id="name" name="name" required />
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone</Label>
//               <Input id="phone" name="phone" required />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="address">Street Address</Label>
//             <Textarea id="address" name="address" rows={3} required />
//           </div>

//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//             <div>
//               <Label htmlFor="city">City</Label>
//               <Input id="city" name="city" required />
//             </div>
//             <div>
//               <Label htmlFor="state">State</Label>
//               <Input id="state" name="state" required />
//             </div>
//             <div>
//               <Label htmlFor="zip">ZIP</Label>
//               <Input id="zip" name="zip" required />
//             </div>
//           </div>

//           <div>
//             <Label htmlFor="country">Country</Label>
//             <Input id="country" name="country" required />
//           </div>

//           <div className="pt-2">
//             <Button
//               disabled={processing}
//               type="submit"
//               className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
//             >
//               {processing ? "Processing..." : "Pay Now"}
//             </Button>
//           </div>
//         </section>

//         {/* Right - Order summary */}
//         <aside className="space-y-3 rounded-lg border p-4 h-fit">
//           {cartItems.map((item, i) => (
//             <div key={i} className="flex items-center gap-4">
//               <Image
//                 src={item.imageUrls || item.product?.image || "/placeholder.svg"}
//                 alt={item.productName || "Product"}
//                 width={60}
//                 height={60}
//                 className="rounded"
//               />
//               <div className="flex-1">
//                 <p className="text-sm font-medium">{item.productName}</p>
//                 <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
//               </div>
//               <span className="text-sm font-semibold">
//                 ₹
//                 {(
//                   (item.price || item.variant?.discountedPrice || 0) *
//                   item.quantity
//                 ).toFixed(2)}
//               </span>
//             </div>
//           ))}

//           <div className="border-t pt-3 space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{subtotal.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span>₹{shipping}</span>
//             </div>
//             <div className="flex justify-between font-semibold">
//               <span>Total</span>
//               <span>₹{total.toFixed(2)}</span>
//             </div>
//           </div>
//         </aside>
//       </form>
//     </main>
//   );
// }








"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BACKEND_BASE } from "@/lib/backend";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const shipping = 99;
  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + (item.price || item.variant?.discountedPrice || 0) * (item.quantity || 1),
    0
  );
  const total = subtotal + shipping;

  // ✅ Load token and cart data from sessionStorage
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      router.push("/login");
      return;
    }

    setToken(userToken);

    const storedCart = sessionStorage.getItem("checkoutData");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    } else {
      router.push("/cart"); // redirect if no cart data found
    }
  }, [router]);

  if (!token || !cartItems.length)
    return (
      <main className="container mx-auto px-4 py-10 text-center">
        <p className="text-muted-foreground">Loading checkout...</p>
      </main>
    );

  // ✅ Only call /Address/add API when clicking "Save Address"
  async function handleSaveAddress(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProcessing(true);

    const formData = new FormData(e.currentTarget);
    const addressData = {
      fullName: formData.get("name"),
      street: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zip"),
      country: formData.get("country"),
      phoneNumber: formData.get("phone"),
    };

    try {
      const res = await fetch(`${BACKEND_BASE}/Address/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("✅ Address added successfully:", data);
        alert("Address added successfully!");
      } else {
        const err = await res.json();
        console.error("❌ Error adding address:", err);
        alert("Failed to add address. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong while adding address.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Checkout
      </h1>

      <form
        onSubmit={handleSaveAddress}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        {/* Left - shipping details */}
        <section className="space-y-4 lg:col-span-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" required />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Street Address</Label>
            <Textarea id="address" name="address" rows={3} required />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" required />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" name="state" required />
            </div>
            <div>
              <Label htmlFor="zip">ZIP</Label>
              <Input id="zip" name="zip" required />
            </div>
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" required />
          </div>

          <div className="pt-2 flex gap-3">
            <Button
              disabled={processing}
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
            >
              {processing ? "Saving..." : "Save Address"}
            </Button>

            <Button
              type="button"
              onClick={() => router.push("/cart")}
              variant="outline"
            >
              Back to Cart
            </Button>
          </div>
        </section>

        {/* Right - Order summary */}
        <aside className="space-y-3 rounded-lg border p-4 h-fit">
          {cartItems.map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <Image
                src={item.imageUrls || item.product?.image || "/placeholder.svg"}
                alt={item.productName || "Product"}
                width={60}
                height={60}
                className="rounded"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold">
                ₹
                {(
                  (item.price || item.variant?.discountedPrice || 0) *
                  item.quantity
                ).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}
