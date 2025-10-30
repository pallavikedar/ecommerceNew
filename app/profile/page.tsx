"use client"

import { useEffect, useState } from "react"
import { loadProfile, saveProfile, type Profile } from "@/components/site/cart-store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({ name: "", email: "" })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setProfile(loadProfile())
  }, [])

  function onSubmit(formData: FormData) {
    const next: Profile = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      city: String(formData.get("city") || ""),
      country: String(formData.get("country") || ""),
      zip: String(formData.get("zip") || ""),
    }
    saveProfile(next)
    setProfile(next)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <form action={onSubmit} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" defaultValue={profile.name} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" defaultValue={profile.email} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={profile.phone || ""} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" rows={3} defaultValue={profile.address || ""} />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" defaultValue={profile.city || ""} />
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" defaultValue={profile.country || ""} />
        </div>
        <div>
          <Label htmlFor="zip">ZIP</Label>
          <Input id="zip" name="zip" defaultValue={profile.zip || ""} />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit">{saved ? "Saved!" : "Save Profile"}</Button>
        </div>
      </form>
    </main>
  )
}
