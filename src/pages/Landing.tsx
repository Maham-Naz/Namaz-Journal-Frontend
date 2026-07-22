import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookHeart, CheckCircle, BarChart3, Moon, Sun, Star, ChevronDown, Lock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Landing() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden font-sans">
      {/* Navigation */}
      <nav className="fixed w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Moon className="h-6 w-6 text-emerald-500" />
              <span className="text-xl font-bold text-emerald-800 dark:text-emerald-100">My Namaz Journal</span>
            </div>
            <div className="flex gap-4 items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-emerald-600 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-slate-700 transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link to="/login" className="text-emerald-600 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-100 font-medium transition">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-medium transition shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >

          <h1 className="text-5xl md:text-7xl font-extrabold text-emerald-950 dark:text-emerald-50 tracking-tight mb-6">
            Track Every <span className="text-emerald-600">Prayer</span>.
          </h1>
          <p className="text-xl md:text-2xl text-emerald-800/80 mb-10 max-w-2xl mx-auto">
            Build consistency, reflect on your journey, and strengthen your relationship with Allah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full text-lg font-bold transition transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
            >
              Start Your Journal <Star className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-emerald-900 dark:text-emerald-100 border-2 border-emerald-100 dark:border-slate-600 px-8 py-4 rounded-full text-lg font-bold transition transform hover:scale-105 flex items-center justify-center"
            >
              Login to Account
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-emerald-50 dark:bg-emerald-900/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">Features Designed for Consistency</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookHeart className="h-8 w-8 text-emerald-600" />}
              title="Private Journaling"
              description="Your data is completely private. Track your daily prayers securely and reflect on your spiritual progress."
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-emerald-600" />}
              title="Build Habits"
              description="Visual streaks and consistency trackers to keep you motivated to pray on time, every time."
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-emerald-600" />}
              title="Secure Account"
              description="Your account is protected. We value your privacy and ensure your spiritual journey remains yours alone."
            />
          </div>
        </div>
      </section>

      {/* Why Track Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <h2 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-6">Why Track Your Prayers?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Tracking your prayers isn't about perfection; it's about awareness. By logging your daily Namaz, you create a conscious habit of connecting with your Creator.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                <div className="mt-1 bg-gold-100 p-1 rounded-full"><CheckCircle className="h-4 w-4 text-gold-500" /></div>
                <span>Identify patterns in your missed prayers to improve.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                <div className="mt-1 bg-gold-100 p-1 rounded-full"><CheckCircle className="h-4 w-4 text-gold-500" /></div>
                <span>Celebrate your consistency and streaks.</span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                <div className="mt-1 bg-gold-100 p-1 rounded-full"><CheckCircle className="h-4 w-4 text-gold-500" /></div>
                <span>Hold yourself accountable privately.</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full"
          >
            {/* Mockup Statistics UI */}
            <div className="glass p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-bl-full opacity-50"></div>
              <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2">
                <BarChart3 className="text-emerald-500" /> Your Progress
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-slate-600 dark:text-slate-300">
                    <span>Fajr Consistency</span>
                    <span className="text-emerald-600">85%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5">
                    <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-medium text-slate-600 dark:text-slate-300">
                    <span>Current Streak</span>
                    <span className="text-gold-500">14 Days</span>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
                      <div key={day} className={`h-8 flex-1 rounded-md ${i < 6 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            <FaqItem question="Is my data private?" answer="Yes, your data is securely stored and completely private. We don't share your prayer logs with anyone." />
            <FaqItem question="Is this application free?" answer="Yes, My Namaz Journal is completely free to use to help you build consistency in your prayers." />
            <FaqItem question="Can I track missed prayers?" answer="Absolutely. You can log which prayers you missed and track your progress in making them up." />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 py-12 text-center text-emerald-200/60">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Moon className="h-6 w-6 text-gold-500" />
          <span className="text-xl font-bold text-white">My Namaz Journal</span>
        </div>
        <p>© {new Date().getFullYear()} My Namaz Journal. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass p-8 rounded-3xl text-center group transition"
    >
      <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="glass p-6 rounded-2xl">
      <h4 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 flex justify-between items-center">
        {question}
        <ChevronDown className="h-5 w-5 text-emerald-500" />
      </h4>
      <p className="text-slate-600 dark:text-slate-300 mt-2">{answer}</p>
    </div>
  );
}
