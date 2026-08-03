import { useState } from 'react'
import { toast } from 'sonner'
import {
  Container,
  Section,
  PageWrapper,
  TopBar,
  Navbar,
  MobileNav,
  Breadcrumb,
  SearchHeader,
  Button,
  Input,
  PasswordInput,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  Badge,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Accordion,
  Tabs,
  Tooltip,
  QuantitySelector,
  TagInput,
  Alert,
  Banner,
  Modal,
  ConfirmationDialog,
  SkeletonCard,
  SkeletonTableRow,
  EmptyState,
  ErrorState,
  SuccessState,
  OfflineState,
  Popover,
  Pagination,
  Table,
  FilterPanel,
  SortDropdown,
  StatsCard,
  MetricCard,
  ChartContainer,
  Drawer,
  Footer,
} from '@/shared/components'
import { useThemeContext } from '@/shared/context/theme-context'
import {
  Sun,
  Moon,
  Layers,
  CheckCircle2,
  Info,
  ShieldCheck,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  Settings,
  MoreVertical,
  Search,
} from 'lucide-react'

export function DevPage() {
  const { theme, toggleTheme } = useThemeContext()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [tags, setTags] = useState(['Organic Cotton', 'GOTS Certified', '200 GSM'])
  const [quantity, setQuantity] = useState(500)
  const [searchValue, setSearchValue] = useState('')
  const [mobilePreview, setMobilePreview] = useState(false)

  const sampleTableData = [
    { id: '1', name: 'Organic Heavy Denim 14oz', category: 'Denim', stock: '2,500 m', price: '$4.20/m', status: 'In Stock' },
    { id: '2', name: 'Pure Mulberry Silk Satin', category: 'Silk', stock: '850 m', price: '$18.50/m', status: 'Low Stock' },
    { id: '3', name: 'Combed Cotton Jersey 180 GSM', category: 'Knits', stock: '12,000 m', price: '$2.80/m', status: 'In Stock' },
    { id: '4', name: 'Recycled Polyester Fleece', category: 'Synthetics', stock: '0 m', price: '$3.10/m', status: 'Out of Stock' },
  ]

  const tableColumns = [
    { key: 'name', title: 'Fabric Name' },
    { key: 'category', title: 'Category' },
    { key: 'stock', title: 'Stock Available' },
    { key: 'price', title: 'Unit Price' },
    {
      key: 'status',
      title: 'Status',
      render: (item: typeof sampleTableData[0]) => (
        <Badge
          variant={
            item.status === 'In Stock'
              ? 'success'
              : item.status === 'Low Stock'
              ? 'warning'
              : 'error'
          }
          dot
        >
          {item.status}
        </Badge>
      ),
    },
  ]

  return (
    <PageWrapper withNavbar={false}>
      {/* Top Banner */}
      <TopBar variant="announcement" closable>
        🚀 Phase 1 Design System & UI Library Showcase (Storybook Mode)
      </TopBar>

      {/* Navbar */}
      <Navbar
        logoText="TexMarket Design System"
        onMobileMenuToggle={() => setMobileNavOpen(true)}
        navItems={[
          { label: 'Primitives', href: '#primitives' },
          { label: 'Feedback', href: '#feedback' },
          { label: 'Data & Layout', href: '#data' },
        ]}
      />

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navItems={[
          { label: 'Primitives', href: '#primitives' },
          { label: 'Feedback', href: '#feedback' },
          { label: 'Data & Layout', href: '#data' },
        ]}
      />

      {/* Search Header Hero */}
      <div className="pt-[var(--navbar-height)]">
        <SearchHeader
          title="Component Showcase & UI Token Explorer"
          subtitle="Interactive sandbox testing responsive states, themes, accessibility focus rings, and animation variants."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onClear={() => setSearchValue('')}
        />
      </div>

      <Container className={mobilePreview ? 'max-w-sm border-x border-[var(--border-color)] my-8 bg-[var(--surface-1)] shadow-2xl' : 'py-10'}>
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl surface-card mb-10">
          <div className="flex items-center gap-3">
            <Badge variant="primary" icon={<Layers size={14} />}>
              60+ Components Ready
            </Badge>
            <span className="text-sm font-semibold text-[var(--text-secondary)]">
              Current Theme: <span className="text-[var(--text-primary)] uppercase">{theme}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={toggleTheme} leftIcon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}>
              Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
            <Button
              variant={mobilePreview ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setMobilePreview((prev) => !prev)}
            >
              {mobilePreview ? 'Full Width' : 'Mobile View'}
            </Button>
          </div>
        </div>

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Dev Showcase', href: '/dev/components' }, { label: 'UI Library' }]} className="mb-8" />

        {/* 1. BUTTONS */}
        <Section title="Buttons" subtitle="Supports 7 variants, 3 sizes, loading states, icons, press feedback, and disabled rules.">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="link">Link Button</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small (Sm)</Button>
              <Button size="md">Medium (Md)</Button>
              <Button size="lg">Large (Lg)</Button>
              <Button loading size="md">Loading State</Button>
              <Button disabled size="md">Disabled State</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button leftIcon={<CheckCircle2 size={16} />}>With Left Icon</Button>
              <Button rightIcon={<TrendingUp size={16} />} variant="secondary">With Right Icon</Button>
              <Button iconOnly aria-label="Settings"><Settings size={18} /></Button>
              <Button iconOnly variant="outline" aria-label="More"><MoreVertical size={18} /></Button>
            </div>
          </div>
        </Section>

        <Divider />

        {/* 2. FORM INPUTS & PRIMITIVES */}
        <Section title="Form Controls & Inputs" subtitle="Accessible form fields with error messages, hints, prefixes, and keyboard focus states.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Standard Input" placeholder="Enter textile name..." hint="Provide official fabric trade name." />
            <Input label="Input with Error" placeholder="Composition..." error="Composition is required for RFQ validation." defaultValue="Invalid Cotton %" />
            <Input label="With Prefix & Suffix" prefix={<Search size={16} />} suffix={<Info size={16} />} placeholder="Search inventory..." />
            <PasswordInput label="Password Input" placeholder="Enter secure password..." />
            <Select
              label="Fabric Category"
              options={[
                { value: 'cotton', label: '100% Cotton' },
                { value: 'silk', label: 'Mulberry Silk' },
                { value: 'denim', label: 'Raw Denim' },
              ]}
            />
            <QuantitySelector value={quantity} onChange={setQuantity} unit="Meters" />
            <TagInput label="Fabric Tagging" tags={tags} onChange={setTags} />
            <Textarea label="Order Specifications" placeholder="Add custom dyeing, weaving, and finish requirements..." showCount maxLength={200} value="Custom Indigo Dye 180 GSM finish" />
          </div>

          <div className="flex flex-wrap gap-8 mt-8 p-6 rounded-xl surface-card">
            <Checkbox label="Organic Certified GOTS" description="Supplier verifies non-toxic organic manufacturing." defaultChecked />
            <Radio label="Standard Bulk Shipping" description="Delivered in 10-14 business days." defaultChecked />
            <Switch label="AI Matching Notifications" description="Receive instant SMS alerts on exact fabric matches." defaultChecked />
          </div>
        </Section>

        <Divider />

        {/* 3. DISPLAY COMPONENTS */}
        <Section title="Display & Content Components" subtitle="Badges, Cards, Avatars, Accordions, Tabs, Chips, Tooltips.">
          <div className="space-y-8">
            {/* Badges & Chips */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Badges & Chips</h4>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success" dot>Success</Badge>
                <Badge variant="warning" dot>Warning</Badge>
                <Badge variant="error" dot>Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="primary" onRemove={() => toast.info('Badge removed')}>Removable</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <Chip active variant="brand">Active Brand Chip</Chip>
                <Chip variant="outline">Outline Chip</Chip>
                <Chip variant="filled" onRemove={() => toast('Chip dismissed')}>Dismissible Chip</Chip>
              </div>
            </div>

            {/* Avatars */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-[var(--text-primary)]">Avatars & Online Status</h4>
              <div className="flex items-center gap-4">
                <Avatar size="xs" initials="TF" />
                <Avatar size="sm" initials="TF" online />
                <Avatar size="md" initials="TF" online={false} />
                <Avatar size="lg" initials="YR" online />
                <Avatar size="xl" initials="HF" shape="square" online />
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hoverable>
                <CardHeader title="Standard Card" subtitle="Hoverable elevate effect" action={<Badge variant="success">Active</Badge>} />
                <CardBody>B2B Textile ordering ecosystem with automatic RFQ quote comparisons.</CardBody>
                <CardFooter bordered>
                  <Button size="sm" variant="outline" fullWidth>View Details</Button>
                </CardFooter>
              </Card>

              <Card variant="glass">
                <CardHeader title="Glassmorphism Card" subtitle="Blurred backdrop surface" />
                <CardBody>Modern glass surface component styled for dark and light contrast.</CardBody>
              </Card>

              <Card variant="elevated">
                <CardHeader title="Elevated Card" subtitle="Deep shadow elevation" />
                <CardBody>High priority metric container for key marketplace data.</CardBody>
              </Card>
            </div>

            {/* Accordion & Tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Accordion</h4>
                <Accordion
                  items={[
                    { id: '1', title: 'What is the Minimum Order Quantity (MOQ)?', content: 'MOQ depends on the supplier. Typically 500 meters for custom dyes.' },
                    { id: '2', title: 'How does AI Fabric Matching work?', content: 'Upload an image or description. Sentence-transformers matches GSM, weave, and composition.' },
                  ]}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Tabs</h4>
                <Tabs
                  variant="segmented"
                  items={[
                    { id: 'spec', label: 'Specifications', content: <p className="p-4 surface-card text-sm">100% Combed Cotton, 200 GSM, 58/60" Width.</p> },
                    { id: 'supplier', label: 'Supplier Info', content: <p className="p-4 surface-card text-sm">Humanity Mills Ltd. — Verified ISO 9001 Supplier.</p> },
                  ]}
                />
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* 4. FEEDBACK & OVERLAYS */}
        <Section title="Feedback & Dialogs" subtitle="Alerts, Banners, Toast notifications, Modals, Drawers, and Popovers.">
          <div className="space-y-6">
            <Banner variant="brand" actionLabel="Learn More" onAction={() => toast.success('Banner action triggered')}>
              ✨ Upgrade to Supplier Pro for AI Lead Recommendations!
            </Banner>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Alert variant="info" title="Information Note">System maintenance scheduled for midnight UTC.</Alert>
              <Alert variant="success" title="RFQ Sent">Your quotation request was sent to 5 matching suppliers.</Alert>
              <Alert variant="warning" title="Stock Running Low">Only 150 meters remaining for batch #892.</Alert>
              <Alert variant="error" title="Payment Required">Invoice #4021 is overdue by 3 days.</Alert>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Button variant="danger" onClick={() => setConfirmOpen(true)}>Open Confirm Dialog</Button>
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open Drawer Panel</Button>
              <Button
                variant="outline"
                onClick={() => toast.success('Sonner Toast Triggered Successfully!', { description: 'Component interactive state verified.' })}
              >
                Trigger Toast Notification
              </Button>
              <Tooltip content="Tooltip helper text on hover">
                <Button variant="ghost">Hover for Tooltip</Button>
              </Tooltip>
              <Popover
                trigger={<Button variant="outline">Click Popover</Button>}
                content={<p className="text-xs text-[var(--text-secondary)]">Interactive popover panel content.</p>}
              />
            </div>
          </div>
        </Section>

        <Divider />

        {/* 5. DATA & ANALYTICS */}
        <Section title="Data, Stats & Table Components" subtitle="KPI Cards, Metric Blocks, Charts, Data Table, and Pagination.">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard title="Total Volume" value="148,200 m" trend={{ value: '+14.2%', isPositive: true }} icon={<Package size={20} />} />
              <StatsCard title="Active RFQs" value="42 Quotes" trend={{ value: '+5.8%', isPositive: true }} icon={<ShoppingCart size={20} />} />
              <StatsCard title="Suppliers" value="128 Verified" trend={{ value: '-1.2%', isPositive: false }} icon={<Users size={20} />} />
              <MetricCard label="System Trust Score" metric="99.4%" subtext="ISO Verified" icon={<ShieldCheck size={24} />} variant="brand" />
            </div>

            <div className="flex items-center justify-between gap-4">
              <h4 className="text-base font-semibold text-[var(--text-primary)]">Inventory Table</h4>
              <SortDropdown options={[{ value: 'name', label: 'Name' }, { value: 'price', label: 'Price' }]} />
            </div>

            <Table columns={tableColumns} data={sampleTableData} onRowClick={(item) => toast.info(`Clicked: ${item.name}`)} />

            <Pagination page={page} totalPages={10} total={100} onPageChange={setPage} showPageSize />

            <ChartContainer title="Marketplace Order Volume (30 Days)" subtitle="Real-time analytics chart container slot" />
          </div>
        </Section>

        <Divider />

        {/* 6. STATES & SKELETONS */}
        <Section title="States & Skeleton Loaders" subtitle="Empty, Error, Success, Offline, and Skeleton placeholder loaders.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmptyState type="no-rfqs" action={{ label: 'Create RFQ', onClick: () => toast.info('Create RFQ clicked') }} />
            <ErrorState onRetry={() => toast.success('Retried successfully')} />
            <SuccessState actionLabel="Back to Dashboard" onAction={() => toast.info('Navigating back')} />
            <OfflineState onRetry={() => toast.info('Checking network connection...')} />
          </div>

          <div className="mt-8 space-y-4">
            <h4 className="text-sm font-semibold text-[var(--text-primary)]">Skeleton Loaders</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonCard />
              <div className="space-y-3 surface-card p-5">
                <SkeletonTableRow cols={4} />
                <SkeletonTableRow cols={4} />
                <SkeletonTableRow cols={4} />
              </div>
            </div>
          </div>
        </Section>

        {/* Footer Showcase */}
        <Footer />
      </Container>

      {/* Overlays */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Interactive Modal Dialog" description="Accessible overlay dialog supporting keyboard trapping and animations.">
        <p className="text-sm text-[var(--text-secondary)]">This modal component is built using Framer Motion and Portal rendering for crisp z-index elevation.</p>
      </Modal>

      <ConfirmationDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false)
          toast.success('Confirmed action successfully!')
        }}
        title="Confirm Order Cancellation?"
        description="Canceling this purchase order will notify the supplier mill immediately."
      />

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filter & Specifications Panel" position="right">
        <FilterPanel title="Refine Marketplace Search" onApply={() => { setDrawerOpen(false); toast.success('Filters applied!'); }}>
          <Input label="Minimum GSM" placeholder="e.g. 150" />
          <Select label="Weave Type" options={[{ value: 'plain', label: 'Plain Weave' }, { value: 'twill', label: 'Twill Weave' }]} />
        </FilterPanel>
      </Drawer>
    </PageWrapper>
  )
}
