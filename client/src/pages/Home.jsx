import Header from "../components/Header";
import companylogo from '../assets/dealsdray_logo.jpeg'
function Home() {
  return (
    <div>
      <Header/>
      <div className="flex h-96 justify-center items-center">
      <h1 className="text-red-500 font-bold text-5xl uppercase font-sans">welcome to DealsDray</h1>
      <img src={companylogo} alt="logo" />
      </div>
    </div>
  )
}

export default Home;