"use client";

import { Product } from "@/lib/types";
import { Package, CheckCircle, XCircle } from "lucide-react";

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="mt-4 text-center py-4 text-muted text-sm">
        <Package size={24} className="mx-auto mb-2 opacity-50" />
        No products found.
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-foreground mb-3">
        Products ({products.length})
      </h4>
      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 rounded-lg bg-background border border-border"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {product.name}
              </p>
              <p className="text-xs text-muted">{product.category}</p>
            </div>
            <div className="flex items-center gap-3 ml-3">
              <span className="text-sm font-medium text-foreground">
                €{product.price.toFixed(2)}
              </span>
              {product.in_stock ? (
                <CheckCircle size={16} className="text-accent flex-shrink-0" />
              ) : (
                <XCircle size={16} className="text-red-400 flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
