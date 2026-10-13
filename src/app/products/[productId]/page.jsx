import Link from 'next/link';

// 1. Dinamik Meta Taglar (Title va Description yaratish)
export async function generateMetadata({ params }) {
  const { productId } = await params;
  
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
    const product = await res.json();

    if (!product || !product.title) {
      return {
        title: "Mahsulot topilmadi",
      };
    }

    return {
      title: `${product.title} | Bizning Do'kon`,
      description: product.description || "Mahsulot haqida batafsil ma'lumot",
      openGraph: {
        images: [product.images?.[0] || ''],
      },
    };
  } catch (error) {
    return {
      title: "Mahsulot sahifasi",
    };
  }
}

// 2. Asosiy Sahifa (Server Component)
export default async function ProductDetailPage({ params }) {
  const { productId } = await params;

  let product = null;
  
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
    if (res.ok) {
      product = await res.json();
    }
  } catch (err) {
    console.error("Xatolik:", err);
  }

  if (!product || !product.id) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mahsulot topilmadi</h2>
        <Link href="/products" className="text-indigo-600 underline font-medium">
          ← Orqaga qaytish
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* Orqaga qaytish tugmasi */}
      <Link 
        href="/products"
        className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
      >
        ← Orqaga qaytish
      </Link>

      {/* Mahsulot kartasi */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Mahsulot rasmi */}
          <div className="space-y-4">
            <img 
              src={product.images?.[0]} 
              alt={product.title} 
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />
          </div>

          {/* Mahsulot tafsilotlari */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                {product.category?.name || "Kategoriya"}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-2 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between border-t pt-4">
              <span className="text-2xl font-extrabold text-indigo-600">
                ${product.price}
              </span>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-lg shadow-indigo-200 cursor-pointer">
                Savatga qo'shish
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}