import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="container-app py-10">
      <div className="card p-6 md:p-10 animate-fadeUp">
        <div className="text-sm font-semibold text-slate-600">404</div>
        <h1 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
          Page not found
        </h1>
        <p className="mt-2 text-slate-600">
          The link you opened may be broken, or the page may have moved.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
          <Link to="/donors" className="btn btn-ghost">
            Find donors
          </Link>
        </div>
      </div>
    </div>
  )
}
