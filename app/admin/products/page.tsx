"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddProductForm from '@/components/admin/add-product'

export default function ProductsPage() {
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button 
          className="flex items-center gap-2" 
          onClick={() => setIsAddingProduct(true)}
        >
          <Plus size={16} />
          Add Product
        </Button>
      </div>
      
      {/* Product list */}
      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow p-6">
          <p className="text-muted-foreground">Your products will appear here</p>
        </div>
      </div>

      {/* Add Product Dialog */}
      <AddProductForm 
        isOpen={isAddingProduct} 
        onClose={() => setIsAddingProduct(false)} 
      />
    </div>
  )
}

