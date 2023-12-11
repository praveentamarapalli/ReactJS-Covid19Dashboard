<<<<<<< HEAD
/* eslint-disable react/no-unknown-property */
=======
import React from 'react'
>>>>>>> f669e8f54bd2c41e61fc1bd03f1923ccddc7478e
import {useState, useEffect} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LoaderSpinner from '../LoaderSpinner'
import FaqsList from '../FaqsList'
import FactsList from '../FactsList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const About = () => {
  const [stateData, setStateData] = useState({
    faqsList: [],
    factsList: [],
    status: apiStatusConstants.initial,
  })

  useEffect(() => {
    const getFaqData = async () => {
      setStateData(prevState => ({
        ...prevState,
        status: apiStatusConstants.inProgress,
      }))

      const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
      const options = {
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()

        setStateData(prevState => ({
          ...prevState,
          faqsList: data.faq,
          factsList: data.factoids,
          status: apiStatusConstants.success,
        }))
      } else {
        setStateData(prevState => ({
          ...prevState,
          status: apiStatusConstants.failure,
        }))
      }
    }
    getFaqData()
  }, [])

  const renderLoaderView = () => (
    <div className="about-loader-container" testid="aboutRouteLoader">
      <LoaderSpinner />
    </div>
  )

  const renderSuccessView = () => {
    const {faqsList, factsList} = stateData
    return (
      <div>
        <p className="about-heading">About</p>
        <p className="about-date">Last updated March 21, 2022</p>
        <p className="about-description">
          COVID-19 vaccines be ready for distribution
        </p>
        <ul className="list-items-container" testid="faqsUnorderedList">
          {faqsList.map(eachFaq => (
            <FaqsList faqDetails={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <h1 className="about-vaccine-details">Facts</h1>
        <ul className="fact-list" testid="factsUnorderedList">
          {factsList.map(eachFact => (
            <FactsList factDetails={eachFact} key={eachFact.id} />
          ))}
        </ul>
      </div>
    )
  }

<<<<<<< HEAD
  // const renderFailureView = () => {};
=======
  //const renderFailureView = () => {};
>>>>>>> f669e8f54bd2c41e61fc1bd03f1923ccddc7478e

  const renderAboutUI = () => {
    const {status} = stateData

    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoaderView()
      case apiStatusConstants.success:
        return renderSuccessView()
<<<<<<< HEAD
      // case apiStatusConstants.failure:
      // return renderFailureView();
=======
      //case apiStatusConstants.failure:
      //return renderFailureView();
>>>>>>> f669e8f54bd2c41e61fc1bd03f1923ccddc7478e
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <main className="about-container">{renderAboutUI()}</main>
      <Footer />
    </>
  )
}

export default About
