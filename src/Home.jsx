import React, { useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import StatsBar from '../components/StatsBar';
import ServicesSection from '../components/ServicesSection';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductModal from '../components/ProductModal';

export default function Home({ onNavigate }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="w-full">
      {/* 1. Immersive PGNCOM-style Hero Slider */}
      <HeroSlider onNavigate={onNavigate} />

      {/* 2. Asymmetrical Editorial About Section */}
      <AboutSection onNavigate={onNavigate} />

      {/* 3. Floating Stats Bar Card */}
      <StatsBar />

      {/* 4. Masonry Services Section */}
      <ServicesSection onNavigate={onNavigate} />

      {/* 5. Editorial Featured Products Grid */}
      <FeaturedProducts
        onSelectProduct={(product) => setSelectedProduct(product)}
        onNavigate={onNavigate}
      />

      {/* Interactive Detail Popup Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigate={onNavigate}
        />
      )}
    </div>
  );
}
