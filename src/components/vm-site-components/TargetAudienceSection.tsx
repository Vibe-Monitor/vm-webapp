'use client';

import { motion } from 'motion/react';
import { ShieldCheck, BarChart3, TrendingUp, Users } from 'lucide-react';

const audiences = [
  {
    icon: ShieldCheck,
    title: 'DevOps Teams',
    description: 'Proactive alerts over reactive dashboards.',
    benefit: 'Stop firefighting, start preventing',
  },
  {
    icon: BarChart3,
    title: 'Engineering Managers',
    description: 'Fast response metrics for reliable systems.',
    benefit: 'Show leadership real impact',
  },
  {
    icon: TrendingUp,
    title: 'Startups/Scale-ups',
    description: 'Enterprise monitoring without the price tag.',
    benefit: 'Grow without breaking things',
  },
  {
    icon: Users,
    title: 'Growing Teams',
    description: 'Scales as your servers multiply.',
    benefit: 'One tool for 5 or 500 servers',
  },
];

export function TargetAudienceSection() {
  return (
    <section className="relative px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl mb-4" style={{ fontWeight: 700, color: '#E5E7EB' }}>
            Built For You
          </h2>
          <p className="text-xl text-[#98A3B1]">
            Whoever you are, Vibemonitor keeps your team moving
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-[#2D425A]/40 backdrop-blur-sm rounded-lg p-6 border border-[#3F4F67] hover:border-[#6266FA] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#6266FA]/20 flex items-center justify-center mx-auto mb-4">
                <audience.icon className="w-7 h-7 text-[#6266FA]" />
              </div>

              <h3
                className="text-xl mb-3 text-center"
                style={{ fontWeight: 600, color: '#E5E7EB' }}
              >
                {audience.title}
              </h3>

              <p className="text-sm text-[#98A3B1] text-center mb-4" style={{ lineHeight: 1.5 }}>
                {audience.description}
              </p>

              <div className="pt-4 border-t border-[#3F4F67]">
                <p className="text-xs text-[#FFD11B] text-center" style={{ fontWeight: 600 }}>
                  {audience.benefit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="px-6 py-3 bg-[#6266FA] hover:bg-[#4F53E5] text-[#E5E7EB] rounded-lg transition-all duration-200">
            Sounds like you? Start free
          </button>
        </motion.div>
      </div>
    </section>
  );
}
