import React, { useState } from 'react';
import { Shield, Code, Zap, Users, Check, X, CreditCard, Mail, Webhook } from 'lucide-react';

interface PaymentData {
  plan: string;
  price: number;
  duration: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

function App() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [generatedKey, setGeneratedKey] = useState('');
  const [formData, setFormData] = useState<PaymentData>({
    plan: '',
    price: 0,
    duration: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const plans = [
    { id: 'monthly', name: 'Monthly', price: 5, duration: '1 month', popular: false },
    { id: '6months', name: '6 Months', price: 10, duration: '6 months', popular: true },
    { id: 'yearly', name: 'Yearly', price: 20, duration: '1 year', popular: false },
    { id: 'lifetime', name: 'Lifetime', price: 25, duration: 'lifetime', popular: false }
  ];

  const features = [
    'Advanced rival tracking system',
    'Real-time notifications',
    'Custom alert configurations',
    'Multi-server support',
    'Automatic updates',
    '24/7 technical support'
  ];

  const generateKey = (length: number = 32) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#!$&';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result.match(/.{1,4}/g)?.join('-') || result;
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setFormData(prev => ({
      ...prev,
      plan: plan.name,
      price: plan.price,
      duration: plan.duration
    }));
    setShowPayment(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendWebhook = async (keyData: any) => {
    const webhookUrl = 'https://discord.com/api/webhooks/1420401860719673415/Igl3l0nG-khwx9xUc9FhaZy1N_LCo5rXzmv5MjXF5aOf4zk1PzCgkFVz3dBKtufLWZHf';
    
    const payload = {
      embeds: [
        {
          title: "🔑 New Key Registered",
          color: 0x000000,
          fields: [
            {
              name: "Duration",
              value: keyData.duration,
              inline: true
            },
            {
              name: "Email",
              value: keyData.email,
              inline: true
            },
            {
              name: "Key",
              value: `\`${keyData.key}\``,
              inline: false
            }
          ],
          timestamp: new Date().toISOString()
        }
      ]
    };

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Webhook error:', error);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const key = generateKey();
    setGeneratedKey(key);

    // Send webhook
    await sendWebhook({
      duration: formData.duration,
      email: formData.email,
      key: key
    });

    setIsProcessing(false);
    setPaymentComplete(true);
  };

  const resetPayment = () => {
    setShowPayment(false);
    setPaymentComplete(false);
    setSelectedPlan(null);
    setGeneratedKey('');
    setFormData({
      plan: '',
      price: 0,
      duration: '',
      email: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center mb-6 px-4 py-2 bg-gray-800 rounded-full border border-gray-700">
              <Shield className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-sm text-gray-300">Corruption IDE</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent animate-pulse">
              Corruption IDEE
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Best Rivals Script on the market.
            </p>
            <div className="flex justify-center space-x-8 mb-12">
              <div className="flex items-center">
                <Code className="w-5 h-5 mr-2 text-red-400" />
                <span className="text-gray-300">Advanced Scripts</span>
              </div>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-red-400" />
                <span className="text-gray-300">Real-time Processing</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-red-400" />
                <span className="text-gray-300">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Script Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-red-400 transition-all duration-300 hover:shadow-lg hover:shadow-red-400/20">
                <div className="flex items-center mb-4">
                  <Check className="w-5 h-5 mr-3 text-red-400 group-hover:scale-110 transition-transform" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Choose Your Plan</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Select the perfect plan for your needs. All plans include full access to the Rivals script and our premium support.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative p-8 rounded-lg border-2 transition-all duration-300 hover:scale-105 cursor-pointer ${
                plan.popular 
                  ? 'bg-gradient-to-b from-red-900/20 to-gray-800 border-red-400 shadow-lg shadow-red-400/20' 
                  : 'bg-gray-800 border-gray-700 hover:border-gray-600'
              }`} onClick={() => handlePlanSelect(plan)}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      POPULAR
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-1">USD</span>
                  </div>
                  <p className="text-gray-400 mb-6">Valid for {plan.duration}</p>
                  <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-red-500/30'
                      : 'bg-white text-black hover:bg-gray-200'
                  }`}>
                    Get Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg max-w-md w-full p-8 border border-gray-700 relative">
            {!paymentComplete ? (
              <>
                <button
                  onClick={resetPayment}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Complete Purchase</h3>
                  <p className="text-gray-400">
                    {selectedPlan?.name} - ${selectedPlan?.price} USD
                  </p>
                </div>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={formData.cardholderName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-red-400 focus:outline-none transition-colors"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </>
                    ) : (
                      `Pay $${selectedPlan?.price} USD`
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Payment Successful!</h3>
                <p className="text-gray-400 mb-6">
                  Your license key has been generated and sent to your email address.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
                  <p className="text-sm text-gray-400 mb-2">Your License Key:</p>
                  <code className="text-red-400 font-mono text-lg break-all">{generatedKey}</code>
                </div>
                <div className="flex items-center justify-center text-sm text-gray-400 mb-6">
                  <Webhook className="w-4 h-4 mr-2" />
                  Discord notification sent
                </div>
                <button
                  onClick={resetPayment}
                  className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 mr-2 text-red-400" />
              <span className="text-xl font-bold text-white">Corruption</span>
            </div>
            <p className="text-gray-400 mb-4">Professional script development team</p>
            <p className="text-sm text-gray-500">
              © 2025 Corruption IDE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
