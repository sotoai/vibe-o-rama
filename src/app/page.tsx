'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Section,
  SectionHeader,
  CardGrid,
  FeatureCard,
  ComparisonCard,
  Gallery,
  Timeline,
  PageTransition,
} from '@/components'
import { fadeUpVariants, fadeVariantsReduced, fadeUpScaleVariants, staggerContainer } from '@/lib/motion'

// Fun artifact names and descriptions
const artifacts = [
  {
    id: '1',
    name: 'The Pre-Meeting Whisperer',
    description: 'Crawls your calendar, drafts an agenda, and tells you who might derail the conversation.',
    tags: ['workflow', 'meetings'],
    image: '/artifact-01.svg',
  },
  {
    id: '2',
    name: 'TLDR Machine',
    description: 'Turns a week of Slack chaos into a newsletter your team might actually read.',
    tags: ['generator', 'sanity-saver'],
    image: '/artifact-02.svg',
  },
  {
    id: '3',
    name: 'Flowchart Gremlin',
    description: 'Because sometimes you need a decision tree to decide if you need a decision tree.',
    tags: ['interactive', 'meta'],
    image: '/artifact-03.svg',
  },
  {
    id: '4',
    name: 'Standup Shuffler',
    description: 'Randomizes speaking order and throws in icebreakers nobody asked for.',
    tags: ['social', 'chaos'],
    image: '/artifact-04.svg',
  },
  {
    id: '5',
    name: 'OKR Mood Ring',
    description: 'A dashboard that shows your quarterly goals and gently judges your progress.',
    tags: ['dashboard', 'accountability'],
    image: '/artifact-05.svg',
  },
  {
    id: '6',
    name: 'Feedback Therapist',
    description: 'Takes your "this could be better" notes and turns them into actual feedback.',
    tags: ['generator', 'diplomacy'],
    image: '/artifact-06.svg',
  },
  {
    id: '7',
    name: 'Team Trivia Torture',
    description: 'Generates quiz questions from your docs. Find out who actually reads the wiki.',
    tags: ['social', 'exposed'],
    image: '/artifact-07.svg',
  },
  {
    id: '8',
    name: 'Corporate BS Translator',
    description: '"Let\'s take this offline" → "I don\'t have an answer and I\'m hoping you forget."',
    tags: ['utility', 'truth'],
    image: '/artifact-08.svg',
  },
  {
    id: '9',
    name: 'Project Kickoff in a Box',
    description: 'Spits out charters, timelines, and RACI matrices so you can pretend you planned.',
    tags: ['generator', 'illusions'],
    image: '/artifact-09.svg',
  },
]

const timelineItems = [
  {
    phase: 'Phase 1',
    weeks: 'Weeks 1–2',
    title: 'Get your tools, find your vibe',
    description: 'Set up Claude Code and Cursor. Join a session or two. Start thinking about what annoys you enough to automate.',
  },
  {
    phase: 'Phase 2',
    weeks: 'Weeks 3–8',
    title: 'Build weird stuff, share it',
    description: 'Make things. Break things. Post your creations in the channel. Steal ideas from each other (encouraged).',
  },
  {
    phase: 'Phase 3',
    weeks: 'End of Q3',
    title: 'Demo Day: Show & Tell',
    description: 'Present your artifact in 3–5 minutes. No slides. No pitches. Just show us what you made and why it sparks joy.',
  },
]

const buildCategories = [
  {
    title: 'Personal sidekicks',
    description: 'Tools that do the boring stuff so you can do the interesting stuff.',
    items: ['Meeting prep bots', 'Email drafters', 'Personal dashboards', 'Note organizers'],
  },
  {
    title: 'Creative contraptions',
    description: 'Generators, converters, and things that make other things.',
    items: ['Content generators', 'Format translators', 'Template factories', 'Style transformers'],
  },
  {
    title: 'Team toys',
    description: 'Artifacts meant to be shared, played with, and possibly abused.',
    items: ['Icebreaker bots', 'Quiz generators', 'Feedback tools', 'Celebration machines'],
  },
  {
    title: 'Gloriously useless utilities',
    description: 'Stuff that probably shouldn\'t exist but absolutely should.',
    items: ['Jargon translators', 'Decision randomizers', 'Procrastination timers', 'Compliment generators'],
  },
]

const isItems = [
  'A playground for building weird, useful, delightful things with AI',
  'Permission to spend work hours making tools that make you smile',
  'A community of people who\'d rather build than talk about building',
]

