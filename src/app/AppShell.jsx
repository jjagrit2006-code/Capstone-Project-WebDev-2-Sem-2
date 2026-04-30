import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './NavBar.jsx'
import { BottomNav } from './BottomNav.jsx'

const HIDE_NAV_ON = new Set(['/login', '/signup'])

export function AppShell() {
  const location = useLocation()
  const hideNav = HIDE_NAV_ON.has(location.pathname)

  return (
    <div className="min-h-dvh bg-white">
      {!hideNav ? <NavBar /> : null}
      <main className={hideNav ? '' : 'pt-16 pb-20 md:pb-10'}>
        <Outlet />
      </main>
      {!hideNav ? <BottomNav /> : null}
    </div>
  )
}
