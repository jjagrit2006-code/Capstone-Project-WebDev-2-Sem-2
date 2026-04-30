import { Link } from 'react-router-dom'

export function Login() {
  return (
    <div className="min-h-dvh bg-white grid place-items-center px-4 py-10">
      <div className="w-full max-w-md card p-6 md:p-8 animate-fadeUp">
        <div className="text-sm font-semibold text-slate-600">Welcome back</div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Log in</h1>
        <p className="mt-2 text-sm text-slate-600">
          You can browse donors and requests as a guest. Login is optional for now.
        </p>

        <form className="mt-6 grid gap-3">
          <label className="grid gap-1">
            <span className="label">Email</span>
            <input className="input" type="email" placeholder="you@example.com" autoComplete="email" />
          </label>
          <label className="grid gap-1">
            <span className="label">Password</span>
            <input className="input" type="password" placeholder="••••••••" autoComplete="current-password" />
          </label>
          <button className="btn btn-primary mt-2" type="button">
            Continue
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600">
          New here?{' '}
          <Link className="font-semibold text-emergency-700 hover:text-emergency-800" to="/signup">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}