const isntItems = [
  'A certification with tests and boxes to check',
  'About shipping production code or impressing stakeholders',
  'Only for "technical" people (whatever that means)',
]

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? fadeVariantsReduced : fadeUpVariants
  const scaleVariants = prefersReducedMotion ? fadeVariantsReduced : fadeUpScaleVariants

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-dark-950" />
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-accent-600/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-950" />

        <div className="container-main relative z-10 pt-20 pb-24">
          <motion.div
            className="max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.span
              className="inline-block badge-accent mb-6"
              variants={variants}
            >
              Q3 • SPRO
            </motion.span>

            {/* Title */}
            <motion.h1
              className="heading-display mb-8"
              variants={scaleVariants}
            >
              <span className="text-gradient">Vibe-O-Rama</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl md:text-3xl text-dark-100 mb-6 font-medium max-w-2xl"
              variants={variants}
            >
              Where SPRO builds things that spark joy.
            </motion.p>

            {/* Thesis */}
            <motion.p
              className="body-large mb-12 max-w-2xl"
              variants={variants}
            >
              Stop chatting with AI. Start building with it. Create interactive artifacts
              that automate the annoying, amplify the creative, and make your coworkers ask
              "wait, how'd you make that?"
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={variants}
            >
              <a href="#" className="btn-primary">
                Join the Rama
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <div className="flex gap-3">
                <Link href="#gallery" className="btn-secondary">
                  See the gallery
                </Link>
                <Link href="/levels" className="btn-secondary">
                  Level up
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-2 text-dark-500">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Why this exists */}
      <Section background="gradient">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeader
            eyebrow="The problem"
            title="AI chat is a trap."
            description="Everyone's using AI to generate more content. More drafts. More docs. More stuff. But more stuff isn't the goal—better workflows are. The Rama is about building systems that actually save time, not just look busy."
            align="center"
          />
        </div>
      </Section>

      {/* What it is / What it isn't */}
      <Section background="darker">
        <SectionHeader
          title="What this is—and isn't"
        />
        <CardGrid columns={2}>
          <ComparisonCard type="is" items={isItems} />
          <ComparisonCard type="isnt" items={isntItems} />
        </CardGrid>
      </Section>

      {/* What you'll use */}
      <Section background="glow">
        <SectionHeader
          eyebrow="Your toolkit"
          title="Two tools. Infinite possibilities."
          description="We're not here to teach you 47 platforms. Pick up these two, and you're dangerous."
        />
        <CardGrid columns={3}>
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            title="Claude Code"
            description="Build in your terminal through conversation. Tell it what you want, watch it happen. Debug by complaining."
          />
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            title="Cursor"
            description="A code editor that actually helps. Edit, navigate, and build with AI as your pair programmer."
          />
          <FeatureCard
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            title="Creative extras"
            description="Optional image/video tools for when your artifact needs to look as good as it works."
          />
        </CardGrid>
        <motion.div
          className="mt-12 text-center"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-dark-400 text-sm border border-dark-700/50 rounded-card py-4 px-6 inline-block bg-dark-800/30">
            Never written code? <span className="text-accent-400">Perfect.</span> That's kind of the point.
          </p>
        </motion.div>
      </Section>

      {/* What you can build */}
      <Section background="darker">
        <SectionHeader
          eyebrow="What to build"
          title="Ideas to steal"
          description="Your artifact should be interactive, shareable, and make at least one person go 'nice.'"
        />
        <CardGrid columns={2}>
          {buildCategories.map((category) => (
            <FeatureCard
              key={category.title}
              title={category.title}
              description={category.description}
              items={category.items}
            />
          ))}
        </CardGrid>
        <motion.div
          className="mt-12 text-center"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="card inline-block">
            <p className="text-dark-200">
              The bar: <span className="text-accent-400">Would you actually use this?</span>
            </p>
            <p className="text-dark-500 text-sm mt-2">Not for customers. Not for execs. For you and your team.</p>
          </div>
        </motion.div>
      </Section>

      {/* How it works */}
      <Section background="glow">
        <SectionHeader
          eyebrow="The plan"
          title="How this goes down"
          align="center"
          className="mx-auto"
        />
        <Timeline items={timelineItems} />
      </Section>

      {/* Artifact gallery */}
      <Section background="darker" id="gallery">
        <SectionHeader
          eyebrow="The gallery"
          title="Artifacts in the wild"
          description="Real things people have built. Get inspired. Get competitive. Get building."
        />
        <Gallery items={artifacts} />
        <motion.div
          className="mt-16 text-center"
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <a href="#" className="btn-secondary">
            Submit yours
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </a>
        </motion.div>
      </Section>

      {/* Final CTA */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-dark-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-600/10 rounded-full blur-[200px] pointer-events-none" />

        <div className="container-main section-padding relative z-10">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2
              className="heading-1 mb-6"
              variants={scaleVariants}
            >
              Ready to build something weird?
            </motion.h2>

            <motion.p
              className="text-lg text-dark-200 mb-4"
              variants={variants}
            >
              Whether you're a serial tinkerer, a "I just want to automate one thing" person,
              or someone who's been waiting for permission to play—this is it.
            </motion.p>

            <motion.p
              className="text-dark-400 mb-10"
              variants={variants}
            >
              A few hours a week. More if you're having fun. Zero if you're not.
            </motion.p>

            <motion.div variants={variants}>
              <a href="#" className="btn-primary text-lg px-8 py-4">
                Enter the Rama
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
