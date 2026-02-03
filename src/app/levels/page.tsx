'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Section,
  SectionHeader,
  Badge,
  LevelBadge,
  PageTransition,
} from '@/components'
import { fadeUpVariants, fadeVariantsReduced, cardVariants, staggerContainer } from '@/lib/motion'

const levels = [
  {
    level: 1,
    name: 'Curious',
    description: 'You showed up. You\'re poking around. You\'re asking "wait, can it do that?"',
    activities: [
      'Get your tools set up (Claude Code, Cursor)',
      'Make something—anything—work',
      'Post it in the channel even if it\'s embarrassing',
    ],
    gradient: 'from-slate-400 to-slate-500',
    glowColor: 'bg-slate-500/20',
  },
  {
    level: 2,
    name: 'Tinkerer',
    description: 'You\'ve broken things. You\'ve fixed things. You\'re starting to see patterns.',
    activities: [
      'Build something that kinda works',
      'Show it to someone and actually listen to their feedback',
      'Try a different approach when the first one fails',
    ],
    gradient: 'from-blue-400 to-blue-600',
    glowColor: 'bg-blue-500/20',
  },
  {
    level: 3,
    name: 'Maker',
    description: 'You shipped something. Someone used it. They didn\'t hate it.',
    activities: [
      'Publish an artifact people can actually use',
      'Get 3+ people to try it and tell you what sucks',
      'Write down what you learned (a few sentences is fine)',
    ],
    gradient: 'from-cyan-400 to-teal-500',
    glowColor: 'bg-teal-500/20',
  },
  {
    level: 4,
    name: 'Systems Thinker',
    description: 'You\'re not building tools anymore. You\'re building workflows. Big difference.',
    activities: [
      'Automate something you do every week',
      'Connect your artifact to other tools',
      'Help someone else level up their build',
    ],
    gradient: 'from-violet-400 to-purple-600',
    glowColor: 'bg-violet-500/20',
  },
  {
    level: 5,
    name: 'Vibe Lord',
    description: 'People are remixing your stuff. You\'re teaching without trying. You get it.',
    activities: [
      'Create something others build on top of',
      'Run a session or write a guide',
      'Ship multiple artifacts across categories',
    ],
    gradient: 'from-amber-400 to-orange-500',
    glowColor: 'bg-orange-500/20',
  },
]

export default function LevelsPage() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? fadeVariantsReduced : fadeUpVariants
  const itemVariants = prefersReducedMotion ? fadeVariantsReduced : cardVariants

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-main relative z-10 pt-32 pb-20">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={variants}>
              <Badge variant="accent" className="mb-6">Progression</Badge>
            </motion.div>
            <motion.h1 className="heading-1 mb-6" variants={variants}>
              Levels
            </motion.h1>
            <motion.p className="body-large" variants={variants}>
              No tests. No certifications. No gatekeeping.
              You level up by building and sharing. That's it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <Section background="gradient" size="small">
        <div className="max-w-2xl mx-auto">
          <motion.div
            className="card text-center"
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-dark-200 mb-6">
              Levels are about momentum, not mastery. Nobody's checking your homework.
              You do the thing, you get the badge.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
              <span className="badge">Build stuff</span>
              <svg className="w-4 h-4 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="badge">Share it</span>
              <svg className="w-4 h-4 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="badge">Get feedback</span>
              <svg className="w-4 h-4 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span className="badge-accent">Level up</span>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Level ladder */}
      <Section background="darker">
        <SectionHeader
          eyebrow="The path"
          title="Five levels. Your pace."
          description="Everyone starts at 1. Move as fast or slow as you want. No deadlines. No pressure."
        />

        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
                delayChildren: prefersReducedMotion ? 0 : 0.1,
              },
            },
          }}
        >
          {levels.map((level) => (
            <motion.div
              key={level.level}
              className="group relative card-interactive overflow-visible"
              variants={itemVariants}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-1 ${level.glowColor} rounded-card blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                {/* Level info */}
                <div className="lg:w-1/3">
                  <LevelBadge level={level.level} name={level.name} size="lg" />
                  <p className="mt-4 text-dark-300">
                    {level.description}
                  </p>
                </div>

                {/* Activities */}
                <div className="lg:w-2/3 lg:pl-8 lg:border-l lg:border-dark-700/50">
                  <h4 className="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-5">
                    What gets you here
                  </h4>
                  <ul className="space-y-4">
                    {level.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className={`
                          flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r ${level.gradient}
                          flex items-center justify-center text-white text-xs font-semibold
                          shadow-lg
                        `}>
                          {i + 1}
                        </span>
                        <span className="text-dark-200">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section background="glow">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            title="Questions you might have"
            align="center"
          />

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: prefersReducedMotion ? 0 : 0.1 },
              },
            }}
          >
            {[
              {
                q: 'Do I need to reach Level 5?',
                a: 'Nope. Level 1 is a win. Level 2 is a bigger win. Level 5 is for people who can\'t stop.',
              },
              {
                q: 'Who decides when I level up?',
                a: 'Mostly you. If you did the things, you earned it. Facilitators can help if you\'re unsure.',
              },
              {
                q: 'Can I speedrun this?',
                a: 'If you\'re already building and sharing, you might move fast. But it\'s not a race.',
              },
              {
                q: 'What if I get stuck?',
                a: 'Post in the channel. Someone will help. That\'s literally the point.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="card"
                variants={itemVariants}
              >
                <h4 className="font-semibold text-white mb-3">{item.q}</h4>
                <p className="text-dark-300 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container-main py-20 md:py-28 relative z-10">
          <motion.div
            className="text-center"
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="heading-2 mb-4">
              Start at Level 1. See what happens.
            </h2>
            <p className="text-dark-400 mb-8">
              The only prerequisite is showing up.
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
