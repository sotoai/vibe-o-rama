'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Section,
  SectionHeader,
  Badge,
  PageTransition,
  CardGrid,
} from '@/components'
import { fadeUpVariants, fadeVariantsReduced, cardVariants, staggerContainer } from '@/lib/motion'

const prizeCategories = [
  { name: 'People\'s Choice', emoji: '🗳️', description: 'The one everyone actually wants to use.' },
  { name: 'Most Shareable', emoji: '📤', description: 'You sent it to 5 people within an hour of seeing it.' },
  { name: 'Most Addictive', emoji: '🎮', description: 'You opened it "just to check" and lost 20 minutes.' },
  { name: 'Chaotic Good', emoji: '🌀', description: 'Unhinged in the best way. We don\'t know why it works.' },
  { name: 'Glow-Up Award', emoji: '✨', description: 'V1 was rough. Final version? *chef\'s kiss*' },
  { name: 'Eye Candy', emoji: '🎨', description: 'So pretty you forgot to check if it actually works.' },
  { name: 'Best Sidekick', emoji: '🤖', description: 'The artifact that feels like it was made just for you.' },
  { name: 'Comfort Object', emoji: '🧸', description: 'You come back to it when you need a little boost. Digital emotional support.' },
  { name: 'Context King/Queen', emoji: '🧠', description: 'Connects dots you didn\'t know existed.' },
  { name: 'Best Remix', emoji: '🔄', description: 'Stole someone\'s idea and made it better. As intended.' },
  { name: 'First Timer', emoji: '🌱', description: 'Never built anything before. Now look at you.' },
]

export default function PrizesPage() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? fadeVariantsReduced : fadeUpVariants
  const itemVariants = prefersReducedMotion ? fadeVariantsReduced : cardVariants

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-accent-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-main relative z-10 pt-32 pb-20">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={variants}>
              <Badge variant="accent" className="mb-6">Demo Day</Badge>
            </motion.div>
            <motion.h1 className="heading-1 mb-6" variants={variants}>
              Prizes & Glory
            </motion.h1>
            <motion.p className="body-large" variants={variants}>
              Awards for creativity, weirdness, and making people smile.
              Technical complexity? Definitely not on the rubric.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Prize Categories */}
      <Section background="darker">
        <SectionHeader
          eyebrow="Categories"
          title="Ways to win"
          description="There's a prize for everyone except people who don't ship. Ship something."
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.05,
                delayChildren: prefersReducedMotion ? 0 : 0.1,
              },
            },
          }}
        >
          {prizeCategories.map((prize) => (
            <motion.div
              key={prize.name}
              className="group card-interactive"
              variants={itemVariants}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-600/20 to-secondary-500/10 border border-accent-500/20 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {prize.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1.5 group-hover:text-accent-300 transition-colors">
                    {prize.name}
                  </h3>
                  <p className="text-sm text-dark-400">{prize.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Judging */}
      <Section background="glow">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="Judging"
            title="How we pick winners"
            align="center"
          />

          <motion.div
            className="card"
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-dark-200 mb-8">
              We're not grading your code. We're asking: "Would I actually use this?
              Would I tell someone about it? Does it make me feel something?"
            </p>

            <h4 className="font-semibold text-white mb-5">What matters:</h4>

            <ul className="space-y-4">
              {[
                { label: 'Delight', desc: 'Does it spark joy or just exist?' },
                { label: 'Usability', desc: 'Can someone figure it out without a tutorial?' },
                { label: 'Focus', desc: 'Does it do one thing well or five things poorly?' },
                { label: 'Shareability', desc: 'Would you post it in a channel unprompted?' },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="text-accent-500 mt-0.5">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div>
                    <span className="font-medium text-white">{item.label}:</span>{' '}
                    <span className="text-dark-300">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-dark-700/50">
              <p className="text-sm text-dark-400 text-center">
                A beautiful one-liner beats an ugly enterprise solution. Every time.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Format */}
      <Section background="darker">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="Demo Day"
            title="Show, don't pitch"
            align="center"
          />

          <CardGrid columns={3} className="mb-10">
            <motion.div className="card text-center" variants={itemVariants}>
              <p className="text-3xl font-semibold text-gradient mb-2">3–5 min</p>
              <p className="text-sm text-dark-400">Per demo</p>
            </motion.div>
            <motion.div className="card text-center" variants={itemVariants}>
              <p className="text-3xl font-semibold text-gradient mb-2">No slides</p>
              <p className="text-sm text-dark-400">Just show the thing</p>
            </motion.div>
            <motion.div className="card text-center" variants={itemVariants}>
              <p className="text-3xl font-semibold text-gradient mb-2">Live Q&A</p>
              <p className="text-sm text-dark-400">Quick questions after</p>
            </motion.div>
          </CardGrid>

          <motion.p
            className="text-dark-300 max-w-xl mx-auto"
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Open your artifact. Click around. Tell us why you made it and what surprised you.
            That's it. No decks. No rehearsed pitches. Just vibes.
          </motion.p>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-main py-20 md:py-28 relative z-10">
          <motion.div
            className="text-center"
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">
              Ready to compete?
            </h2>
            <p className="text-dark-400 mb-8">
              Join the Rama and start building your entry.
            </p>
            <a href="#" className="btn-primary">
              Enter the Rama
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
