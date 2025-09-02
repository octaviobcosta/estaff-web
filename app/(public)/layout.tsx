import PremiumHeader from '@/components/layout/PremiumHeader'
import Footer from '@/components/ui/footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <PremiumHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}