/* eslint-disable react/no-unknown-property */
import './index.css'

const IndiaStatsCard = props => {
  const {covidData, statesList} = props

  let activeCases = 0
  let recoveredCases = 0
  let deceasedCases = 0
  let confirmedCases = 0

  statesList.forEach(eachState => {
    if (covidData[eachState.state_code]) {
      const {total} = covidData[eachState.state_code]
      recoveredCases += total.recovered ? total.recovered : 0
      deceasedCases += total.deceased ? total.deceased : 0
      confirmedCases += total.confirmed ? total.confirmed : 0
    }
  })

  activeCases = confirmedCases - (recoveredCases + deceasedCases)

  return (
    <div className="stats-container">
      <div className="confirmed card" testid="countryWideConfirmedCases">
        <p className="stats-type confirmed-cases">Confirmed</p>
        <img
          src="https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171384/ncwkb3ui2a0v1z8ox7lo.png"
          alt="country wide confirmed cases pic"
        />
        <p className="confirmed-cases cases">{confirmedCases}</p>
      </div>
      <div className="active card" testid="countryWideActiveCases">
        <p className="stats-type active-cases" testid="countryWideActiveCases">
          Active
        </p>
        <img
          src="https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171383/fihfpjrhgwgq2u89xj3o.png"
          alt="country wide active cases pic"
        />
        <p className="active-cases cases">{activeCases}</p>
      </div>
      <div className="recovered card" testid="countryWideRecoveredCases">
        <p className="stats-type recovered-cases">Recovered</p>
        <img
          src="https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171383/lyazb8ca2eacf2pveefy.png"
          alt="country wide recovered cases pic"
        />
        <p className="recovered-cases cases">{recoveredCases}</p>
      </div>
      <div className="deceased card" testid="countryWideDeceasedCases">
        <p className="stats-type deceased-cases">Deceased</p>
        <img
          src="https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171383/kibit9xurg0nbqx5a7m2.png"
          alt="country wide deceased cases pic"
        />
        <p className="deceased-cases cases">{deceasedCases}</p>
      </div>
    </div>
  )
}

export default IndiaStatsCard
