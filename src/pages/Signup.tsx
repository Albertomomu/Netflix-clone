import { useState } from "react"
import { Link } from "react-router-dom"

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleForm = (e: Event) => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <>
      <div className="hidden sm:block w-full h-screen">
        <img className="fixed w-full h-full object-cover" src="../../public/loginBG.jpg" alt="Login background image" />
        <div className="absolute inset-0 bg-black/50 opacity-50"></div>
        <div className="fixed w-full px-4 py-20 z-20">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 pt-16">
            <div className="mx-12 flex flex-col gap-5">
              <h1 className="font-nsans-bold text-3xl">Sign Up</h1>
              <form onSubmit={handleForm} className="w-full flex flex-col gap-3">
                <input className="p-3 rounded bg-gray-800" type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input className="p-3 rounded bg-gray-800" type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button className="bg-red-600/80 py-3 rounded hover:bg-red-600 transition">Sign Up</button>
                <div className="flex justify-between items-center text-gray-600 text-sm">
                  <p><input type="checkbox" className="mr-2" checked={!rememberLogin} onChange={() => { setRememberLogin(!rememberLogin) }} />Remember me</p>
                  <p>Need Help?</p>
                </div>
                <p className="mt-4 text-md"><span className="text-gray-600">Already subscribed to Netflix?  </span><Link to='/login'>Sign In</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
