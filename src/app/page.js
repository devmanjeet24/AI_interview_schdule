import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 flex items-center justify-center px-4">

      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">

        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          AI Interview Scheduler
        </h1>

        <p className="text-gray-500 mb-8">
          Schedule and manage AI powered interviews effortlessly.
        </p>

        <div className="flex flex-col gap-4">

          <Link
            href="/login"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="w-full border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200"
          >
            Register
          </Link>

        </div>

      </div>

    </main>
  )
}