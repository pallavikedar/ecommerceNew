"use client"

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AddProductForm from '@/components/admin/add-product'

export default function ProductsPage() {
  const [isAddingProduct, setIsAddingProduct] = useState(false)

  return (
    <div className="p-6">
     

      {/* Add Product Dialog */}
      <AddProductForm 
        isOpen={isAddingProduct} 
        onClose={() => setIsAddingProduct(false)} 
      />
    </div>
  )
}

