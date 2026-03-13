// import Image from "next/image"
// import Link from "next/link"

// export default function Home() {
//   return (
//     <main className="relative min-h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-6">

//       {/* Background Blobs */}

//       <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px] rounded-full animate-pulse"></div>

//       <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600 opacity-30 blur-[180px] rounded-full animate-pulse"></div>

//       <div className="absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-blue-600 opacity-20 blur-[160px] rounded-full animate-pulse"></div>


//       {/* Content */}

//       <div className="relative z-10 w-full max-w-md">

//         {/* Card */}

//         <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl pt-20 pb-10 px-10 text-center transition-all duration-500 hover:shadow-purple-500/30 hover:-translate-y-2">

//           {/* Floating Illustration */}

//           <Image
//             src="https://images.openai.com/static-rsc-3/RVhWPipKg5IBqqnIw40Krpv_5PueCnHE8ix0W3Q-A-bGoopIWCaoc7TlenpjEbMDgS_EVKCMB9d0b5IMwr43AVqxZGe8JudCy7o1W_pp4fc?purpose=fullsize&v=1"
//             alt="AI Interview"
//             width={150}
//             height={150}
//             className="absolute -top-20 left-1/2 -translate-x-1/2 swing drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-110"
//             style={{
//               borderRadius: "44px 48px 48px 89px",
//               transform: "rotate(-8deg)"
//             }}
//           />

//           <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
//             AI Interview Scheduler
//           </h1>

//           <p className="text-gray-300 mb-8 text-sm">
//             Schedule and manage AI powered interviews effortlessly.
//           </p>

//           <div className="flex flex-col gap-4">

//             {/* Login */}

//             <Link
//               href="/login"
//               className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/40"
//             >
//               Login
//             </Link>

//             {/* Register */}

//             <Link
//               href="/register"
//               className="w-full border border-white/30 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-[1.03]"
//             >
//               Register
//             </Link>

//           </div>

//         </div>

//       </div>

//     </main>
//   )
// }




import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="relative h-screen flex items-center justify-center bg-[#0f172a] overflow-hidden px-6 manjeetpage">

      {/* Background Blobs */}

      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-purple-600 opacity-30 blur-[180px] rounded-full"></div>

      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600 opacity-30 blur-[180px] rounded-full"></div>

      <div className="absolute top-[40%] left-[40%] w-[350px] h-[350px] bg-blue-600 opacity-20 blur-[160px] rounded-full"></div>


      {/* Layout */}

      <div className="relative z-10 grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center max-w-6xl w-full">

        {/* LEFT IMAGE */}

        <div className="flex justify-center items-center">

          <Image
            src="/interview.png"
            alt="Interview"
            width={300}
            height={300}
            className="transition duration-500 hover:scale-105 object-contain"
          />

        </div>


        {/* FORM CARD */}

        <div className="relative max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl pt-20 pb-10 px-10 text-center transition-all duration-500 hover:shadow-purple-500/30 hover:-translate-y-2">

          {/* Hanger Image */}

          <Image
            src="/hngerimg.jpg"
            alt="AI Interview"
            width={150}
            height={150}
            className="absolute -top-20 left-1/2 -translate-x-1/2 swing drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]"
            style={{
              borderRadius: "44px 48px 48px 89px",
              transform: "rotate(-8deg)"
            }}
          />

          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight mt-10">
            AI Interview Scheduler
          </h1>

          <p className="text-gray-300 mb-8 text-sm">
            Schedule and manage AI powered interviews effortlessly.
          </p>

          <div className="flex flex-col gap-4">

            <Link
              href="/login"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/40"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="w-full border border-white/30 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 hover:scale-[1.03]"
            >
              Register
            </Link>

          </div>

        </div>

      </div>

    </main>
  )
}