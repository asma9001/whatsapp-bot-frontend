import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center md:py-24">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          WhatsApp Campaign Automation
        </h1>
        <p className="max-w-[42rem] text-lg text-slate-600 sm:text-xl">
          Streamline your WhatsApp messaging campaigns with scheduled dispatch, media handling, and comprehensive
          campaign management.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button className="px-6 py-3">
            <Link to="/dashboard" style={{ color: "inherit", textDecoration: "none" }}>
              Access Dashboard
            </Link>
          </Button>
          <Button variant="outline" className="px-6 py-3">
            <Link to="/auth/login" style={{ color: "inherit", textDecoration: "none" }}>
              Login
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
