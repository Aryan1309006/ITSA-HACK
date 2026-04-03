import Hero from '../components/Hero.jsx';
import ScenarioCard from '../components/ScenarioCard.jsx';
import { motion } from 'framer-motion';
import { scenarios, filterPills } from '../data/mockData.js';
import { useState } from 'react';

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All Scams');
  const [search, setSearch] = useState('');

  const filtered = scenarios.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === 'All Scams' ||
      s.type.toLowerCase().includes(activeFilter.toLowerCase()) ||
      s.title.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      {/* Hero section has its own navbar */}
      <Hero />

      {/* Scenario Lobby */}
      <section
        id="scenarios"
        className="min-h-screen px-6 py-16"
        style={{
          background:
            'radial-gradient(ellipse at center, #1a0533 0%, #060b1a 60%, #0d1a2e 100%)',
        }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i % 2 ? '#00e5ff' : '#bf00ff' }}
                animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
          <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white">
            Scenario{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #00e5ff, #bf00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Selection Lobby
            </span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
            Choose your simulation. Each scenario trains a different detection skill.
          </p>
        </motion.div>

        {/* Search + Filter row */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Search */}
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full md:w-72"
            style={{
              background: 'rgba(13,22,48,0.7)',
              border: '1px solid rgba(0,229,255,0.2)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="rgba(0,229,255,0.6)" strokeWidth="2" />
              <path
                d="M21 21l-4.35-4.35"
                stroke="rgba(0,229,255,0.6)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="text"
              placeholder="Search scenarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder-gray-500"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {filterPills.map((pill) => (
              <motion.button
                key={pill}
                onClick={() => setActiveFilter(pill)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  background:
                    activeFilter === pill
                      ? 'rgba(0,229,255,0.15)'
                      : 'rgba(13,22,48,0.6)',
                  border:
                    activeFilter === pill
                      ? '1px solid rgba(0,229,255,0.5)'
                      : '1px solid rgba(255,255,255,0.1)',
                  color:
                    activeFilter === pill
                      ? '#00e5ff'
                      : 'rgba(255,255,255,0.6)',
                  backdropFilter: 'blur(8px)',
                  boxShadow:
                    activeFilter === pill
                      ? '0 0 12px rgba(0,229,255,0.2)'
                      : 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                {pill}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {filtered.map((scenario, i) => (
            <ScenarioCard key={scenario.id} {...scenario} index={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-500">
              <p className="text-xl mb-2">No scenarios found</p>
              <p className="text-sm">Try a different search or filter</p>
            </div>
          )}
        </div>

        {/* Bottom nav footer */}
        <div
          className="flex justify-center gap-8 mt-16 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {['Home', 'Profile', 'Leaderboard', 'Settings', 'Help'].map((item) => (
            <button
              key={item}
              className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
