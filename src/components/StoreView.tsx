/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  Minus, 
  Plus, 
  ChevronRight, 
  Check, 
  Lock, 
  Sparkles, 
  X, 
  CreditCard, 
  MapPin, 
  Mail, 
  Phone,
  Clock,
  Settings,
  Package
} from 'lucide-react';
import { Product, CartItem, Order, ProductCategory, AdminRole } from '../types';

interface StoreViewProps {
  products: Product[];
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  currentRole: AdminRole | 'Fan';
  onOpenAdmin: () => void;
}

export default function StoreView({
  products,
  cart,
  setCart,
  orders,
  setOrders,
  currentRole,
  onOpenAdmin
}: StoreViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProductCategory>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Active product details modal states
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState<'Store' | 'Details' | 'Razorpay' | 'Tracking'>('Store');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCouponName, setAppliedCouponName] = useState('');
  const [couponError, setCouponError] = useState('');

  // Shipping details
  const [shippingName, setShippingName] = useState('');
  const [shippingEmail, setShippingEmail] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');

  // Active placed order tracking state
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);

  const categories: ('All' | ProductCategory)[] = ['All', 'Jerseys', 'Hoodies', 'Caps', 'Mousepads', 'Accessories'];

  const filteredProducts = products.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  // Cart Management
  const handleAddToCart = (product: Product, size: string, color: string) => {
    const existing = cart.find(item => 
      item.product.id === product.id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );

    if (existing) {
      setCart(cart.map(item => 
        item.product.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1, selectedSize: size, selectedColor: color }]);
    }
    
    // Close detail modal
    setSelectedProduct(null);
  };

  const handleUpdateQuantity = (idx: number, delta: number) => {
    const updated = [...cart];
    updated[idx].quantity += delta;
    if (updated[idx].quantity <= 0) {
      updated.splice(idx, 1);
    }
    setCart(updated);
  };

  const handleRemoveFromCart = (idx: number) => {
    const updated = [...cart];
    updated.splice(idx, 1);
    setCart(updated);
  };

  // Math
  const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const totalDiscount = Math.floor(subtotal * appliedDiscount);
  const finalTotal = subtotal - totalDiscount;

  // Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'APEX20') {
      setAppliedDiscount(0.20);
      setAppliedCouponName('APEX20 (20% OFF)');
      setCouponError('');
    } else if (couponCode.trim().toUpperCase() === 'CHAMPION') {
      setAppliedDiscount(0.15);
      setAppliedCouponName('CHAMPION (15% OFF)');
      setCouponError('');
    } else {
      setCouponError('INVALID COUPON CODE. TRY APEX20');
    }
  };

  // Checkout flows
  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('Details');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('Razorpay');
  };

  const handleCompleteRazorpayPayment = () => {
    // Generate a new Order
    const newOrder: Order = {
      id: `APX-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      discount: totalDiscount,
      total: finalTotal,
      paymentStatus: 'Paid',
      orderStatus: 'Placed',
      customerDetails: {
        name: shippingName,
        email: shippingEmail,
        address: shippingAddress,
        city: shippingCity,
        pincode: shippingPincode,
        phone: shippingPhone
      },
      trackingNumber: `TRACK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      couponApplied: appliedCouponName,
      createdAt: new Date().toISOString()
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('teamapex_orders', JSON.stringify(updatedOrders));

    // Clear cart and state
    setCart([]);
    setTrackedOrder(newOrder);
    setCheckoutStep('Tracking');

    // Reset details
    setShippingName('');
    setShippingEmail('');
    setShippingPhone('');
    setShippingAddress('');
    setShippingCity('');
    setShippingPincode('');
    setCouponCode('');
    setAppliedDiscount(0);
    setAppliedCouponName('');
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-28" id="store-view">
      
      {/* 1. STORE FRONT DESIGN */}
      {checkoutStep === 'Store' && (
        <div className="space-y-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="font-mono text-xs text-apex-orange font-bold tracking-widest uppercase">APEX GEAR LAB</span>
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mt-1">
                OFFICIAL APPARELS
              </h1>
              <p className="text-gray-400 text-sm max-w-xl mt-1">
                Sublimated micro-mesh jersey fabrics, oversized fleece hoods, and aiming sleeves designed for athletes.
              </p>
            </div>

            {/* Admin shortcut */}
            {currentRole !== 'Fan' && (
              <button 
                onClick={onOpenAdmin}
                className="flex items-center gap-1.5 px-4 py-2 bg-apex-orange/10 border border-apex-orange/30 text-apex-orange hover:bg-apex-orange hover:text-white transition-all text-xs font-mono rounded"
              >
                <Settings className="w-4 h-4" />
                <span>MANAGE PRODUCTS & ORDERS</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Catalog Filter Column */}
            <div className="space-y-6 lg:col-span-1">
              <div className="glassmorphism p-5 rounded-2xl border-white/5 space-y-4">
                <h3 className="font-display font-black text-xs text-white tracking-widest uppercase border-l-2 border-apex-orange pl-3">
                  CATEGORIES
                </h3>
                <div className="flex flex-col gap-1 text-xs font-mono">
                  {categories.map((cat) => {
                    const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded flex items-center justify-between transition-colors ${
                          selectedCategory === cat
                            ? 'bg-apex-orange/10 text-apex-orange font-bold border-l-2 border-apex-orange'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="uppercase">{cat}</span>
                        <span className="text-[10px] text-gray-500">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Promo offer box */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-apex-orange/20 to-transparent p-5 border border-apex-orange/30 space-y-3">
                <Sparkles className="w-6 h-6 text-apex-orange animate-bounce" />
                <h4 className="font-display font-black text-sm text-white uppercase tracking-tight">LEGION PROMO DISCOUNT</h4>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Enter coupon code <span className="text-white font-mono font-bold">APEX20</span> during checkout to score 20% off your entire pro bundle.
                </p>
              </div>
            </div>

            {/* Catalog Grid Column */}
            <div className="lg:col-span-3 space-y-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="store-catalog-grid">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setSelectedSize(p.variants.sizes ? p.variants.sizes[0] : '');
                      setSelectedColor(p.variants.colors ? p.variants.colors[0].name : '');
                    }}
                    className="glassmorphism rounded-2xl overflow-hidden cursor-pointer border-white/5 hover:border-apex-orange/30 transition-all duration-300 relative group flex flex-col justify-between"
                  >
                    {/* Image Block */}
                    <div className="aspect-[4/5] bg-cyber-dark overflow-hidden relative">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      
                      {p.originalPrice && (
                        <span className="absolute top-4 left-4 bg-apex-orange text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                          SAVE ₹{p.originalPrice - p.price}
                        </span>
                      )}
                    </div>

                    {/* Metadata Content */}
                    <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-gray-500 uppercase">{p.category}</span>
                        <h3 className="font-display font-black text-sm text-white group-hover:text-apex-orange transition-colors line-clamp-1 uppercase tracking-tight">
                          {p.name}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-baseline gap-1.5 font-mono">
                          <span className="text-white font-bold text-sm">₹{p.price}</span>
                          {p.originalPrice && (
                            <span className="text-gray-500 line-through text-[10px]">₹{p.originalPrice}</span>
                          )}
                        </div>

                        <span className="font-mono text-[10px] text-apex-orange group-hover:underline flex items-center gap-1 font-bold">
                          BUY GEAR <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Active Cart Quick Summary Footer */}
          {cart.length > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-cyber-dark/95 border border-apex-orange/40 rounded-full px-6 py-4 shadow-2xl flex items-center gap-6 z-40 backdrop-blur-md max-w-lg w-11/12 justify-between border-glow">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-apex-orange text-white relative">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 bg-white text-apex-orange font-mono font-black text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-cyber-dark">
                    {cart.reduce((a, b) => a + b.quantity, 0)}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-gray-500 leading-none">SUBTOTAL</span>
                  <span className="block text-sm font-display font-black text-white leading-none pt-1">₹{subtotal}</span>
                </div>
              </div>

              <button
                onClick={handleStartCheckout}
                className="px-5 py-2.5 rounded-full bg-apex-orange text-white font-display font-black tracking-wider text-xs border-glow hover:bg-apex-orange/90 transition-all flex items-center gap-1.5"
              >
                <span>CHECKOUT PRO ORDER</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      )}

      {/* 2. PRODUCT DETAILS MODAL VIEW */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-cyber-dark border border-apex-orange/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/75 hover:bg-apex-orange hover:text-white transition-colors text-gray-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Column */}
            <div className="aspect-[4/5] bg-black">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Config details Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="bg-apex-orange/10 text-apex-orange border border-apex-orange/20 text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                    {selectedProduct.category}
                  </span>
                  <h2 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-tight pt-1">
                    {selectedProduct.name}
                  </h2>
                </div>

                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-white font-black text-lg">₹{selectedProduct.price}</span>
                  {selectedProduct.originalPrice && (
                    <span className="text-gray-500 line-through text-xs">₹{selectedProduct.originalPrice}</span>
                  )}
                </div>

                <p className="text-gray-400 text-xs leading-relaxed font-sans">
                  {selectedProduct.description}
                </p>

                {/* Sizes Selector */}
                {selectedProduct.variants.sizes && (
                  <div className="space-y-2">
                    <span className="block font-mono text-[9px] text-gray-500 tracking-widest uppercase">SELECT SIZE</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.variants.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`w-10 py-1.5 rounded font-mono text-xs border text-center transition-colors ${
                            selectedSize === sz
                              ? 'bg-apex-orange border-apex-orange text-white font-bold'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors Selector */}
                {selectedProduct.variants.colors && (
                  <div className="space-y-2">
                    <span className="block font-mono text-[9px] text-gray-500 tracking-widest uppercase">SELECT COLOR</span>
                    <div className="flex items-center gap-2">
                      {selectedProduct.variants.colors.map((cl) => (
                        <button
                          key={cl.name}
                          onClick={() => setSelectedColor(cl.name)}
                          className={`w-6 h-6 rounded-full border-2 transition-all relative ${
                            selectedColor === cl.name ? 'border-apex-orange scale-110' : 'border-transparent'
                          }`}
                          style={{ backgroundColor: cl.hex }}
                          title={cl.name}
                        >
                          {selectedColor === cl.name && (
                            <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto filter drop-shadow-md" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to cart */}
              <button
                onClick={() => handleAddToCart(selectedProduct, selectedSize, selectedColor)}
                className="w-full py-4 rounded-xl bg-apex-orange hover:bg-apex-orange/95 text-white font-display font-black tracking-wider text-xs border-glow flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>ADD GEAR TO CART</span>
              </button>

            </div>

          </div>
        </div>
      )}

      {/* 3. CHECKOUT CUSTOMER DETAILS FORM STEP */}
      {checkoutStep === 'Details' && (
        <div className="max-w-2xl mx-auto glassmorphism p-6 sm:p-10 rounded-3xl border-white/5 space-y-8">
          
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h2 className="font-display font-black text-xl text-white uppercase tracking-tight flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-apex-orange" />
              <span>SHIPPING & ORDER DETAILS</span>
            </h2>
            <button 
              onClick={() => setCheckoutStep('Store')}
              className="text-xs font-mono text-gray-500 hover:text-white"
            >
              CANCEL
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6 text-xs sm:text-sm">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  placeholder="EX: NAMAN MATHUR"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Email address</label>
                <input
                  type="email"
                  required
                  value={shippingEmail}
                  onChange={(e) => setShippingEmail(e.target.value)}
                  placeholder="EX: APEX@GMAIL.COM"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Phone Coordinates</label>
                <input
                  type="tel"
                  required
                  value={shippingPhone}
                  onChange={(e) => setShippingPhone(e.target.value)}
                  placeholder="EX: +91 98765 43210"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">City</label>
                <input
                  type="text"
                  required
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="EX: MUMBAI"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="sm:col-span-2 space-y-2">
                <label className="block text-[9px] text-gray-500 tracking-wider uppercase">Shipping Physical Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="EX: FLAT 4B, BANDRA WEST APARTMENTS"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] text-gray-500 tracking-wider uppercase">Pincode / Zip</label>
                <input
                  type="text"
                  required
                  value={shippingPincode}
                  onChange={(e) => setShippingPincode(e.target.value)}
                  placeholder="EX: 400050"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full"
                />
              </div>
            </div>

            {/* Coupons inside Checkout form */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <label className="block font-mono text-[9px] text-gray-500 tracking-wider uppercase">Legion Coupon Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="EX: APEX20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-apex-orange/70 w-full font-mono uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded bg-white/10 hover:bg-white/15 text-white font-mono text-xs"
                >
                  APPLY
                </button>
              </div>
              {appliedCouponName && (
                <span className="block text-xs text-emerald-400 font-bold font-mono">COUPON SUCCESS: {appliedCouponName}</span>
              )}
              {couponError && (
                <span className="block text-xs text-red-400 font-bold font-mono">{couponError}</span>
              )}
            </div>

            {/* Active Pricing Sheet */}
            <div className="bg-black/40 border border-white/5 p-4 rounded-xl font-mono text-xs space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>SUBTOTAL VALUE:</span>
                <span>₹{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>COUPON DISCOUNT:</span>
                  <span>- ₹{totalDiscount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500">
                <span>SHIPPING CHARGES:</span>
                <span className="text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-white/5">
                <span>FINAL TOTAL PAYABLE:</span>
                <span className="text-apex-orange text-glow">₹{finalTotal}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-apex-orange hover:bg-apex-orange/95 text-white font-display font-black tracking-wider text-xs border-glow flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>PROCEED TO RAZORPAY SECURE GATEWAY</span>
            </button>

          </form>

        </div>
      )}

      {/* 4. RAZORPAY SIMULATION POPUP */}
      {checkoutStep === 'Razorpay' && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white text-gray-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
            
            {/* Razorpay Brand Header */}
            <div className="bg-[#1A2E70] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white p-1 rounded-full flex items-center justify-center w-8 h-8 shrink-0">
                  <CreditCard className="w-4.5 h-4.5 text-[#1A2E70]" />
                </div>
                <div>
                  <span className="block font-black tracking-wider text-sm leading-none">Razorpay Secure</span>
                  <span className="block text-[9px] text-gray-300 leading-none pt-0.5">TEAM APEX POWERED MERCHANT</span>
                </div>
              </div>
              <button 
                onClick={() => setCheckoutStep('Details')}
                className="text-xs text-gray-300 hover:text-white"
              >
                BACK
              </button>
            </div>

            {/* Merchant Details */}
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                <div>
                  <span className="block text-[10px] text-gray-400 leading-none">ORDER REFERENCE</span>
                  <span className="block font-mono text-sm font-bold pt-1">APX-SIM-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-gray-400 leading-none">AMOUNT PAYABLE</span>
                  <span className="block font-display font-black text-lg text-[#1A2E70] pt-1">₹{finalTotal}.00</span>
                </div>
              </div>

              {/* Simulated Card Forms */}
              <div className="space-y-4">
                <h4 className="font-mono text-[9px] text-gray-400 tracking-wider uppercase">SIMULATED PAYMENT PORTAL</h4>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2 text-xs">
                  <p className="text-gray-600 leading-relaxed font-sans">
                    This is a **secure simulated payment flow** representing the requested Razorpay checkout integration for international and domestic fans.
                  </p>
                  <p className="text-gray-600 leading-relaxed font-sans font-bold">
                    No actual financial charges will occur. Click the authorize button below to finalize your mock purchase.
                  </p>
                </div>
              </div>
            </div>

            {/* Authorize payment footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={handleCompleteRazorpayPayment}
                className="w-full py-3.5 rounded-xl bg-[#288AE2] hover:bg-[#2072BD] text-white font-display font-bold text-xs tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <Lock className="w-4 h-4" />
                <span>AUTHORIZE SIMULATED PAYMENT</span>
              </button>
              <p className="text-[10px] text-center text-gray-400 font-mono">
                Secured by Razorpay API v3 • SSL Encrypted
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 5. SUCCESS & ORDER TRACKING DASHBOARD */}
      {checkoutStep === 'Tracking' && trackedOrder && (
        <div className="max-w-2xl mx-auto glassmorphism p-6 sm:p-10 rounded-3xl border-white/5 space-y-8" id="order-tracking-dashboard">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/25 border border-emerald-500/50 flex items-center justify-center mx-auto animate-bounce">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="font-mono text-xs text-emerald-400 font-bold tracking-widest uppercase">TRANSACTION AUTHORIZED</span>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase">
              ORDER CONFIRMED!
            </h2>
            <p className="text-gray-400 text-xs max-w-md mx-auto">
              Your simulated payment processed successfully. An invoice has been emailed to <span className="text-white">{trackedOrder.customerDetails.email}</span>.
            </p>
          </div>

          {/* Tracking Step progress bar */}
          <div className="space-y-4">
            <h3 className="font-mono text-[9px] text-gray-500 tracking-widest uppercase text-center">SHIPPING PIPELINE STATUS</h3>
            
            <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px] relative">
              {[
                { label: 'PLACED', status: 'Placed', isDone: true, icon: Check },
                { label: 'PROCESSING', status: 'Processing', isDone: false, icon: Clock },
                { label: 'SHIPPED', status: 'Shipped', isDone: false, icon: Package },
                { label: 'DELIVERED', status: 'Delivered', isDone: false, icon: Check }
              ].map((step, idx) => (
                <div key={idx} className="space-y-2 relative z-10">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center mx-auto ${
                    step.isDone 
                      ? 'bg-apex-orange border-apex-orange text-white' 
                      : 'bg-cyber-dark border-white/10 text-gray-500'
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className={`block font-bold uppercase ${step.isDone ? 'text-apex-orange' : 'text-gray-500'}`}>{step.label}</span>
                </div>
              ))}
              
              {/* Connecting line */}
              <div className="absolute top-4 left-1/8 right-1/8 h-0.5 bg-white/5 -z-10"></div>
            </div>
          </div>

          {/* Order particulars sheet */}
          <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-4 font-mono text-xs text-gray-300">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">ORDER NUMBER:</span>
              <span className="text-white font-bold">{trackedOrder.id}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">TRACKING CODES:</span>
              <span className="text-apex-orange text-glow font-bold">{trackedOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-gray-500">SHIPPING TO:</span>
              <span className="text-white text-right">{trackedOrder.customerDetails.name}<br />{trackedOrder.customerDetails.address}, {trackedOrder.customerDetails.city}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span className="text-gray-500">TOTAL CHARGED:</span>
              <span className="text-white font-black text-sm">₹{trackedOrder.total} INR</span>
            </div>
          </div>

          <button
            onClick={() => setCheckoutStep('Store')}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-display font-black text-xs tracking-wider transition-colors"
          >
            RETURN TO MERCHANDISE CATOLOG
          </button>

        </div>
      )}

    </div>
  );
}
