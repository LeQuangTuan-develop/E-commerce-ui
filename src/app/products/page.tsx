import ProductList from "@/components/ProductList";

const ProductPage = async ({ searchParams }:  { searchParams:  Promise<{ category: string }> }) => {
  const category = (await searchParams).category
  return (
    <div>
      <ProductList category={category} pageType="products" />
    </div>
  );
};

export default ProductPage;