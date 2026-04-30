import { NavLink, Link } from 'react-router-dom'

function cnActive({ isActive }) {
  return isActive
    ? 'text-slate-900'
    : 'text-slate-600 hover:text-slate-900'
}

export function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/85 backdrop-blur ring-1 ring-slate-200/70">
      <div className="container-app h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emergency-600 text-white shadow-soft">
            <span className="text-sm font-bold">RS</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-slate-900">RaktaSetu</div>
            <div className="text-xs text-slate-500">Local donor finder</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <NavLink to="/donors" className={cnActive}>
            Find Donors
          </NavLink>
          <NavLink to="/requests" className={cnActive}>
            Emergency Requests
          </NavLink>
          <NavLink to="/dashboard" className={cnActive}>
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link className="btn btn-ghost hidden sm:inline-flex" to="/login">
            Log in
          </Link>
          <Link className="btn btn-primary" to="/requests/new">
            Post Request
          </Link>
        </div>
      </div>
    </header>
  )
}
