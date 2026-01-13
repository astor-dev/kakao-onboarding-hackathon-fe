import { Outlet } from 'react-router'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-[480px] min-h-screen bg-white shadow-x">
        <main className="px-4 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
