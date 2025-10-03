export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  imageUrl?: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5218";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed with ${res.status}`);
  }
  return (await res.json()) as T;
}

export const api = {
  async listProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/api/products`, { cache: "no-store" });
    return handle<Product[]>(res);
  },
  async getProduct(id: number): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/products/${id}`, { cache: "no-store" });
    return handle<Product>(res);
  },
  async createProduct(formData: FormData): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/products`, { method: "POST", body: formData });
    return handle<Product>(res);
  },
  async updateProduct(id: number, formData: FormData): Promise<Product> {
    const res = await fetch(`${API_BASE}/api/products/${id}`, { method: "PUT", body: formData });
    return handle<Product>(res);
  },
  async deleteProduct(id: number): Promise<void> {
    const res = await fetch(`${API_BASE}/api/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
  },
};


