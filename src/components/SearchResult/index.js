import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const SearchResult = props => {
  const {stateDetails} = props
  const stateName = stateDetails.state_name
  const stateCode = stateDetails.state_code
  return (
    <>
      <Link to={`state/${stateCode}`} className="state-name-link">
        <li>
          <div className="search-list-item">
            <p className="search-list-state-name">{stateName}</p>
            <button type="button" className="search-list-state-code-button">
              <p className="search-list-state-code">{stateCode}</p>
              <BiChevronRightSquare className="search-list-state-code-icon" />
            </button>
          </div>
          <hr className="line" />
        </li>
      </Link>
    </>
  )
}

export default SearchResult
