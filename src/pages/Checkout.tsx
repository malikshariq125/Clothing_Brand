import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, CheckCircle2, CreditCard, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const Checkout = () => {
  const { cart, total, subtotal, shipping, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem('aura_checkout_session');
    return saved ? JSON.parse(saved) : {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: 'card'
    };
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    sessionStorage.setItem('aura_checkout_session', JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(2);
      window.scrollTo(0, 0);
    } else {
      processOrder();
    }
  };

  const processOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();
      sessionStorage.setItem('aura_last_order', JSON.stringify({
        id: Math.random().toString(36).substr(2, 9).toUpperCase(),
        date: new Date().toLocaleDateString(),
        total: total
      }));
    }, 2000);
  };

  if (cart.length === 0 && !isCompleted) {
    return (
      <div className="pt-40 pb-24 px-6 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">No items to checkout</h1>
        <Link to="/shop" className="text-gold font-bold uppercase tracking-widest text-xs border-b border-gold pb-1">
          Return to Shop
        </Link>
      </div>
    );
  }

  if (isCompleted) {
    const orderInfo = JSON.parse(sessionStorage.getItem('aura_last_order') || '{}');
    return (
      <div className="pt-40 pb-24 px-6 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-beige w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-gold"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h1 className="text-4xl font-serif font-bold mb-4">Thank You for Your Order</h1>
        <p className="text-gray-500 mb-8">Your order <span className="text-ink font-bold">#{orderInfo.id}</span> has been placed successfully. We've sent a confirmation email to {formData.email}.</p>
        
        <div className="bg-beige p-8 mb-12 text-left">
          <h3 className="font-bold uppercase tracking-widest text-xs mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Date:</span>
              <span>{orderInfo.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Paid:</span>
              <span className="font-bold">${orderInfo.total?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping to:</span>
              <span>{formData.address}, {formData.city}</span>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-ink text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-colors"
        >
          Back to Home <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => step > 1 ? setStep(1) : navigate('/cart')}
              className="p-2 hover:bg-beige rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-3xl font-serif font-bold">Checkout</h1>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                step >= 1 ? "bg-ink text-white" : "bg-gray-100 text-gray-400"
              )}>1</span>
              <span className={cn("text-xs font-bold uppercase tracking-widest", step === 1 ? "text-ink" : "text-gray-400")}>Shipping</span>
            </div>
            <div className="h-px w-12 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                step >= 2 ? "bg-ink text-white" : "bg-gray-100 text-gray-400"
              )}>2</span>
              <span className={cn("text-xs font-bold uppercase tracking-widest", step === 2 ? "text-ink" : "text-gray-400")}>Payment</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                      <input
                        required
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Shipping Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                      placeholder="Street address, P.O. box, company name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">City</label>
                      <input
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Postal Code</label>
                      <input
                        required
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-ink text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Continue to Payment <ArrowRight size={18} />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Select Payment Method</label>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard size={20} /> },
                        { id: 'cod', name: 'Cash on Delivery', icon: <Truck size={20} /> },
                        { id: 'bank', name: 'Bank Transfer', icon: <ShieldCheck size={20} /> }
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={cn(
                            "flex items-center justify-between p-6 border cursor-pointer transition-all",
                            formData.paymentMethod === method.id ? "border-gold bg-beige/50" : "border-gray-100 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={formData.paymentMethod === method.id}
                              onChange={handleInputChange}
                              className="w-4 h-4 accent-gold"
                            />
                            <div className="flex items-center gap-3">
                              {method.icon}
                              <span className="text-sm font-medium">{method.name}</span>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.paymentMethod === 'card' && (
                    <div className="space-y-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Card Number</label>
                        <input
                          type="text"
                          className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Expiry Date</label>
                          <input
                            type="text"
                            className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                            placeholder="MM / YY"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">CVV</label>
                          <input
                            type="text"
                            className="w-full border-b border-gray-200 py-3 focus:border-gold outline-none transition-colors"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-ink text-white py-5 text-sm font-bold uppercase tracking-widest hover:bg-gold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      <>Complete Purchase <ArrowRight size={18} /></>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-beige p-8 sticky top-32">
            <h2 className="text-xl font-serif font-bold mb-8">Your Order</h2>
            
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-white overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                      Qty: {item.quantity} / {item.selectedSize}
                    </p>
                    <p className="text-sm font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between items-end pt-4">
                <span className="text-lg font-serif font-bold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[10px] text-gray-400 uppercase tracking-widest">
              <ShieldCheck size={16} className="text-gold" />
              <span>Secure 256-bit SSL Encrypted Payment</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
