/* eslint-disable react/no-unknown-property */
/* eslint-disable no-shadow */
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import LoaderSpinner from '../LoaderSpinner'
import StateCards from '../StateCards'
import ShowEachDistrictData from '../ShowEachDistrictData'
import Charts from '../Charts'
import './index.css'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const StateWiseCases = () => {
  const [stateCovidData, setStateCovidData] = useState({
    status: apiStatusConstants.initial,
    totalState: [],
    totalTested: 0,
    listStateName: '',
    stateCode: '',
    stateDate: '',
    localStoreData: [],
    category: 'confirmed',
    errorMsg: '',
  })
  const {stateCode} = useParams()
  useEffect(() => {
    setStateCovidData(prevState => ({
      ...prevState,
      status: apiStatusConstants.inProgress,
    }))
    const getStateCovidData = async () => {
      const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
      const options = {
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      // console.log(data)
      if (response.ok) {
        const activeState = statesList.filter(
          eachState => eachState.state_code === stateCode,
        )
        const stateName = activeState[0].state_name
        const stateTested = data[stateCode].total.tested
        const newDate = new Date(data[stateCode].meta.last_updated)
        const totalStateData = data[stateCode].total

        setStateCovidData(prevState => ({
          ...prevState,
          status: apiStatusConstants.success,
          totalState: totalStateData,
          totalTested: stateTested,
          listStateName: stateName,
          stateCode,
          stateDate: newDate,
          localStoreData: data,
        }))
      } else {
        setStateCovidData(prevState => ({
          ...prevState,
          status: apiStatusConstants.failure,
          errorMsg: data.error_msg,
        }))
      }
    }
    getStateCovidData()
  }, [stateCode])

  const renderLoaderView = () => (
    <div className="home-loader-container" testid="stateDetailsLoader">
      <LoaderSpinner />
    </div>
  )

  const renderSuccessView = () => {
    const stateData = () => {
      const {stateCode, localStoreData, category} = stateCovidData
      const listOfDistrict = localStoreData[stateCode].districts
      const listOfDistrictNames = Object.keys(listOfDistrict)
      const dataElement = listOfDistrictNames.map(eachItem => ({
        districtNameList: eachItem,
        districtValue: listOfDistrict[eachItem]?.total[category] || 0,
      }))
      // console.log(localStoreData);
      // console.log(listOfDistrict);
      // console.log(listOfDistrictNames);
      // console.log(dataElement)

      dataElement.sort((a, b) => b.districtValue - a.districtValue)

      const stateActiveCases = listOfDistrictNames.map(eachItem => ({
        districtNameList: eachItem,
        districtValue:
          (listOfDistrict[eachItem]?.total.confirmed || 0) -
          (listOfDistrict[eachItem]?.total.recovered || 0) -
          (listOfDistrict[eachItem]?.total.deceased || 0),
      }))
      // console.log(stateActiveCases)

      stateActiveCases.sort((a, b) => b.districtValue - a.districtValue)

      if (category === 'active') {
        return stateActiveCases
      }
      return dataElement
    }

    const topDistricts = stateData()

    const onChangeActiveCard = value => {
      const activeCategory = value
      setStateCovidData(prevState => ({
        ...prevState,
        category: activeCategory,
      }))
    }

    const {
      listStateName,
      totalTested,
      totalState,
      category,
      stateDate,
    } = stateCovidData

    const months = [
      'Jan',
      'Feb',
      'March',
      'April',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    return (
      <div className="state-wise-cases-container">
        <div className="state-name-tested-container">
          <h1 className="state-name">{listStateName}</h1>
          <div className="tested-container">
            <p className="tested-label">Tested</p>
            <p className="tested-number">{totalTested}</p>
          </div>
        </div>
        <div className="date-container">
          <p className="date-label">{`Last updated on ${
            months[stateDate.getMonth()]
          } ${stateDate.getDate()} ${stateDate.getFullYear()}.`}</p>
        </div>
        <div className="state-cards">
          <StateCards
            totalStateCards={totalState}
            category={category}
            onChangeActiveCard={onChangeActiveCard}
          />
        </div>
        <div testid="lineChartsContainer">
          <h1 className={`top-district-label ${category}-title`}>
            Top Districts
          </h1>
          <div>
            <div>
              <ul
                testid="topDistrictsUnorderedList"
                className="each-districts-container"
              >
                {topDistricts.map(eachItem => (
                  <ShowEachDistrictData
                    topDistrictData={eachItem}
                    key={eachItem.districtNameList}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        <div className="charts-data-container">
=======
        <div testid="lineChartsContainer" className="charts-data-container">
>>>>>>> f669e8f54bd2c41e61fc1bd03f1923ccddc7478e
          <Charts category={category} />
        </div>
      </div>
    )
  }

  const renderFailureView = () => {
    const {errorMsg} = stateCovidData
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

  const renderStateDataUI = () => {
    const {status} = stateCovidData

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
    <div>
      <Header />
      {renderStateDataUI()}
      <Footer />
    </div>
  )
}

export default StateWiseCases
