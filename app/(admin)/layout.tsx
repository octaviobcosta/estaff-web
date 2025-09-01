export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-empresa text-white p-4">
        <h1 className="text-xl font-bold">estaff Admin</h1>
      </nav>
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  )
}