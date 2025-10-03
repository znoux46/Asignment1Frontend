import { api } from "@/lib/api";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = await api.getProduct(Number(id));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <div className="flex gap-2">
          <Link href={`/products/${product.id}/edit`} className="rounded border px-3 py-1.5 text-sm">Edit</Link>
          <DeleteButton id={product.id} />
          <Link href={`/`} className="rounded border px-3 py-1.5 text-sm">Back</Link>
        </div>
      </div>
      {product.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={product.imageUrl} alt={product.name} className="w-full max-w-xl rounded" />
      ) : null}
      <p className="text-gray-700">{product.description}</p>
      <p className="font-medium">${product.price.toFixed(2)}</p>
    </div>
  );
}


