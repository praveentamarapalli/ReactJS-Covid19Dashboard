import './index.css'

const FactsList = props => {
  const {factDetails} = props
  const {banner} = factDetails
  return (
    <li className="banner-details">
      <p className="banner">{banner}</p>
    </li>
  )
}

export default FactsList
