'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/ui/header'
import GridBackground from '@/components/ui/grid-background'
import { HowItWorks } from '@/components/sections/how-it-works'
import DevelopersSection from '@/components/sections/developers'
import { ContactSection } from '@/components/sections/contact'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// @ts-ignore
export default function Home() {
  const router = useRouter();
  const { scrollY, scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth spring physics for parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollY, [0, 500], [0, 150]), springConfig);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);

    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className=\"min-h-screen bg-black text-white overflow-hidden\">
      < Header />
      <GridBackground>
        <main className=\"relative w-full\">
        {/* Enhanced Hero Section with Advanced Animations */}
        <section className=\"relative z-10 min-h-screen flex items-center justify-center pt-32 pb-16\">
        {/* Animated Particles Background */}
        <div className=\"absolute inset-0 overflow-hidden pointer-events-none\">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className=\"absolute w-1 h-1 bg-purple-500/30 rounded-full\"
        animate={{
          x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
          y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
        }}
        transition={{
          duration: Math.random() * 10 + 20,
          repeat: Infinity,
          repeatType: \"reverse\",
                  }}
        style={{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
        }}
                />
              ))}
      </div>

  {/* Glowing Orbs with Mouse Tracking */ }
  <motion.div
    style={{
      x: mousePosition.x * 2,
      y: mousePosition.y * 2,
    }}
    className=\"absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none\"
  animate = {{
    scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
              }
}
transition = {{
  duration: 4,
    repeat: Infinity,
      repeatType: \"reverse\",
}}
            />
  < motion.div
style = {{
  x: -mousePosition.x * 2,
    y: -mousePosition.y * 2,
              }}
className =\"absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none\"
animate = {{
  scale: [1.2, 1, 1.2],
    opacity: [0.5, 0.3, 0.5],
              }}
transition = {{
  duration: 4,
    repeat: Infinity,
      repeatType: \"reverse\",
  delay: 0.5,
              }}
            />

  < motion.div
style = {{ y, opacity }}
className =\"container mx-auto px-6 lg:px-8 max-w-7xl relative z-10\"
  >
  {/* Animated Badge */ }
  < motion.div
initial = {{ opacity: 0, y: -20 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.6 }}
className =\"flex justify-center mb-8\"
  >
  <motion.div
    whileHover={{ scale: 1.05 }}
    className=\"inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 backdrop-blur-sm\"
      >
      <span className=\"relative flex h-2 w-2\">
        < span className =\"animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75\"></span>
          < span className =\"relative inline-flex rounded-full h-2 w-2 bg-purple-500\"></span>
                  </span >
  <span className=\"text-sm text-purple-300\">Powered by Youdex Technologies</span>
                </motion.div >
              </motion.div >

  {/* Main Headline with Typing Effect */ }
  < div className =\"flex flex-col items-center justify-center mb-12\">
    < motion.div
