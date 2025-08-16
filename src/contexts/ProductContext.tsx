import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as XLSX from 'xlsx';

export interface StockBySize {
  [size: string]: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  original_price?: number | null;
  description?: string | null;
  categories: string[];
  primary_image: string;
  secondary_image?: string | null;
  is_new: boolean;
  is_sale: boolean;
  is_limited_edition: boolean;
  is_exclusive: boolean;
  stock_by_size: StockBySize; // Changed from stock_quantity
  created_at: string;
  updated_at: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface ProductContextType {
  state: ProductState;
  fetchProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  adjustProductStock: (id: string, size: string, quantityChange: number) => Promise<boolean>;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  exportToExcel: () => void;
  importFromExcel: (file: File) => Promise<boolean>;
  getTotalStock: (product: Product) => number;
  getAvailableSizes: (product: Product) => string[];
}

const ProductContext = createContext<ProductContextType | null>(null);

// Default products with size-specific stock
const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Essential Oversized Tee',
    price: 29.25,
    original_price: null,
    description: 'A comfortable oversized tee made from premium cotton',
    categories: ['T-Shirts', 'New Arrivals', 'Men'],
    primary_image: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    secondary_image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    is_new: true,
    is_sale: false,
    is_limited_edition: false,
    is_exclusive: false,
    stock_by_size: {
      'S': 5,
      'M': 8,
      'L': 7,
      'XL': 5
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Structured Blazer',
    price: 126.75,
    original_price: null,
    description: 'A modern blazer with clean lines and perfect tailoring',
    categories: ['Outerwear', 'Men'],
    primary_image: 'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    secondary_image: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    is_new: false,
    is_sale: false,
    is_limited_edition: false,
    is_exclusive: false,
    stock_by_size: {
      'S': 3,
      'M': 4,
      'L': 5,
      'XL': 3
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Wide Leg Trousers',
    price: 81.25,
    original_price: null,
    description: 'Comfortable wide-leg trousers for a relaxed yet polished look',
    categories: ['Bottoms', 'Women'],
    primary_image: 'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    secondary_image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    is_new: false,
    is_sale: false,
    is_limited_edition: false,
    is_exclusive: false,
    stock_by_size: {
      'XS': 2,
      'S': 6,
      'M': 7,
      'L': 5
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Football Jersey',
    price: 48.75,
    original_price: 61.75,
    description: 'Official team jersey with moisture-wicking technology',
    categories: ['Fútbol', 'Men'],
    primary_image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    secondary_image: 'https://images.pexels.com/photos/1040424/pexels-photo-1040424.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    is_new: false,
    is_sale: true,
    is_limited_edition: false,
    is_exclusive: false,
    stock_by_size: {
      'S': 8,
      'M': 10,
      'L': 7,
      'XL': 5
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Silk Slip Dress',
    price: 107.25,
    original_price: null,
    description: 'Elegant silk dress perfect for any occasion',
    categories: ['Dresses', 'Women', 'New Arrivals'],
    primary_image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    secondary_image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    is_new: true,
    is_sale: false,
    is_limited_edition: false,
    is_exclusive: false,
    stock_by_size: {
      'XS': 2,
      'S': 3,
      'M': 4,
      'L': 3
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Minimal Hoodie',
    price: 55.25,
    original_price: null,
    description: 'Soft and cozy hoodie with minimalist design',
    categories: ['Hoodies', 'Men', 'New Arrivals'],
    primary_image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    secondary_image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop',
    is_new: true,
    is_sale: false,
    is_limited_edition: false,
    is_exclusive: false,
    stock_by_size: {
      'S': 4,
      'M': 6,
      'L': 5,
      'XL': 3
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ProductState>({
    products: [],
    loading: false,
    error: null,
  });

  const fetchProducts = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const savedProducts = localStorage.getItem('fortysix_products');
      let products = defaultProducts;
      
      if (savedProducts) {
        const parsedProducts = JSON.parse(savedProducts);
        // Migrate old products with single stock_quantity to new format
        products = parsedProducts.map((product: any) => {
          if (product.stock_quantity !== undefined && !product.stock_by_size) {
            // Migrate old format to new format
            return {
              ...product,
              stock_by_size: {
                'S': Math.floor(product.stock_quantity * 0.2),
                'M': Math.floor(product.stock_quantity * 0.3),
                'L': Math.floor(product.stock_quantity * 0.3),
                'XL': Math.floor(product.stock_quantity * 0.2)
              },
              categories: Array.isArray(product.categories) 
                ? product.categories 
                : product.category 
                  ? [product.category] 
                  : ['Uncategorized']
            };
          }
          return {
            ...product,
            categories: Array.isArray(product.categories) 
              ? product.categories 
              : product.category 
                ? [product.category] 
                : ['Uncategorized']
          };
        });
      } else {
        localStorage.setItem('fortysix_products', JSON.stringify(defaultProducts));
      }

      setState(prev => ({
        ...prev,
        products,
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      setState(prev => ({
        ...prev,
        error: 'Failed to fetch products',
        loading: false,
      }));
    }
  };

  const saveProducts = (products: Product[]) => {
    localStorage.setItem('fortysix_products', JSON.stringify(products));
    setState(prev => ({ ...prev, products }));
  };

  const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
    try {
      const newProduct: Product = {
        ...product,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      console.log('Creating new product:', newProduct);
      console.log('Product categories:', newProduct.categories);
      console.log('Is exclusive:', newProduct.is_exclusive);

      const updatedProducts = [newProduct, ...state.products];
      saveProducts(updatedProducts);
      return true;
    } catch (error) {
      console.error('Error creating product:', error);
      setState(prev => ({ ...prev, error: 'Failed to create product' }));
      return false;
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>): Promise<boolean> => {
    try {
      const updatedProducts = state.products.map(product =>
        product.id === id
          ? { ...product, ...updates, updated_at: new Date().toISOString() }
          : product
      );

      saveProducts(updatedProducts);
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      setState(prev => ({ ...prev, error: 'Failed to update product' }));
      return false;
    }
  };

  const deleteProduct = async (id: string): Promise<boolean> => {
    try {
      const updatedProducts = state.products.filter(product => product.id !== id);
      saveProducts(updatedProducts);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      setState(prev => ({ ...prev, error: 'Failed to delete product' }));
      return false;
    }
  };

  const adjustProductStock = async (id: string, size: string, quantityChange: number): Promise<boolean> => {
    try {
      const updatedProducts = state.products.map(product => {
        if (product.id === id) {
          const currentStock = product.stock_by_size[size] || 0;
          const newStock = Math.max(0, currentStock + quantityChange);
          
          return {
            ...product,
            stock_by_size: {
              ...product.stock_by_size,
              [size]: newStock
            },
            updated_at: new Date().toISOString()
          };
        }
        return product;
      });

      saveProducts(updatedProducts);
      
      // Log stock adjustment for debugging
      const product = state.products.find(p => p.id === id);
      if (product) {
        const oldStock = product.stock_by_size[size] || 0;
        const newStock = Math.max(0, oldStock + quantityChange);
        console.log(`Stock adjusted for ${product.name} (${size}): ${oldStock} → ${newStock} (${quantityChange > 0 ? '+' : ''}${quantityChange})`);
      }
      
      return true;
    } catch (error) {
      console.error('Error adjusting product stock:', error);
      setState(prev => ({ ...prev, error: 'Failed to adjust product stock' }));
      return false;
    }
  };

  const getProductById = (id: string): Product | undefined => {
    return state.products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string): Product[] => {
    if (category === 'all') return state.products;
    return state.products.filter(product => product.categories.includes(category));
  };

  const searchProducts = (query: string): Product[] => {
    const searchTerm = query.toLowerCase();
    return state.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.categories.some(cat => cat.toLowerCase().includes(searchTerm)) ||
      product.description?.toLowerCase().includes(searchTerm)
    );
  };

  const getTotalStock = (product: Product): number => {
    return Object.values(product.stock_by_size).reduce((total, stock) => total + stock, 0);
  };

  const getAvailableSizes = (product: Product): string[] => {
    return Object.entries(product.stock_by_size)
      .filter(([_, stock]) => stock > 0)
      .map(([size, _]) => size);
  };

  const exportToExcel = () => {
    const productsForExport = state.products.map(product => ({
      ...product,
      categories: product.categories.join(', '),
      stock_by_size: JSON.stringify(product.stock_by_size), // Serialize as JSON string
      total_stock: getTotalStock(product)
    }));

    const worksheet = XLSX.utils.json_to_sheet(productsForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    
    // Auto-size columns
    const cols = [
      { wch: 10 }, // ID
      { wch: 30 }, // Name
      { wch: 10 }, // Price
      { wch: 12 }, // Original Price
      { wch: 50 }, // Description
      { wch: 25 }, // Categories
      { wch: 60 }, // Primary Image
      { wch: 60 }, // Secondary Image
      { wch: 8 },  // Is New
      { wch: 8 },  // Is Sale
      { wch: 12 }, // Is Limited Edition
      { wch: 10 }, // Is Exclusive
      { wch: 30 }, // Stock by Size
      { wch: 12 }, // Total Stock
      { wch: 20 }, // Created At
      { wch: 20 }, // Updated At
    ];
    worksheet['!cols'] = cols;
    
    XLSX.writeFile(workbook, `fortysix-products-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const importFromExcel = async (file: File): Promise<boolean> => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      // Validate and transform data
      const importedProducts: Product[] = jsonData.map((row, index) => ({
        id: row.id || (Date.now() + index).toString(),
        name: row.name || 'Unnamed Product',
        price: parseFloat(row.price) || 0,
        original_price: row.original_price ? parseFloat(row.original_price) : null,
        description: row.description || null,
        categories: row.categories 
          ? row.categories.split(',').map((cat: string) => cat.trim())
          : ['Uncategorized'],
        primary_image: row.primary_image || '',
        secondary_image: row.secondary_image || null,
        is_new: Boolean(row.is_new),
        is_sale: Boolean(row.is_sale),
        is_limited_edition: Boolean(row.is_limited_edition),
        is_exclusive: Boolean(row.is_exclusive),
        stock_by_size: row.stock_by_size 
          ? JSON.parse(row.stock_by_size) 
          : { 'S': 0, 'M': 0, 'L': 0, 'XL': 0 }, // Parse JSON string or default
        created_at: row.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      saveProducts(importedProducts);
      return true;
    } catch (error) {
      console.error('Error importing products:', error);
      setState(prev => ({ ...prev, error: 'Failed to import products' }));
      return false;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{
      state,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct,
      adjustProductStock,
      getProductById,
      getProductsByCategory,
      searchProducts,
      exportToExcel,
      importFromExcel,
      getTotalStock,
      getAvailableSizes,
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};