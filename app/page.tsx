import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";

export default function HomePage() {
  return (
    <div className="container-x space-y-10 pt-6">
      <Hero />
      <HomeProducts />
    </div>
  );
}