initial = {{ opacity: 0, y: 20 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.8, delay: 0.2 }}
className =\"text-center w-full\"
  >
  <h1 className=\"text-5xl md:text-7xl lg:text-8xl font-bold text-white pb-6 leading-tight max-w-6xl mx-auto\">
                    Where{
\" \"}
  < motion.span
  className =\"inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400\"
  animate = {{
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }
}
transition = {{
  duration: 5,
    repeat: Infinity,
      repeatType: \"reverse\",
}}
style = {{
  backgroundSize: '200% 200%',
                      }}
                    >
  Innovators
                    </motion.span >
{
\" \"}Meet{\" \"}
  <motion.span
                      className=\"inline-block bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400\"
                      animate = {{
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
transition = {{
  duration: 5,
    repeat: Infinity,
      repeatType: \"reverse\",
  delay: 0.5,
                      }}
style = {{
  backgroundSize: '200% 200%',
                      }}
                    >
  Developers
                    </motion.span >
                  </h1 >

  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className=\"mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed\"
      >
      Transform your brilliant ideas into reality with AI - powered matching. 
                    Connect with skilled developers and build groundbreaking projects together.
                  </motion.p >
                </motion.div >
              </div >

  {/* CTA Buttons with Magnetic Effect */ }
  < motion.div
initial = {{ opacity: 0, y: 20 }}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.8, delay: 0.6 }}
className =\"flex flex-col sm:flex-row gap-6 justify-center mb-20\"
  >
  <Link href=\"/signup-select\">
    < motion.button
whileHover = {{
  scale: 1.05,
    boxShadow: \"0 25px 70px -15px rgba(168, 85, 247, 0.6)\",
}}
whileTap = {{ scale: 0.95 }}
className =\"group relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-5 px-12 rounded-full text-lg font-bold transition-all overflow-hidden\"
style = {{ backgroundSize: '200% 100%' }}
animate = {{
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
transition = {{
  backgroundPosition: {
    duration: 3,
      repeat: Infinity,
        repeatType: \"reverse\",
  },
}}
                  >
  <span className=\"relative z-10 flex items-center gap-3\">
                      Start Creating
  < motion.svg
className =\"w-5 h-5\" 
fill =\"none\" 
stroke =\"currentColor\" 
viewBox =\"0 0 24 24\"
animate = {{ x: [0, 5, 0] }}
transition = {{ duration: 1.5, repeat: Infinity }}
                      >
  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M13 7l5 5m0 0l-5 5m5-5H6\" />
                      </motion.svg >
                    </span >
  <div className=\"absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity\" />
                  </motion.button >
                </Link >

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className=\"border-2 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10 text-white py-5 px-12 rounded-full text-lg font-bold transition-all backdrop-blur-sm relative overflow-hidden group\"
      >
      <span className=\"relative z-10\">Explore Platform</span>
        < motion.div
className =\"absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0\"
animate = {{ x: ['-100%', '100%'] }}
transition = {{
  duration: 2, repeat: Infinity, repeatType: \"loop\" }}
    />
                </motion.button >
              </motion.div >

    {/* Animated Stats Counter */ }
    < motion.div
  initial = {{ opacity: 0, y: 30 }
}
animate = {{ opacity: 1, y: 0 }}
transition = {{ duration: 0.8, delay: 0.8 }}
className =\"grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto\"
  >
  { [\n                  {
    end: 10000, label: \"Creators\", suffix: \"+\" },\n                  { end: 500, label: \"Projects\", suffix: \"+\" },\n                  { end: 98, label: \"Success Rate\", suffix: \"%\" },\n                  { end: 50, label: \"Countries\", suffix: \"+\" },\n                ].map((stat, index) => (\n                  <StatCounter key={stat.label} {...stat} delay={index * 0.1} />\n                ))}\n              </motion.div>
            </motion.div >

    {/* Scroll Indicator */ }
    < motion.div
  initial = {{ opacity: 0 }
}
animate = {{ opacity: 1 }}
transition = {{ delay: 1.5 }}
className =\"absolute bottom-8 left-1/2 -translate-x-1/2\"
  >
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 2, repeat: Infinity }}
    className=\"w-6 h-10 rounded-full border-2 border-purple-500/50 flex items-start justify-center p-2\"
      >
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className=\"w-1.5 h-1.5 rounded-full bg-purple-500\"
          />
              </motion.div >
            </motion.div >
          </section >

  {/* How It Works - Interactive Process */ }
  < section className =\"relative py-32 overflow-hidden\">
    < div className =\"absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-purple-900/10\" />

      < div className =\"container mx-auto px-6 lg:px-8 max-w-6xl relative\">
        < motion.div
initial = {{ opacity: 0, y: 20 }}
whileInView = {{ opacity: 1, y: 0 }}
viewport = {{ once: true }}
className =\"text-center mb-20\"
  >
  <h2 className=\"text-5xl md:text-6xl font-bold mb-6\">
                  How{
\" \"}
  < span className =\"bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400\">
  CreatorsMeet
                  </span >
  {
  \" \"}Works
                </h2>
    <p className=\"text-xl text-gray-300 max-w-2xl mx-auto\">
                  From idea to reality in four simple steps
                </p >
              </motion.div >

    <div className=\"grid md:grid-cols-2 lg:grid-cols-4 gap-8\">
  {
    [\n                  {
    \n                    step: \"01\",\n                    icon: \"💡\",\n                    title: \"Share Your Idea\",\n                    description: \"Innovators describe their project vision and requirements\",\n                  },\n                  {\n                    step: \"02\",\n                    icon: \"🤖\",\n                    title: \"AI Matching\",\n                    description: \"Our AI finds the perfect developers based on skills and interests\",\n                  },\n                  {\n                    step: \"03\",\n                    icon: \"🤝\",\n                    title: \"Collaborate\",\n                    description: \"Work together using built-in tools and real-time communication\",\n                  },\n                  {\n                    step: \"04\",\n                    icon: \"🚀\",\n                    title: \"Launch & Succeed\",\n                    description: \"Build, test, and launch your groundbreaking project\",\n                  },\n                ].map((item, index) => (\n                  <ProcessCard key={item.step} {...item} index={index} />\n                ))}\n              </div>
            </div>
          </section >

      {/* Developers Showcase */ }
      < DevelopersSection />

      {/* Platform Features */ }
      < section className =\"relative py-32 overflow-hidden\">
      < div className =\"container mx-auto px-6 lg:px-8 max-w-6xl\">
      < motion.div
                initial = {{ opacity: 0, y: 20 }}
  whileInView = {{ opacity: 1, y: 0 }
}
viewport = {{ once: true }}
className =\"text-center mb-20\"
  >
  <h2 className=\"text-5xl md:text-6xl font-bold mb-6\">
                  Powerful{
\" \"}
  < span className =\"bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400\">
  Features
                  </span >
                </h2 >
    <p className=\"text-xl text-gray-300 max-w-2xl mx-auto\">
                  Everything you need to collaborate and build amazing projects
                </p >
              </motion.div >

    <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">
  {
    [\n                  {
    \n                    icon: \"🎯\",\n                    title: \"Smart Matching\",\n                    description: \"AI-powered algorithm connects you with the perfect collaborators\",\n                    color: \"purple\",\n                  },\n                  {\n                    icon: \"💬\",\n                    title: \"Real-time Chat\",\n                    description: \"Instant messaging and video calls integrated into the platform\",\n                    color: \"pink\",\n                  },\n                  {\n                    icon: \"📊\",\n                    title: \"Project Dashboard\",\n                    description: \"Track progress and manage tasks with intuitive tools\",\n                    color: \"blue\",\n                  },\n                  {\n                    icon: \"🔐\",\n                    title: \"Secure Platform\",\n                    description: \"Enterprise-grade security keeps your ideas protected\",\n                    color: \"purple\",\n                  },\n                  {\n                    icon: \"📁\",\n                    title: \"File Sharing\",\n                    description: \"Share documents, code, and assets seamlessly\",\n                    color: \"pink\",\n                  },\n                  {\n                    icon: \"📈\",\n                    title: \"Analytics\",\n                    description: \"Detailed insights into team performance and project metrics\",\n                    color: \"blue\",\n                  },\n                ].map((feature, index) => (\n                  <FeatureCard key={feature.title} {...feature} index={index} />\n                ))}\n              </div>
            </div>
          </section >

      {/* How It Works (existing component) */ }
      < HowItWorks />

      {/* Contact Section */ }
      < ContactSection />

      {/* CTA Section */ }
      < section className =\"relative py-32 overflow-hidden\">
      < div className =\"absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20\" />
      < div className =\"container mx-auto px-6 lg:px-8 max-w-5xl relative\">
      < motion.div
                initial = {{ opacity: 0, scale: 0.95 }}
  whileInView = {{ opacity: 1, scale: 1 }
}
viewport = {{ once: true }}
className =\"relative rounded-3xl p-16 border border-purple-500/20 overflow-hidden\"
style = {{
  background: 'radial-gradient(circle at 50% 0%, rgba(168, 85, 247, 0.1), transparent 70%)',
                }}
              >
  <div className=\"absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10\" />

    < div className =\"relative z-10 text-center\">
      < h2 className =\"text-5xl md:text-6xl font-bold mb-6\">
                    Ready to Build the{
\" \"}
  < span className =\"bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400\">
  Future ?
                    </span >
                  </h2 >
    <p className=\"text-xl text-gray-300 mb-10 max-w-2xl mx-auto\">
                    Join thousands of innovators and developers creating groundbreaking projects together
                  </p >

    <div className=\"flex flex-col sm:flex-row gap-6 justify-center\">
      < Link href =\"/signup-select\">
        < motion.button
  whileHover = {{ scale: 1.05 }
}
whileTap = {{ scale: 0.95 }}
className =\"bg-white text-purple-600 py-5 px-12 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-xl\"
  >
  Get Started Free
                      </motion.button >
                    </Link >
  <Link href=\"/signin\">
    < motion.button
whileHover = {{ scale: 1.05 }}
whileTap = {{ scale: 0.95 }}
className =\"border-2 border-white/30 hover:border-white/60 text-white py-5 px-12 rounded-full text-lg font-bold transition-all\"
  >
  Sign In
                      </motion.button >
                    </Link >
                  </div >
                </div >
              </motion.div >
            </div >
          </section >

  {/* Enhanced Footer with Youdex Technologies */ }
  < footer className =\"relative py-16 border-t border-white/10\">
    < div className =\"container mx-auto px-6 lg:px-8\">
      < div className =\"max-w-6xl mx-auto\">
        < div className =\"grid md:grid-cols-4 gap-12 mb-12\">
{/* Logo & Description */ }
<div className=\"md:col-span-2\">
  < div className =\"flex items-center gap-3 mb-4\">
    < img src =\"/logo.png\" alt=\"CreatorsMeet\" className=\"w-10 h-10\" />
      < span className =\"text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400\">
CreatorsMeet
                      </span >
                    </div >
  <p className=\"text-gray-400 mb-6 max-w-md\">
                      Connecting innovators with developers to build groundbreaking projects. 
                      Powered by cutting - edge AI technology.
                    </p >
  <div className=\"flex items-center gap-2 text-sm text-gray-500\">
    < span > A product of</span >
      <span className=\"font-semibold text-purple-400\">Youdex Technologies</span>
                    </div >
                  </div >

  {/* Links */ }
  < div >
  <h3 className=\"text-white font-semibold mb-4\">Product</h3>
    < ul className =\"space-y-2\">
{
  ['Features', 'Pricing', 'How it Works', 'FAQ'].map((item) => (
    <li key={item}>
      <a href=\"#\" className=\"text-gray-400 hover:text-purple-400 transition-colors\">
      {item}
    </a>
                        </li >
                      ))
}
                    </ul >
                  </div >

                  <div>
                    <h3 className=\"text-white font-semibold mb-4\">Company</h3>
                    <ul className=\"space-y-2\">
{
  ['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
    <li key={item}>
      <a href=\"#\" className=\"text-gray-400 hover:text-purple-400 transition-colors\">
      {item}
    </a>
                        </li >
                      ))
}
                    </ul >
                  </div >
                </div >

  {/* Bottom Bar */ }
  < div className =\"pt-8 border-t border-white/10\">
    < div className =\"flex flex-col md:flex-row justify-between items-center gap-4\">
      < p className =\"text-gray-500 text-sm text-center md:text-left\">
                      © { new Date().getFullYear() } Youdex Technologies.All rights reserved.
                    </p >
  <div className=\"flex gap-6 text-sm\">
    < a href =\"#\" className=\"text-gray-400 hover:text-purple-400 transition-colors\">
                        Privacy Policy
                      </a >
  <a href=\"#\" className=\"text-gray-400 hover:text-purple-400 transition-colors\">
                        Terms of Service
                      </a >
                    </div >
                  </div >
                </div >
              </div >
            </div >
          </footer >
        </main >
      </GridBackground >
    </div >
  )
}

// Stat Counter Component with Animation
function StatCounter({ end, label, suffix, delay }: { end: number; label: string; suffix: string; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timeoutId);
  }, [isInView, end, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className=\"text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all\"
        >
        <div className=\"text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2\">
  { count.toLocaleString() } { suffix }
      </div >
    <div className=\"text-sm text-gray-400 font-medium\">{label}</div>
    </motion.div >
  );
}

// Process Card Component
function ProcessCard({ step, icon, title, description, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className=\"relative group\"
        >
        <div className=\"absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100\" />

          < div className =\"relative p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm h-full hover:border-purple-500/30 transition-all\">
            < div className =\"text-6xl mb-4 group-hover:scale-110 transition-transform\">{icon}</div>
              < div className =\"text-purple-400 font-bold text-sm mb-2\">STEP {step}</div>
                < h3 className =\"text-2xl font-bold mb-3 text-white\">{title}</h3>
                  < p className =\"text-gray-300 leading-relaxed\">{description}</p>
      </div >

    {/* Connecting Line (except for last item) */ }
  {
    index < 3 && (
      <div className=\"hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-purple-500/50 to-transparent\" />
      )
  }
    </motion.div >
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description, color, index }: any) {
  const colors = {
    purple: 'from-purple-600/20 to-pink-600/20',
    pink: 'from-pink-600/20 to-purple-600/20',
    blue: 'from-blue-600/20 to-purple-600/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className=\"group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/30 transition-all relative overflow-hidden\"
        >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colors[color as keyof typeof colors]} opacity-0 group-hover:opacity-100 transition-opacity`}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: \"reverse\",
        }}
      />
      
      <div className=\"relative z-10\">
    < div className =\"text-5xl mb-4 group-hover:scale-110 transition-transform\">{icon}</div>
      < h3 className =\"text-xl font-bold mb-3 text-white\">{title}</h3>
        < p className =\"text-gray-300 leading-relaxed\">{description}</p>
      </div >
    </motion.div >
  );
}
"