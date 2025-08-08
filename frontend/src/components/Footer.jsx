import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import { useState } from 'react';
import { AnimatePresence, motion as m } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
};

const Footer = () => {
  // Chatbot state
  const [chatOpen, setChatOpen] = useState(false);
  const [mode, setMode] = useState(null); // null | 'appointment' | 'assist'
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', email: '', datetime: '' });
  const [confirmed, setConfirmed] = useState(false);
  const [assistInput, setAssistInput] = useState('');
  const [assistHistory, setAssistHistory] = useState([]); // {q, a}

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else {
      setConfirmed(true);
      setTimeout(() => {
        setChatOpen(false);
        setTimeout(() => {
          setStep(0);
          setForm({ name: '', email: '', datetime: '' });
          setConfirmed(false);
          setMode(null);
        }, 500);
      }, 2000);
    }
  };

  // Simple FAQ for website assistance
  const faq = [
    { q: /order|buy|purchase/i, a: 'To order, browse our collection, add items to your cart, and proceed to checkout.' },
    { q: /return|refund/i, a: 'We offer easy returns within 7 days of delivery. See our Return Policy page for details.' },
    { q: /shipping|delivery/i, a: 'We ship across India. Delivery usually takes 3-7 business days.' },
    { q: /contact|support/i, a: 'You can reach us via the Contact page or email us at support@aruzzclothing.com.' },
    { q: /appointment/i, a: 'To book an appointment, please select the Book Appointment option in this chat.' },
    { q: /payment|pay/i, a: 'We accept all major cards, UPI, and wallets. Payment is secure and easy.' },
    { q: /location|store/i, a: 'We are based in Pune, Maharashtra. Visit our About or Contact page for more info.' },
  ];

  const getAssistAnswer = (question) => {
    for (let f of faq) {
      if (f.q.test(question)) return f.a;
    }
    return "Sorry, I couldn't find an answer. Please visit our Contact page for more help!";
  };

  const handleAssistSend = (e) => {
    e.preventDefault();
    if (!assistInput.trim()) return;
    const answer = getAssistAnswer(assistInput);
    setAssistHistory([...assistHistory, { q: assistInput, a: answer }]);
    setAssistInput('');
  };
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200 overflow-hidden mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
        >
          {/* About Us */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0 }}>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed">
              Aruzz Clothing is committed to bringing you the best in fashion with top quality and hassle-free shopping experience.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-black transition-all duration-200">Home</a></li>
              <li><a href="/collection" className="hover:text-black transition-all duration-200">Collection</a></li>
              <li><a href="/about" className="hover:text-black transition-all duration-200">About Us</a></li>
              <li><a href="/contact" className="hover:text-black transition-all duration-200">Contact</a></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm mb-3">Subscribe to get updates on new arrivals & offers.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-auto flex-1 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          {/* Social Media */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 text-gray-600 text-xl">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  className="transition-all duration-200 hover:text-black"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Developed by <span className="font-semibold text-gray-700">Aruz</span>. All rights reserved. &copy; {new Date().getFullYear()}
        </motion.div>

        {/* Chatbot Floating Button & Window */}
        <div className="fixed z-50 bottom-6 right-6 flex flex-col items-end">
          <AnimatePresence>
            {chatOpen && (
              <m.div
                key="chatbot"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-80 max-w-xs bg-white/90 rounded-2xl shadow-2xl border border-gray-200 mb-3 overflow-hidden backdrop-blur-md"
              >
                <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-3 flex items-center justify-between">
                  <span className="font-semibold">Aruzz Bot</span>
                  <button onClick={() => { setChatOpen(false); setTimeout(()=>{ setMode(null); setStep(0); setForm({ name: '', email: '', datetime: '' }); setConfirmed(false); setAssistHistory([]); setAssistInput(''); }, 400); }} className="ml-2 text-lg hover:text-gray-300">&times;</button>
                </div>
                <div className="p-4 min-h-[180px] flex flex-col gap-3">
                  {/* Mode selection */}
                  {!mode && (
                    <>
                      <div className="text-base font-semibold mb-2">Hi! How can I help you today?</div>
                      <button onClick={() => setMode('appointment')} className="mb-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-900 hover:to-gray-700 transition">Book Appointment</button>
                      <button onClick={() => setMode('assist')} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition">Website Assistance</button>
                    </>
                  )}
                  {/* Appointment Booking Flow */}
                  {mode === 'appointment' && !confirmed && (
                    <>
                      {step === 0 && (
                        <>
                          <div className="text-sm font-medium mb-1">Hi! 👋 What's your name?</div>
                          <input
                            name="name"
                            value={form.name}
                            onChange={handleInput}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80"
                            placeholder="Your name"
                            autoFocus
                          />
                      <button
                        className="mt-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-900 hover:to-gray-700 transition disabled:opacity-50"
                        disabled={!form.name.trim()}
                        onClick={handleNext}
                      >Next</button>
                        </>
                      )}
                      {step === 1 && (
                        <>
                          <div className="text-sm font-medium mb-1">Great, {form.name.split(' ')[0] || 'there'}! What's your email?</div>
                          <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleInput}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80"
                            placeholder="you@email.com"
                            autoFocus
                          />
                      <button
                        className="mt-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-900 hover:to-gray-700 transition disabled:opacity-50"
                        disabled={!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)}
                        onClick={handleNext}
                      >Next</button>
                        </>
                      )}
                      {step === 2 && (
                        <>
                          <div className="text-sm font-medium mb-1">When would you like to book your appointment?</div>
                          <input
                            name="datetime"
                            type="datetime-local"
                            value={form.datetime}
                            onChange={handleInput}
                            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white/80"
                            min={new Date().toISOString().slice(0,16)}
                            autoFocus
                          />
                      <button
                        className="mt-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 py-2 rounded-lg hover:from-gray-900 hover:to-gray-700 transition disabled:opacity-50"
                        disabled={!form.datetime}
                        onClick={handleNext}
                      >Book</button>
                        </>
                      )}
                    </>
                  )}
                  {mode === 'appointment' && confirmed && (
                    <m.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center min-h-[120px]"
                    >
                      <div className="text-2xl mb-2">🎉</div>
                      <div className="text-center text-base font-semibold mb-1">Appointment Booked!</div>
                      <div className="text-xs text-gray-500">Thank you, {form.name.split(' ')[0] || 'friend'}.<br/>We'll contact you at {form.email}.</div>
                    </m.div>
                  )}
                  {/* Website Assistance Flow */}
                  {mode === 'assist' && (
                    <div className="flex flex-col gap-2 h-60 max-h-72">
                      <div className="flex-1 overflow-y-auto pr-1 mb-1">
                        {assistHistory.length === 0 && (
                          <div className="text-sm text-gray-500 mb-2">Ask me anything about shopping, orders, returns, or our website!</div>
                        )}
                        {assistHistory.map((item, idx) => (
                          <div key={idx} className="mb-2">
                            <div className="text-xs text-gray-700 font-semibold mb-1">You:</div>
                            <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm mb-1">{item.q}</div>
                            <div className="text-xs text-gray-700 font-semibold mb-1">Bot:</div>
                            <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm">{item.a}</div>
                          </div>
                        ))}
                      </div>
                      <form className="flex gap-2 mt-auto" onSubmit={e => {
                        e.preventDefault();
                        if (!assistInput.trim()) return;
                        // Send to WhatsApp
                        const msg = encodeURIComponent(assistInput);
                        window.open(`https://wa.me/919322465522?text=${msg}`);
                        setAssistInput('');
                      }} autoComplete="off">
                        <input
                          type="text"
                          value={assistInput}
                          onChange={e => setAssistInput(e.target.value)}
                          className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white/80"
                          placeholder="Type your question..."
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-3 py-2 rounded-lg hover:from-gray-900 hover:to-gray-700 transition disabled:opacity-50"
                          disabled={!assistInput.trim()}
                        >Send</button>
                      </form>
                      <button onClick={() => { setMode(null); setAssistHistory([]); setAssistInput(''); }} className="text-xs text-gray-500 mt-1 hover:underline self-end">Back</button>
                    </div>
                  )}
                </div>
              </m.div>
            )}
          </AnimatePresence>
          {/* Floating Button */}
          {!chatOpen && (
            <button
              onClick={() => setChatOpen(true)}
              className="bg-gradient-to-br from-gray-800 to-gray-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center hover:scale-105 transition-all focus:outline-none"
              aria-label="Open Aruzz Bot"
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 5.92 2 10.5c0 2.09 1.06 3.97 2.83 5.32-.13.47-.51 1.77-.6 2.13-.09.36.13.72.5.72.1 0 .2-.03.29-.08.38-.22 1.5-.87 2.12-1.23C8.47 17.78 10.18 18.5 12 18.5c5.52 0 10-3.92 10-8.5S17.52 2 12 2Z"/><circle cx="8.5" cy="10.5" r="1.5" fill="#fff"/><circle cx="15.5" cy="10.5" r="1.5" fill="#fff"/></svg>
              <span className="sr-only">Open Aruzz Bot</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
