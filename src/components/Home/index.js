/* eslint-disable react/no-unknown-property */
import {useState, useEffect} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import CovidSearchBar from '../CovidSearchBar'
import LoaderSpinner from '../LoaderSpinner'
import IndiaStatsCard from '../IndiaStatsCard'
import StatesInfo from '../StatesInfo'
import SearchResult from '../SearchResult'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

const Home = () => {
  const [stateData, setStateData] = useState({
    covidData: [],
    status: apiStatusConstants.initial,
    searchInput: '',
    lisOfSearchStates: [],
    errorMsg: '',
  })

  useEffect(() => {
    const getCovidData = async () => {
      setStateData(prevState => ({
        ...prevState,
        status: apiStatusConstants.inProgress,
      }))

      const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
      const options = {
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      // console.log(data);
      if (response.ok) {
        setStateData(prevState => ({
          ...prevState,
          status: apiStatusConstants.success,
          covidData: data,
        }))
      } else {
        setStateData(prevState => ({
          ...prevState,
          status: apiStatusConstants.failure,
          errorMsg: data.error_msg,
        }))
        // const { errorMsg } = stateData;
        // console.log(errorMsg);
      }
    }

    getCovidData()
  }, [])

  const renderLoaderView = () => (
    <div className="home-loader-container" testid="homeRouteLoader">
      <LoaderSpinner />
    </div>
  )

  const onChangeSearchInput = event => {
    const inputText = event.target.value
    setStateData(prevState => ({
      ...prevState,
      searchInput: inputText,
    }))

    if (inputText !== '') {
      const searchList = statesList.filter(eachState =>
        eachState.state_name
          .toLowerCase()
          .includes(inputText.toLocaleLowerCase()),
      )
      setStateData(prevState => ({
        ...prevState,
        lisOfSearchStates: searchList,
      }))
    } else {
      setStateData(prevState => ({
        ...prevState,
        lisOfSearchStates: [],
      }))
    }
  }

  const renderSuccessView = () => {
    const {searchInput, covidData, lisOfSearchStates} = stateData
    return (
      <div className="home-container">
        <CovidSearchBar
          searchInput={searchInput}
          onChangeSearchInput={onChangeSearchInput}
        />
        {lisOfSearchStates.length === 0 ? null : (
          <ul
            testid="searchResultsUnorderedList"
            className="search-results-container"
          >
            {lisOfSearchStates.map(eachState => (
              <SearchResult
                stateDetails={eachState}
                key={eachState.state_code}
              />
            ))}
          </ul>
        )}
        <IndiaStatsCard covidData={covidData} statesList={statesList} />
        <StatesInfo covidData={covidData} statesList={statesList} />
      </div>
    )
  }

  const renderFailureView = () => {
    const {errorMsg} = stateData
    return (
      <div className="not-found-container">
        <img
          src="https://res.cloudinary.com/dvmp5vgbm/image/upload/v1652011250/Covid19%20Dashboard/PageNotFound_jyng5w.png"
          alt="not-found-pic"
          className="not-found-image"
        />
        <p className="not-found-description">Error: {errorMsg}</p>
        <p className="not-found-description">
          We are having some trouble processing your request. Please try again.
        </p>
      </div>
    )
  }

  const renderHomeUI = () => {
    const {status} = stateData

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoaderView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <main>{renderHomeUI()}</main>
      <Footer />
    </>
  )
}

export default Home
