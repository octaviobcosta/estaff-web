import PremiumHeader from '@/components/layout/PremiumHeader'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <PremiumHeader />
      {children}
    </div>
  )
}