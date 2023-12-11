import {BsSearch} from 'react-icons/bs'
import './index.css'

const CovidSearchBar = props => {
  const {searchInput, onChangeSearchInput} = props

  const onChangeSearch = event => {
    onChangeSearchInput(event)
  }

  return (
    <div className="search-input-container">
      <BsSearch className="search-icon" />
      <input
        type="search"
        className="search-input"
        placeholder="Search the state"
        value={searchInput}
        onChange={onChangeSearch}
      />
    </div>
  )
}

export default CovidSearchBar
