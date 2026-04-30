import { NavLink, useLocation, Link } from 'react-router-dom'

function Item({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold transition',
          isActive ? 'text-emergency-700' : 'text-slate-600 hover:text-slate-900',
        ].join(' ')
      }
      aria-label={label}
    >
      <span aria-hidden="true" className="grid h-6 w-6 place-items-center">
        {icon}
      </span>
      <span>{label}</span>
    </NavLink>
  )
}

export function BottomNav() {
  const location = useLocation()
  const showFab = location.pathname !== '/requests/new'

  return (
    <>
      {showFab ? (
        <Link
          to="/requests/new"
          className="md:hidden fixed bottom-20 right-4 z-40 btn btn-primary shadow-card rounded-2xl px-4 py-3"
          aria-label="Post new emergency request"
        >
          + Request
        </Link>
      ) : null}

      <nav className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur ring-1 ring-slate-200/70">
        <div className="container-app h-16 flex items-center justify-between">
          <Item
            to="/"
            label="Home"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5Z" />
              </svg>
            }
          />
          <Item
            to="/donors"
            label="Donors"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          />
          <Item
            to="/requests"
            label="Requests"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 21s7-4.4 7-11a7 7 0 0 0-14 0c0 6.6 7 11 7 11Z" />
                <path d="M12 11.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Z" />
              </svg>
            }
          />
          <Item
            to="/dashboard"
            label="Me"
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Z" />
                <path d="M3 21a9 9 0 0 1 18 0" />
              </svg>
            }
          />
        </div>
      </nav>
    </>
  )
}
