import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUp, Globe, MessageSquare, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button.jsx'
import { BarGraph, CircleGraph } from '../components/visuals/GradientGraphs.jsx'

const STITCH_VIDEO_URL =
  'https://storage.googleapis.com/gweb-gemini-cdn/gemini/uploads/89e9004d716a7803fc7c9aab18c985af783f5a36.mp4'

const MODES = [
  { id: 'ai-chat', label: 'AI chat', icon: MessageSquare },
  { id: 'web-app', label: 'Web app', icon: Globe },
]

const TYPEWRITER_WORDS = [
  'Network Edge Planner',
  'Interconnection Advisor',
  'Latency Path Explorer',
  'Global Footprint Mapper',
]

function EquinixFortressBackdrop({ mouse, mouseClient }) {
  const containerRef = useRef(null)
  const [revealCenter, setRevealCenter] = useState({ x: 50, y: 50 })

  const driftX = ((mouse.x - 50) / 50) * 10
  const driftY = ((mouse.y - 50) / 50) * 6

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clamp(((mouseClient.x - rect.left) / rect.width) * 100, 0, 100)
    const y = clamp(((mouseClient.y - rect.top) / rect.height) * 100, 0, 100)
    setRevealCenter({ x, y })
  }, [mouseClient])

  const revealMask = `radial-gradient(160px 100px at ${revealCenter.x}% ${revealCenter.y}%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 76%)`

  return (
    <div
      ref={containerRef}
      className="absolute left-[42%] top-[1%] z-[1] -translate-x-1/2 overflow-hidden"
      style={{ width: 'clamp(520px, 68vw, 980px)', height: 'clamp(260px, 50vh, 520px)' }}
      aria-hidden
    >
      <svg
        viewBox="0 0 1000 420"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${driftX}px, ${driftY}px)`,
          opacity: 0.34,
        }}
      >
        <g fill="#111623">
          <rect x="90" y="130" width="72" height="160" rx="30" />
          <rect x="190" y="90" width="72" height="240" rx="30" />
          <rect x="290" y="48" width="72" height="324" rx="30" />
          <rect x="390" y="90" width="72" height="240" rx="30" />
          <rect x="490" y="130" width="72" height="160" rx="30" />
          <rect x="590" y="170" width="72" height="80" rx="30" />
        </g>
      </svg>
      <svg
        viewBox="0 0 1000 420"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full transition-transform duration-200 ease-out"
        style={{
          transform: `translate(${driftX}px, ${driftY}px)`,
          opacity: 0.9,
          WebkitMaskImage: revealMask,
          maskImage: revealMask,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <defs>
          <linearGradient id="eq-fortress-reveal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a3347" />
            <stop offset="55%" stopColor="#3a4762" />
            <stop offset="100%" stopColor="#252f44" />
          </linearGradient>
        </defs>
        <g fill="url(#eq-fortress-reveal)">
          <rect x="90" y="130" width="72" height="160" rx="30" />
          <rect x="190" y="90" width="72" height="240" rx="30" />
          <rect x="290" y="48" width="72" height="324" rx="30" />
          <rect x="390" y="90" width="72" height="240" rx="30" />
          <rect x="490" y="130" width="72" height="160" rx="30" />
          <rect x="590" y="170" width="72" height="80" rx="30" />
        </g>
      </svg>
    </div>
  )
}

const REGION_OPTIONS = ['US East', 'US West', 'Continental Europe', 'APAC', 'Latin America', 'Middle East & Africa']
const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

const QUESTIONNAIRE = [
  {
    id: 'providers',
    stepLabel: 'Cloud Providers',
    type: 'range',
    title: 'How many cloud and SaaS providers does your organization use?',
    description: 'This helps us understand the complexity of your current infrastructure landscape.',
    min: 0,
    max: 100,
    defaultValue: 36,
  },
  {
    id: 'cloudEnvironments',
    stepLabel: 'Cloud Environments',
    type: 'multi',
    title: 'What are the most critical cloud environments for your business?',
    description: 'Select all that apply to your current infrastructure setup.',
    options: [
      'Amazon Web Services (AWS)',
      'Microsoft Azure',
      'Google Cloud',
      'Oracle Cloud',
      'Other IaaS and PaaS clouds',
      'Other SaaS clouds',
      'Industry-specific cloud services',
      'Regional/local cloud services',
    ],
  },
  {
    id: 'multicloudDrivers',
    stepLabel: 'Multicloud Drivers',
    type: 'multi',
    title: 'What factors are driving your hybrid multicloud approach?',
    description: 'This helps us understand the complexity of your current infrastructure to interconnect.',
    options: ['Productivity', 'Security', 'Scalability', 'AI enablement', 'Cost optimization'],
  },
  {
    id: 'industry',
    stepLabel: 'Industry',
    type: 'single',
    title: "What is your organization's primary industry vertical?",
    description: 'This allows us to provide industry-specific recommendations.',
    options: [
      'Financial Services',
      'Healthcare and Life Sciences',
      'Technology and Professional Services',
      'Manufacturing and Industrial',
      'Retail and Consumer Services',
      'Media and Entertainment',
      'Energy and Utilities',
      'Public Sector and Government',
      'Cloud and IT Services',
      'Network Services',
    ],
  },
  {
    id: 'userScale',
    stepLabel: 'User Scale',
    type: 'single',
    title: 'How many users do you support across your infrastructure?',
    description: 'Include both internal employees and external customers or partners.',
    options: [
      'Less than 1,000',
      '1,000 - 10,000',
      '10,001 - 50,000',
      '50,001 - 100,000',
      '100,001 - 1,000,000',
      '1,000,001 - 10,000,000',
      'More than 10,000,000',
    ],
  },
  {
    id: 'locations',
    stepLabel: 'User Locations',
    type: 'locationSet',
    title: 'Where are your users located globally?',
    description: 'Help us understand your user distribution to optimize your infrastructure strategy.',
  },
  {
    id: 'goals',
    stepLabel: 'Strategic Goals',
    type: 'multi',
    title: 'What are your primary strategic goals?',
    description: 'Select your top priorities for the next 12 months.',
    options: [
      'Enhancing security and compliance',
      'Supporting AI and ML initiatives',
      'Improving scalability and future-proofing',
      'Improving developer productivity',
      'Reducing infrastructure costs',
      'Expanding to new geographies',
      'Improving sustainability efforts',
      'Choosing key ecosystem partners',
    ],
  },
  {
    id: 'hq',
    stepLabel: 'Headquarter',
    type: 'autocomplete',
    title: 'Where is your organization headquartered?',
    description: 'This helps us understand your primary regulatory and business environment.',
    suggestions: [
      'Milpitas, Santa Clara County, California, United States',
      'London, United Kingdom',
      'Frankfurt, Germany',
      'Singapore',
      'Mumbai, India',
      'Sydney, Australia',
    ],
  },
  {
    id: 'contact',
    stepLabel: 'Contact Info',
    type: 'contact',
    title: 'Get your personalized report',
    description:
      'Complete your assessment and receive actionable insights and recommendations tailored to your organization.',
  },
]

const EMPTY_CONTACT = { name: '', email: '', company: '' }

function toResponseSummary(question, value) {
  if (question.type === 'range') return `${value} providers`
  if (question.type === 'single' || question.type === 'autocomplete') return value || 'No response'
  if (question.type === 'multi') return value.length ? value.join(', ') : 'No selection'
  if (question.type === 'locationSet') {
    return [value.primary ? `Primary: ${value.primary}` : null, value.high.length ? `High: ${value.high.join(', ')}` : null, value.emerging ? `Emerging: ${value.emerging}` : null]
      .filter(Boolean)
      .join(' | ')
  }
  if (question.type === 'contact') return `${value.name} • ${value.email} • ${value.company}`
  return 'Answered'
}

function normalizeDraft(question, draft) {
  if (question.type === 'range') return Number(draft ?? question.defaultValue ?? 0)
  if (question.type === 'single' || question.type === 'autocomplete') return draft ?? ''
  if (question.type === 'multi') return Array.isArray(draft) ? draft : []
  if (question.type === 'locationSet') {
    return draft ?? { primary: '', high: [], emerging: '' }
  }
  if (question.type === 'contact') return draft ?? EMPTY_CONTACT
  return draft
}

function isAnswerValid(question, answer) {
  if (question.type === 'range') return Number.isFinite(answer)
  if (question.type === 'single' || question.type === 'autocomplete') return Boolean(answer?.trim())
  if (question.type === 'multi') return Array.isArray(answer) && answer.length > 0
  if (question.type === 'locationSet') return Boolean(answer.primary && answer.emerging)
  if (question.type === 'contact') return Boolean(answer.name && answer.email && answer.company)
  return true
}

function getInsight(questionId, answer) {
  if (questionId === 'providers') {
    const selected = Number(answer)
    const delta = selected - 36
    const tier =
      selected <= 20
        ? {
            label: 'Focused stack',
            recommendation: 'Keep architecture simple and add providers only when clear business value exists.',
          }
        : selected <= 50
          ? {
              label: 'Balanced multicloud',
              recommendation: 'Prioritize integration patterns and policy guardrails before expanding further.',
            }
          : {
              label: 'High orchestration complexity',
              recommendation: 'Invest in centralized observability and automation to reduce operational overhead.',
            }

    const clampPct = (n) => Math.max(0, Math.min(100, n))
    const providerPct = clampPct((selected / 100) * 100)
    const integrationEffort = clampPct(20 + selected * 0.8)
    const governanceLoad = clampPct(15 + selected * 0.9)
    const vendorOps = clampPct(10 + selected * 0.85)

    return {
      visual: 'provider-gauge',
      title: 'Provider Complexity Gauge',
      description:
        'See how your provider count compares to industry baseline and how complexity shifts as your stack grows.',
      selected,
      average: 36,
      providerPct,
      deltaText:
        delta === 0
          ? 'At industry average'
          : `${Math.abs(delta)} ${delta > 0 ? 'above' : 'below'} industry average`,
      tierLabel: tier.label,
      tierRecommendation: tier.recommendation,
      derived: [
        { label: 'Integration effort', value: Math.round(integrationEffort) },
        { label: 'Governance overhead', value: Math.round(governanceLoad) },
        { label: 'Vendor management load', value: Math.round(vendorOps) },
      ],
      metrics: [],
    }
  }

  if (questionId === 'cloudEnvironments') {
    const selectedClouds = Array.isArray(answer) ? answer : []
    const selected = new Set(selectedClouds)
    const count = selectedClouds.length
    const hyperscalers = ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Google Cloud', 'Oracle Cloud']
    const selectedHyperscalers = hyperscalers.filter((h) => selected.has(h))
    const selectedOther = selectedClouds.filter((item) => !hyperscalers.includes(item))
    const hyperscalerCount = selectedHyperscalers.length
    const base = {
      dataAnalytics: 64,
      enterpriseWorkloads: 56,
      customerApps: 52,
      devOps: 48,
    }
    if (selected.has('Amazon Web Services (AWS)')) base.enterpriseWorkloads += 5
    if (selected.has('Microsoft Azure')) base.devOps += 6
    if (selected.has('Google Cloud')) base.dataAnalytics += 7
    if (selected.has('Oracle Cloud')) base.enterpriseWorkloads += 4
    if (selected.has('Other SaaS clouds')) base.customerApps += 6
    if (selected.has('Regional/local cloud services')) base.customerApps += 5

    const breadthBoost = Math.min(10, count * 2)
    const portfolioBreadth = Math.min(100, 18 + count * 11)
    const hyperscalerDependency = Math.min(100, 20 + hyperscalerCount * 16)
    const interoperabilityNeed = Math.min(100, 24 + count * 9)

    return {
      visual: 'cloud-environments',
      title: 'Multicloud Drivers Analysis',
      description:
        '50% of enterprise application workloads now operate in multicloud or hybrid cloud setups. Organizations leverage these setups for diverse purposes:',
      selectedClouds,
      summary: `${count} critical environment${count === 1 ? '' : 's'} selected`,
      selectedHyperscalers,
      selectedOther,
      kpis: [
        { label: 'Portfolio breadth', value: portfolioBreadth },
        { label: 'Hyperscaler dependency', value: hyperscalerDependency },
        { label: 'Interoperability need', value: interoperabilityNeed },
      ],
      metrics: [
        { label: 'Data & Analytics', value: Math.min(92, base.dataAnalytics + breadthBoost) },
        { label: 'Enterprise Workloads', value: Math.min(92, base.enterpriseWorkloads + breadthBoost) },
        { label: 'Customer Apps', value: Math.min(92, base.customerApps + breadthBoost) },
        { label: 'DevOps', value: Math.min(92, base.devOps + breadthBoost) },
      ],
    }
  }

  if (questionId === 'multicloudDrivers') {
    const selected = answer[0] ?? 'Security'
    return {
      title: 'Industry Drivers Analysis',
      description: "Here's how your priorities compare to industry averages:",
      metrics: [
        { label: 'Scalability', value: 54 },
        { label: 'Productivity', value: 48 },
        { label: 'Cost', value: 47 },
        { label: 'Security', value: 45, highlight: selected.toLowerCase().includes('security') },
        { label: 'AI', value: 45, highlight: selected.toLowerCase().includes('ai') },
      ],
    }
  }

  if (questionId === 'locations') {
    const selectedPrimary = answer?.primary ?? ''
    const selectedHigh = Array.isArray(answer?.high) ? answer.high : []
    const selectedEmerging = answer?.emerging ?? ''
    const selectedCount = [selectedPrimary, ...selectedHigh, selectedEmerging].filter(Boolean).length
    const uniqueRegions = [...new Set([selectedPrimary, ...selectedHigh, selectedEmerging].filter(Boolean))]

    const regionToPoint = {
      'US East': { x: 28, y: 41 },
      'US West': { x: 20, y: 40 },
      'Continental Europe': { x: 50, y: 35 },
      APAC: { x: 76, y: 47 },
      'Latin America': { x: 31, y: 62 },
      'Middle East & Africa': { x: 56, y: 56 },
    }

    const markers = uniqueRegions.map((region) => ({
      label: region,
      ...regionToPoint[region],
    }))

    return {
      visual: 'global-footprint',
      title: 'Global User Footprint',
      description:
        'View your current footprint on a global lens and prioritize interconnection strategy by concentration tier.',
      summary: `${selectedCount} region${selectedCount === 1 ? '' : 's'} configured`,
      markers,
      highlights: [
        selectedPrimary ? `Primary concentration: ${selectedPrimary}` : 'Select a primary concentration region',
        selectedHigh.length ? `High concentrations: ${selectedHigh.join(', ')}` : 'Add one or more high-concentration regions',
        selectedEmerging ? `Emerging concentration: ${selectedEmerging}` : 'Select an emerging concentration region',
      ],
      metrics: [
        { label: 'Coverage confidence', value: Math.min(95, 28 + selectedCount * 14) },
        { label: 'Latency risk spread', value: Math.max(18, 72 - selectedCount * 8) },
        { label: 'Interconnection priority', value: Math.min(92, 24 + uniqueRegions.length * 15) },
      ],
    }
  }

  if (questionId === 'goals') {
    const selected = answer[0] ?? 'Expanding to new geographies'
    return {
      title: 'Strategic Priority Benchmarks',
      description: "Here's how your priorities compare to industry averages:",
      metrics: [
        { label: 'Enhancing security and compliance', value: 53 },
        { label: 'Supporting AI and ML initiatives', value: 49 },
        { label: 'Improving scalability and future-proofing', value: 55 },
        { label: 'Improving developer productivity', value: 47 },
        { label: 'Reducing infrastructure costs', value: 51 },
        { label: 'Expanding to new geographies', value: 46, highlight: selected === 'Expanding to new geographies' },
        { label: 'Improving sustainability efforts', value: 44 },
        { label: 'Choosing key ecosystem partners', value: 45 },
      ],
    }
  }

  return {
    title: 'Response captured',
    description: 'Your response has been applied to the evolving architecture recommendation model.',
    metrics: [],
  }
}

export function ChatInterfacePage() {
  const [mode, setMode] = useState('ai-chat')
  const [aiInput, setAiInput] = useState('')
  const [mouse, setMouse] = useState({ x: 50, y: 50 })
  const [wordIndex, setWordIndex] = useState(0)
  const [typed, setTyped] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [mouseClient, setMouseClient] = useState({ x: 0, y: 0 })
  const [viewState, setViewState] = useState('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [messages, setMessages] = useState([])
  const [aiMessages, setAiMessages] = useState([
    {
      role: 'assistant',
      text: 'I can guide you to assess cloud complexity and shape a practical architecture strategy.',
    },
    {
      role: 'assistant',
      text: 'First question: How many cloud and SaaS providers does your organization use?',
    },
    {
      role: 'assistant',
      text: 'Please reply with a value between 0 and 100.',
    },
  ])
  const [aiProviderValue, setAiProviderValue] = useState(36)
  const [aiHasInput, setAiHasInput] = useState(false)
  const [drafts, setDrafts] = useState({
    providers: QUESTIONNAIRE[0].defaultValue,
    cloudEnvironments: [],
    multicloudDrivers: [],
    industry: '',
    userScale: '',
    locations: { primary: '', high: [], emerging: '' },
    goals: [],
    hq: '',
    contact: EMPTY_CONTACT,
  })
  const [latestInsight, setLatestInsight] = useState(null)
  const mouseRafRef = useRef(null)
  const pendingMouseRef = useRef(null)
  const lastMouseRef = useRef({ x: 50, y: 50 })

  const canSend = aiInput.trim().length > 0
  const activeQuestion = QUESTIONNAIRE[questionIndex] ?? null
  const currentDraft = activeQuestion ? normalizeDraft(activeQuestion, drafts[activeQuestion.id]) : null
  const canContinue = activeQuestion ? isAnswerValid(activeQuestion, currentDraft) : false
  const rightPanelInsight =
    mode === 'web-app'
      ? activeQuestion
        ? getInsight(activeQuestion.id, currentDraft)
        : latestInsight
      : aiHasInput
        ? getInsight('providers', aiProviderValue)
        : null
  const totalQuestions = QUESTIONNAIRE.length
  const currentStep = Math.min(questionIndex + 1, totalQuestions)
  const progressPercent = (currentStep / totalQuestions) * 100
  const gridStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 38%, transparent) 1px, transparent 0)',
      backgroundSize: '22px 22px',
      opacity: 0.4,
    }),
    [],
  )

  const gridHighlightStyle = useMemo(
    () => ({
      backgroundImage:
        'radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 78%, transparent) 1px, transparent 0)',
      backgroundSize: '22px 22px',
      opacity: 0.42,
      maskImage: `radial-gradient(210px circle at ${mouse.x}% ${mouse.y}%, black 42%, transparent 100%)`,
      WebkitMaskImage: `radial-gradient(210px circle at ${mouse.x}% ${mouse.y}%, black 42%, transparent 100%)`,
    }),
    [mouse],
  )

  const onSelectMode = (nextMode) => {
    setMode(nextMode)
    console.log(`mode changed: ${nextMode}`)
  }

  const updateDraft = (questionId, nextValue) => {
    setDrafts((prev) => ({ ...prev, [questionId]: nextValue }))
  }

  const submitAiMessage = () => {
    const text = aiInput.trim()
    if (!text) return

    const numericMatch = text.match(/-?\d+(\.\d+)?/)
    const parsed = numericMatch ? Number.parseFloat(numericMatch[0]) : Number.NaN
    const normalized = Number.isFinite(parsed) && parsed >= 0 && parsed <= 100 ? Math.round(parsed) : 5
    setAiHasInput(true)
    setAiProviderValue(normalized)
    setAiMessages((prev) => [
      ...prev,
      { role: 'user', text },
      {
        role: 'assistant',
        text: `Captured provider count: ${normalized}. I updated the Provider Complexity Gauge on the right.`,
      },
      {
        role: 'assistant',
        text: 'You can enter another number (0-100) and I will refresh the analysis.',
      },
    ])
    setAiInput('')
  }

  const goToQuestion = (targetIndex) => {
    const bounded = Math.max(0, Math.min(targetIndex, QUESTIONNAIRE.length - 1))
    if (bounded > questionIndex) return
    setQuestionIndex(bounded)
    const targetQuestion = QUESTIONNAIRE[bounded]
    const draft = normalizeDraft(targetQuestion, drafts[targetQuestion.id])
    setLatestInsight(getInsight(targetQuestion.id, draft))
  }

  const submitActiveQuestion = () => {
    if (!activeQuestion || !canContinue) return
    const finalAnswer = normalizeDraft(activeQuestion, drafts[activeQuestion.id])
    const responseSummary = toResponseSummary(activeQuestion, finalAnswer)
    const nextAnswers = { ...answers, [activeQuestion.id]: finalAnswer }
    setAnswers(nextAnswers)
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', text: activeQuestion.title },
      { role: 'user', text: responseSummary },
    ])
    setLatestInsight(getInsight(activeQuestion.id, finalAnswer))
    setQuestionIndex((prev) => prev + 1)
  }

  useEffect(() => {
    const target = TYPEWRITER_WORDS[wordIndex]
    const doneTyping = typed === target
    const doneDeleting = typed.length === 0

    let timeoutMs = isDeleting ? 45 : 85
    if (doneTyping && !isDeleting) timeoutMs = 1100
    if (doneDeleting && isDeleting) timeoutMs = 320

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        if (doneTyping) {
          setIsDeleting(true)
          return
        }
        setTyped(target.slice(0, typed.length + 1))
        return
      }

      if (doneDeleting) {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length)
        return
      }
      setTyped(target.slice(0, typed.length - 1))
    }, timeoutMs)

    return () => window.clearTimeout(timer)
  }, [isDeleting, typed, wordIndex])

  useEffect(() => {
    return () => {
      if (mouseRafRef.current) {
        window.cancelAnimationFrame(mouseRafRef.current)
      }
    }
  }, [])

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#04060b] text-foreground"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMouseClient({ x: e.clientX, y: e.clientY })
        pendingMouseRef.current = {
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        }

        if (mouseRafRef.current) return
        mouseRafRef.current = window.requestAnimationFrame(() => {
          mouseRafRef.current = null
          if (!pendingMouseRef.current) return

          const next = pendingMouseRef.current
          pendingMouseRef.current = null
          const last = lastMouseRef.current

          // Avoid tiny updates that cause unnecessary re-renders.
          if (Math.abs(next.x - last.x) < 1 && Math.abs(next.y - last.y) < 1) return

          lastMouseRef.current = next
          setMouse(next)
        })
      }}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <EquinixFortressBackdrop mouse={mouse} mouseClient={mouseClient} />
        <video
          aria-label=""
          width="1920"
          height="1080"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-x-0 -bottom-[14%] h-[120%] w-full object-cover object-bottom opacity-70 brightness-125 saturate-110 transition-transform duration-500 ease-out ${
            viewState === 'ready' ? 'translate-y-[40%]' : 'translate-y-[12%]'
          }`}
        >
          <source src={STITCH_VIDEO_URL} type="video/mp4" />
        </video>
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            viewState === 'ready'
              ? 'bg-gradient-to-b from-background/42 via-background/38 to-background/52'
              : 'bg-gradient-to-b from-background/30 via-background/25 to-background/40'
          }`}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-10" style={gridStyle} />
      <div className="pointer-events-none absolute inset-0 z-10" style={gridHighlightStyle} />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6">
        <header className="mb-6 flex items-center justify-between rounded-lg bg-[#04060b]/55 px-2 py-1.5 backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">kb lite app</p>
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" className="transition hover:text-foreground">
              Home
            </Link>
            <Link to="/theme" className="transition hover:text-foreground">
              Theme
            </Link>
            <Link to="/map-preloader" className="transition hover:text-foreground">
              Map loader
            </Link>
          </nav>
        </header>

        <div className="flex flex-1 flex-col justify-center">
          <section
            className={`w-full max-w-3xl space-y-3 transition-all duration-700 ease-out ${
              viewState === 'ready'
                ? 'mb-4 text-left opacity-100'
                : 'mx-auto mb-0 max-w-2xl text-center opacity-100'
            }`}
          >
            <h1
              className={`font-semibold tracking-tight transition-all duration-700 ${
                viewState === 'ready' ? 'text-3xl sm:text-4xl' : 'text-4xl sm:text-5xl'
              }`}
            >
              Build your architecture with KB
            </h1>
            <p
              className={`min-h-8 text-muted-foreground transition-all duration-700 ${
                viewState === 'ready' ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}
            >
              Design faster with{' '}
              <span className="font-medium text-foreground">
                {typed}
                <span className="ml-0.5 inline-block h-[1em] w-[1px] animate-pulse bg-foreground align-[-0.15em]" />
              </span>
            </p>
            <div
              className={`overflow-hidden transition-all duration-700 ease-out ${
                viewState === 'ready' ? 'mt-0 max-h-0 opacity-0' : 'mt-3 max-h-14 opacity-100'
              }`}
            >
              <Button
                size="lg"
                className="rounded-lg"
                onClick={() => setViewState('ready')}
              >
                Begin Assesment
              </Button>
            </div>
          </section>

          <main
            className={`grid grid-cols-1 gap-4 overflow-hidden transition-all duration-700 lg:grid-cols-12 ${
              viewState === 'ready'
                ? 'h-[50vh] min-h-[420px] max-h-[560px] min-h-0 translate-y-0 opacity-100'
                : 'pointer-events-none max-h-0 min-h-0 translate-y-6 opacity-0'
            }`}
          >
          <div className="min-h-0 lg:col-span-7">
            <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/65 p-4 shadow-2xl backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="size-4" aria-hidden />
                Chat assistant
              </div>

              <div
                role="radiogroup"
                className="mb-4 inline-flex w-fit gap-1 rounded-[32px] border border-border/70 bg-background/65 p-1 backdrop-blur-[40px]"
              >
                {MODES.map(({ id, label, icon: Icon }) => {
                  const selected = mode === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => onSelectMode(id)}
                      className={`relative rounded-[32px] px-4 py-2 text-sm font-medium transition ${
                        selected
                          ? 'bg-foreground/10 text-foreground'
                          : 'text-muted-foreground hover:bg-accent/70 hover:text-foreground'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <Icon className="size-4" aria-hidden />
                        {label}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="h-0 min-h-0 flex-1 space-y-3 overflow-y-auto rounded-2xl border border-border/60 bg-background/55 p-4">
                {mode === 'web-app' ? (
                  <>
                    {activeQuestion ? (
                      <div className="space-y-3 rounded-xl border border-border/70 bg-card/70 p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        <span>{activeQuestion.stepLabel}</span>
                        <span>
                          {currentStep} of {totalQuestions}
                        </span>
                      </div>
                      <div className="relative h-2 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-between px-0.5">
                          {Array.from({ length: totalQuestions }).map((_, idx) => {
                            const checkpointStep = idx + 1
                            const active = checkpointStep <= currentStep
                            const canJumpBack = idx <= questionIndex
                            return (
                              <button
                                key={`checkpoint-${checkpointStep}`}
                                type="button"
                                onClick={() => goToQuestion(idx)}
                                disabled={!canJumpBack}
                                className={`size-2 rounded-full border ${
                                  active
                                    ? 'border-primary bg-primary'
                                    : 'border-border bg-card'
                                } ${canJumpBack ? 'cursor-pointer' : 'cursor-default opacity-70'}`}
                                aria-label={`Go to question ${checkpointStep}`}
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <p className="text-base font-medium">{activeQuestion.title}</p>
                    <p className="text-sm text-muted-foreground">{activeQuestion.description}</p>

                    {activeQuestion.type === 'range' ? (
                      <div className="space-y-2">
                        <div className="text-2xl font-semibold">{currentDraft}</div>
                        <input
                          type="range"
                          min={activeQuestion.min}
                          max={activeQuestion.max}
                          value={currentDraft}
                          onChange={(e) => updateDraft(activeQuestion.id, Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>
                    ) : null}

                    {activeQuestion.type === 'single' ? (
                      <div className="space-y-2">
                        {activeQuestion.options.map((option) => (
                          <label
                            key={option}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                              currentDraft === option
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-background/50 hover:bg-accent/40'
                            }`}
                          >
                            <input
                              type="radio"
                              name={activeQuestion.id}
                              checked={currentDraft === option}
                              onChange={() => updateDraft(activeQuestion.id, option)}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    ) : null}

                    {activeQuestion.type === 'multi' ? (
                      <div className="space-y-2">
                        {activeQuestion.options.map((option) => (
                          <label
                            key={option}
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                              currentDraft.includes(option)
                                ? 'border-primary bg-primary/10'
                                : 'border-border bg-background/50 hover:bg-accent/40'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={currentDraft.includes(option)}
                              onChange={() => {
                                const next = currentDraft.includes(option)
                                  ? currentDraft.filter((v) => v !== option)
                                  : [...currentDraft, option]
                                updateDraft(activeQuestion.id, next)
                              }}
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    ) : null}

                    {activeQuestion.type === 'locationSet' ? (
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Where is your highest concentration of users? *</p>
                          <select
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                            value={currentDraft.primary}
                            onChange={(e) =>
                              updateDraft(activeQuestion.id, { ...currentDraft, primary: e.target.value })
                            }
                          >
                            <option value="">Select your primary region</option>
                            {REGION_OPTIONS.map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">Where do you have high concentrations of users?</p>
                          <div className="space-y-2 rounded-md border border-border bg-background px-3 py-2">
                            <div className="flex flex-wrap gap-1.5">
                              {currentDraft.high.length ? (
                                currentDraft.high.map((region) => (
                                  <button
                                    key={region}
                                    type="button"
                                    onClick={() =>
                                      updateDraft(activeQuestion.id, {
                                        ...currentDraft,
                                        high: currentDraft.high.filter((r) => r !== region),
                                      })
                                    }
                                    className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-[11px] text-foreground"
                                  >
                                    {region}
                                    <span className="text-muted-foreground">x</span>
                                  </button>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">No high concentration regions selected.</span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <select
                                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                                value=""
                                onChange={(e) => {
                                  const selected = e.target.value
                                  if (!selected) return
                                  if (currentDraft.high.includes(selected)) return
                                  updateDraft(activeQuestion.id, { ...currentDraft, high: [...currentDraft.high, selected] })
                                }}
                              >
                                <option value="">Add high-concentration region</option>
                                {REGION_OPTIONS.filter((region) => !currentDraft.high.includes(region)).map((region) => (
                                  <option key={region} value={region}>
                                    {region}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground">
                            Where do you have emerging concentrations of users? *
                          </p>
                          <select
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                            value={currentDraft.emerging}
                            onChange={(e) =>
                              updateDraft(activeQuestion.id, { ...currentDraft, emerging: e.target.value })
                            }
                          >
                            <option value="">Select emerging markets</option>
                            {REGION_OPTIONS.map((region) => (
                              <option key={region} value={region}>
                                {region}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : null}

                    {activeQuestion.type === 'autocomplete' ? (
                      <div className="space-y-1">
                        <input
                          list="hq-suggestions"
                          value={currentDraft}
                          onChange={(e) => updateDraft(activeQuestion.id, e.target.value)}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                          placeholder="Enter headquarters location"
                        />
                        <datalist id="hq-suggestions">
                          {activeQuestion.suggestions.map((item) => (
                            <option key={item} value={item} />
                          ))}
                        </datalist>
                      </div>
                    ) : null}

                    {activeQuestion.type === 'contact' ? (
                      <div className="space-y-2">
                        <input
                          value={currentDraft.name}
                          onChange={(e) => updateDraft(activeQuestion.id, { ...currentDraft, name: e.target.value })}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                          placeholder="Your full name"
                        />
                        <input
                          value={currentDraft.email}
                          onChange={(e) => updateDraft(activeQuestion.id, { ...currentDraft, email: e.target.value })}
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                          placeholder="your.email@company.com"
                        />
                        <input
                          value={currentDraft.company}
                          onChange={(e) =>
                            updateDraft(activeQuestion.id, { ...currentDraft, company: e.target.value })
                          }
                          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                          placeholder="Your organization name"
                        />
                      </div>
                    ) : null}

                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={() => goToQuestion(questionIndex - 1)}
                        disabled={questionIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button onClick={submitActiveQuestion} disabled={!canContinue}>
                        {questionIndex + 1 === QUESTIONNAIRE.length ? 'Generate My Report' : 'Continue'}
                      </Button>
                    </div>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-border/70 bg-card/70 p-4 text-sm text-muted-foreground">
                        Assessment submitted. We are building your personalized report now.
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {aiMessages.map((msg, idx) => (
                      <div
                        key={`ai-${msg.role}-${idx}`}
                        className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === 'assistant'
                            ? 'border border-border/70 bg-card text-foreground'
                            : 'ml-auto bg-primary/15 text-foreground'
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </>
                )}
              </div>

              {mode === 'ai-chat' ? (
                <div className="mt-4 rounded-2xl border border-border/70 bg-background/75 p-3 backdrop-blur">
                  <div className="flex items-end gap-3">
                    <textarea
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          submitAiMessage()
                        }
                      }}
                      rows={2}
                      placeholder="Type your question..."
                      className="min-h-[56px] max-h-40 flex-1 resize-none overflow-y-auto bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    />
                    <button
                      type="button"
                      aria-label="Send message"
                      onClick={submitAiMessage}
                      aria-disabled={!canSend || viewState !== 'ready'}
                      disabled={!canSend || viewState !== 'ready'}
                      className="flex size-9 items-center justify-center rounded-full border border-border bg-card transition enabled:hover:scale-[1.05] enabled:active:scale-[0.95] enabled:hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ArrowUp className="size-4" aria-hidden />
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="flex h-full flex-col rounded-3xl border border-dashed border-border/80 bg-card/55 p-6 text-sm backdrop-blur-xl">
              {mode === 'web-app' ? (
                <>
                  {rightPanelInsight ? (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold">{rightPanelInsight.title}</h3>
                      <p className="text-muted-foreground">{rightPanelInsight.description}</p>

                      {rightPanelInsight.visual === 'provider-gauge' ? (
                        <div className="rounded-xl border border-border/70 bg-card/60 p-4">
                          <div className="grid items-start gap-4 md:grid-cols-[3fr_2fr]">
                            <div>
                              <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                                Your provider count
                              </p>
                              <div className="flex items-center justify-center">
                                <CircleGraph
                                  value={rightPanelInsight.selected}
                                  size={180}
                                  mode="dynamic"
                                  valueSuffix=""
                                />
                              </div>
                              <p className="mt-2 text-center text-xs text-muted-foreground">
                                * Industry avg {rightPanelInsight.average}
                              </p>
                            </div>

                            <div className="space-y-2">
                              {rightPanelInsight.derived.map((metric) => (
                                <div key={metric.label} className="rounded-lg border border-border/60 bg-background/60 p-2">
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-[11px] text-muted-foreground">{metric.label}</p>
                                    <div className="shrink-0">
                                      <CircleGraph
                                        value={metric.value}
                                        size={64}
                                        strokeWidth={6}
                                        variant="compact"
                                        valueFontSize={13}
                                        mode="dynamic"
                                      />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {rightPanelInsight.visual === 'cloud-environments' ? (
                        <div className="space-y-3 rounded-xl border border-border/70 bg-card/60 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Selected environments</p>
                            <p className="text-xs text-muted-foreground">{rightPanelInsight.summary}</p>
                          </div>
                          <div className="rounded-lg border border-border/70 bg-background/70 p-2">
                            <p className="mb-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                              Multicloud workload profile
                            </p>
                            <div className="min-h-[150px]">
                              <BarGraph
                                values={rightPanelInsight.metrics.map((m) => ({
                                  label: m.label,
                                  value: m.value,
                                  mode: 'dataset',
                                }))}
                                height={9}
                                gap={3}
                              />
                            </div>
                          </div>

                          <div className="rounded-lg border border-border/70 bg-background/70 p-2">
                            <p className="mb-2 text-[11px] uppercase tracking-wide text-muted-foreground">
                              Environment selections
                            </p>
                            <div className="min-h-[58px]">
                              <div className="flex flex-wrap gap-1.5">
                                {rightPanelInsight.selectedClouds?.length ? (
                                  rightPanelInsight.selectedClouds.map((item) => (
                                    <span
                                      key={item}
                                      className="rounded-full border border-border/70 bg-card px-2 py-1 text-[11px] text-foreground"
                                    >
                                      {item}
                                    </span>
                                  ))
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    Select cloud environments to see analysis.
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {rightPanelInsight.visual === 'global-footprint' ? (
                        <div className="space-y-3 rounded-xl border border-border/70 bg-card/60 p-4">
                          <div className="flex items-center justify-between">
                            <p className="text-xs uppercase tracking-wide text-muted-foreground">Global footprint view</p>
                            <p className="text-xs text-muted-foreground">{rightPanelInsight.summary}</p>
                          </div>

                          <div className="rounded-lg border border-border/70 bg-background/75 p-3">
                            <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full border border-border/70 bg-[#0a1224]">
                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_35%,rgba(56,189,248,0.2),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.18),transparent_50%)]" />
                              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                                <defs>
                                  <linearGradient id="globe-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#38bdf8" />
                                    <stop offset="100%" stopColor="#a855f7" />
                                  </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="45" fill="none" stroke="url(#globe-ring)" strokeOpacity="0.6" />
                                <ellipse cx="50" cy="50" rx="35" ry="45" fill="none" stroke="rgba(148,163,184,0.35)" />
                                <ellipse cx="50" cy="50" rx="18" ry="45" fill="none" stroke="rgba(148,163,184,0.25)" />
                                <ellipse cx="50" cy="50" rx="45" ry="24" fill="none" stroke="rgba(148,163,184,0.25)" />
                                <ellipse cx="50" cy="50" rx="45" ry="10" fill="none" stroke="rgba(148,163,184,0.22)" />
                                {rightPanelInsight.markers.map((marker) => (
                                  <g key={marker.label}>
                                    <circle cx={marker.x} cy={marker.y} r="2.2" fill="#f97316" />
                                    <circle cx={marker.x} cy={marker.y} r="4.4" fill="#f97316" fillOpacity="0.22" />
                                  </g>
                                ))}
                              </svg>
                            </div>
                          </div>

                          <div className="space-y-1">
                            {rightPanelInsight.highlights.map((item) => (
                              <p key={item} className="text-xs text-muted-foreground">
                                {item}
                              </p>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {rightPanelInsight.metrics?.length &&
                      rightPanelInsight.visual !== 'provider-gauge' &&
                      rightPanelInsight.visual !== 'cloud-environments' &&
                      rightPanelInsight.visual !== 'global-footprint' ? (
                        <div className="space-y-2">
                          {rightPanelInsight.metrics.map((metric) => (
                            <div key={metric.label} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className={metric.highlight ? 'font-semibold text-foreground' : 'text-muted-foreground'}>
                                  {metric.label}
                                </span>
                                <span>{metric.value}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-muted">
                                <div
                                  className={`h-full rounded-full ${metric.highlight ? 'bg-primary' : 'bg-foreground/50'}`}
                                  style={{ width: `${metric.value}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                      {rightPanelInsight.metrics?.length && rightPanelInsight.visual === 'global-footprint' ? (
                        <div className="space-y-2">
                          {rightPanelInsight.metrics.map((metric) => (
                            <div key={metric.label} className="space-y-1">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">{metric.label}</span>
                                <span>{metric.value}%</span>
                              </div>
                              <div className="h-1.5 rounded-full bg-muted">
                                <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-orange-400" style={{ width: `${metric.value}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center text-center text-muted-foreground">
                      No results found
                    </div>
                  )}

                  {Object.keys(answers).length ? (
                    <div className="mt-4 space-y-2 border-t border-border/60 pt-3">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Captured responses</p>
                      <div className="max-h-40 space-y-1 overflow-auto text-xs text-muted-foreground">
                        {QUESTIONNAIRE.filter((q) => answers[q.id] !== undefined).map((q) => (
                          <p key={q.id}>
                            <span className="text-foreground">{q.stepLabel}:</span> {toResponseSummary(q, answers[q.id])}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">AI Chat</p>
                  {rightPanelInsight ? (
                    <div className="space-y-3">
                      <h3 className="text-xl font-semibold">{rightPanelInsight.title}</h3>
                      <p className="text-muted-foreground">{rightPanelInsight.description}</p>

                      <div className="rounded-xl border border-border/70 bg-card/60 p-4">
                        <div className="grid items-start gap-4 md:grid-cols-[3fr_2fr]">
                          <div>
                            <p className="mb-3 text-xs uppercase tracking-wide text-muted-foreground">
                              Your provider count
                            </p>
                            <div className="flex items-center justify-center">
                              <CircleGraph
                                value={rightPanelInsight.selected}
                                size={180}
                                mode="dynamic"
                                valueSuffix=""
                              />
                            </div>
                            <p className="mt-2 text-center text-xs text-muted-foreground">
                              * Industry avg {rightPanelInsight.average}
                            </p>
                          </div>

                          <div className="space-y-2">
                            {rightPanelInsight.derived.map((metric) => (
                              <div key={metric.label} className="rounded-lg border border-border/60 bg-background/60 p-2">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-[11px] text-muted-foreground">{metric.label}</p>
                                  <div className="shrink-0">
                                    <CircleGraph
                                      value={metric.value}
                                      size={64}
                                      strokeWidth={6}
                                      variant="compact"
                                      valueFontSize={13}
                                      mode="dynamic"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-border/70 bg-card/55 p-4 text-sm text-muted-foreground">
                      Enter your first provider-count response in chat to reveal the analysis panel.
                    </div>
                  )}
                </>
              )}
            </div>
          </aside>
          </main>
        </div>
      </div>
    </section>
  )
}
