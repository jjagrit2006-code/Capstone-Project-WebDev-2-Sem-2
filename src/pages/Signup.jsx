import { Link } from 'react-router-dom'

export function Signup() {
  return (
    <div className="min-h-dvh bg-white grid place-items-center px-4 py-10">
      <div className="w-full max-w-md card p-6 md:p-8 animate-fadeUp">
        <div className="text-sm font-semibold text-slate-600">Join the community</div>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">Sign up</h1>
        <p className="mt-2 text-sm text-slate-600">
          Choose what you’re here for. You can do both later.
        </p>

        <form className="mt-6 grid gap-3">
          <label className="grid gap-1">
            <span className="label">Full name</span>
            <input className="input" placeholder="Your name" autoComplete="name" />
          </label>
          <label className="grid gap-1">
            <span className="label">Email</span>
            <input className="input" type="email" placeholder="you@example.com" autoComplete="email" />
          </label>

          <div className="grid gap-2">
            <div className="label">I’m signing up to…</div>
            <label className="flex items-start gap-3 rounded-xl ring-1 ring-slate-200 p-3">
              <input type="radio" name="role" className="mt-1" defaultChecked />
              <div>
                <div className="text-sm font-semibold text-slate-900">Register as a Donor</div>
                <div className="text-sm text-slate-600">I can donate and manage my availability.</div>
              </div>
            </label>
            <label className="flex items-start gap-3 rounded-xl ring-1 ring-slate-200 p-3">
              <input type="radio" name="role" className="mt-1" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Post emergency requests</div>
                <div className="text-sm text-slate-600">I may need to request blood in emergencies.</div>
              </div>
            </label>
          </div>

          <label className="grid gap-1">
            <span className="label">Password</span>
            <input className="input" type="password" placeholder="Create a password" autoComplete="new-password" />
          </label>
          <button className="btn btn-primary mt-2" type="button">
            Create account
          </button>
        </form>

        <div className="mt-6 text-sm text-slate-600">
          Already have an account?{' '}
          <Link className="font-semibold text-emergency-700 hover:text-emergency-800" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
