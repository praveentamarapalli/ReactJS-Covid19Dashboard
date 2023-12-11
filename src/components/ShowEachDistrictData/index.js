import './index.css'

const ShowEachDistrictData = props => {
  const {topDistrictData} = props
  const {districtNameList, districtValue} = topDistrictData

  return (
    <li className="each-district-item-container">
      <p className="district-value">{districtValue}</p>
      <p className="district-name">{districtNameList}</p>
    </li>
  )
}

export default ShowEachDistrictData
