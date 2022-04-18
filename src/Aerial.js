import { useState, useEffect } from "react"
import "./Aerial.css"
import axios from "axios";
import Lottie from "react-lottie"
import co2 from "./co2.json"


const Aerial = () => {

  const [emissionsData, setEmissionsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getEmissionsData = async () => {
    try{
      setIsLoading(true)
      const response = await axios.get("https://aerial.is/_nft/0x2acab3dea77832c09420663b0e1cb386031ba17b")
      console.log(response.data)
      setEmissionsData(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }

  }

  const loading = () => (
    <div className="loading-container">
      <Lottie options={{animationData: co2}} height={400} width={400} />
    </div>
  )

  const emissionsComponent = () => {

    const co2 = new Intl.NumberFormat().format(Math.round(emissionsData.co2))
    const gas = new Intl.NumberFormat().format(emissionsData.gas)
    const creditsRemaining = new Intl.NumberFormat().format(emissionsData.credits - emissionsData.credits_purchased)
    const creditsPurchased = new Intl.NumberFormat().format(emissionsData.credits_purchased)
    const cost = new Intl.NumberFormat().format((emissionsData.cost / emissionsData.credits) * (emissionsData.credits - emissionsData.credits_purchased))
    const transactions = new Intl.NumberFormat().format(emissionsData.transactions)
    
    return (
      <div className="data-container">
        <div className="header">
          <h1>Deadfellaz Carbon Offset</h1>
        </div>
        <div className="data-grid">
          <div className="data-cell">
            <h2>{co2} Kg</h2>
            <h3>CO2 Emissions</h3>
          </div>
          <div className="data-cell">
            <h2>{gas}</h2>
            <h3>Gas Used</h3>
          </div>
          <div className="data-cell">
            <h2>{transactions}</h2>
            <h3>Transactions</h3>
          </div>
          <div className="data-cell">
            <h2>${cost}</h2>
            <h3>Cost to Offset</h3>
          </div>
          <div className="data-cell">
            <h2>{creditsRemaining}</h2>
            <h3>Credits needed to offset</h3>
          </div>
          <div className="data-cell">
            <h2>{creditsPurchased}</h2>
            <h3>Credits Purchased so Far</h3>
          </div>
        </div>
        <a className="cta-button" target="_blank" rel="noreferrer" href="https://aerial.is/nft/0x2acab3dea77832c09420663b0e1cb386031ba17b">Offset</a>
    </div>
    )
  }
    

  useEffect(()=> {
    getEmissionsData()
  }, [])

  return (
    <div className="aerial-container">
      {isLoading ? loading() : emissionsComponent()}
    </div>
  )
}

export default Aerial;
