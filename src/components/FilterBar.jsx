export function FilterBar({ children }) {
  return (
    <div className="card p-4 md:p-5">
      <div className="grid gap-3 md:grid-cols-3">{children}</div>
    </div>
  )
}
