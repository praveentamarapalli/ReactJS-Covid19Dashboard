/* eslint-disable react/no-unknown-property */
import {useState} from 'react'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateListItem from '../StateListItem'
import './index.css'

const StatesInfo = props => {
  const {covidData, statesList} = props

  const statesData = statesList.map(eachState => ({
    stateName: eachState.state_name,
    stateCode: eachState.state_code,
    confirmed: Object.keys(covidData)
      .filter(state => state === eachState.state_code)
      .map(e => covidData[e].total.confirmed),
    deceased: Object.keys(covidData)
      .filter(state => state === eachState.state_code)
      .map(e => covidData[e].total.deceased),
    recovered: Object.keys(covidData)
      .filter(state => state === eachState.state_code)
      .map(e => covidData[e].total.recovered),
    population: Object.keys(covidData)
      .filter(state => state === eachState.state_code)
      .map(e => covidData[e].meta.population),
  }))

  // console.log(statesData)

  const [stateInfo, setStateInfo] = useState(statesData)

  const onClickAsc = () => {
    const sortedData = [...stateInfo].sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? 1 : -1,
    )
    setStateInfo(sortedData)
    // console.log(sortedData)
  }

  const onClickDesc = () => {
    const sortedData = [...stateInfo].sort((a, b) =>
      a.stateName.toUpperCase() > b.stateName.toUpperCase() ? -1 : 1,
    )
    setStateInfo(sortedData)
    // console.log(sortedData)
  }

  return (
    <div className="stats-table" testid="stateWiseCovidDataTable">
      <div className="table-header">
        <div className="states-name-column">
          <p className="table-header-title">States/UT</p>
          <div className="icons-container">
            <button
              type="button"
              className="sorting-icon"
              onClick={onClickAsc}
              aria-label="Sort in ascending order"
              testid="ascendingSort"
            >
              <FcGenericSortingAsc />
            </button>
            <button
              type="button"
              className="sorting-icon"
              onClick={onClickDesc}
              aria-label="Sort in descending order"
              testid="descendingSort"
            >
              <FcGenericSortingDesc />
            </button>
          </div>
        </div>
        <div className="table-column">
          <p className="table-header-title">Confirmed</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Active</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Recovered</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Deceased</p>
        </div>
        <div className="table-column">
          <p className="table-header-title">Population</p>
        </div>
      </div>
      <hr className="line" />
      <ul className="state-stats-container">
        {stateInfo.map(eachState => (
          <StateListItem key={eachState.stateCode} state={eachState} />
        ))}
      </ul>
    </div>
  )
}

export default StatesInfo
