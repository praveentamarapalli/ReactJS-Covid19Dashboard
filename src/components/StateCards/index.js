/* eslint-disable react/no-unknown-property */
import './index.css'

const StateCards = props => {
  const {totalStateCards, category, onChangeActiveCard} = props

  const districtConfirmed = totalStateCards.confirmed
  const districtRecovered = totalStateCards.recovered
  const districtDeceased = totalStateCards.deceased
  const districtActive =
    districtConfirmed - districtRecovered - districtDeceased

  const confirmedCard = {
    name: 'Confirmed',
    logo:
      'https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171384/ncwkb3ui2a0v1z8ox7lo.png',
    value: districtConfirmed,
  }

  const recoveredCard = {
    name: 'Recovered',
    logo:
      'https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171383/lyazb8ca2eacf2pveefy.png',
    value: districtRecovered,
  }

  const deceasedCard = {
    name: 'Deceased',
    logo:
      'https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171383/kibit9xurg0nbqx5a7m2.png',
    value: districtDeceased,
  }

  const activeCard = {
    name: 'Active',
    logo:
      'https://res.cloudinary.com/dmeqhiqbm/image/upload/v1701171383/fihfpjrhgwgq2u89xj3o.png',
    value: districtActive,
  }

  const onClickCard = value => {
    onChangeActiveCard(value)
  }

  const confirmedCardBg = category === 'confirmed' ? 'confirmed-card-bg' : ''
  const activeCardBg = category === 'active' ? 'active-card-bg' : ''
  const recoveredCardBg = category === 'recovered' ? 'recovered-card-bg' : ''
  const deceasedCardBg = category === 'deceased' ? 'deceased-card-bg' : ''

  return (
    <ul className="state-cards-container">
      <li value={confirmedCard.name} onClick={() => onClickCard('confirmed')}>
        <div
          testid="stateSpecificConfirmedCasesContainer"
          className={`confirmed card ${confirmedCardBg}`}
        >
          <p className="stats-type confirmed-cases">Confirmed</p>
          <img
            src={confirmedCard.logo}
            alt="state specific confirmed cases pic"
          />
          <p className="cases confirmed-cases">{confirmedCard.value}</p>
        </div>
      </li>
      <li value={activeCard.name} onClick={() => onClickCard('active')}>
        <div
          testid="stateSpecificActiveCasesContainer"
          className={`active card ${activeCardBg}`}
        >
          <p className="stats-type active-cases">Active</p>
          <img src={activeCard.logo} alt="state specific active cases pic" />
          <p className="cases active-cases">{activeCard.value}</p>
        </div>
      </li>
      <li value={recoveredCard.name} onClick={() => onClickCard('recovered')}>
        <div
          testid="stateSpecificRecoveredCasesContainer"
          className={`recovered card ${recoveredCardBg}`}
        >
          <p className="stats-type recovered-cases">Recovered</p>
          <img
            src={recoveredCard.logo}
            alt="state specific recovered cases pic"
          />
          <p className="cases recovered-cases">{recoveredCard.value}</p>
        </div>
      </li>
      <li value={deceasedCard.name} onClick={() => onClickCard('deceased')}>
        <div
          testid="stateSpecificDeceasedCasesContainer"
          className={`deceased card ${deceasedCardBg}`}
        >
          <p className="stats-type deceased-cases">Deceased</p>
          <img
            src={deceasedCard.logo}
            alt="state specific deceased cases pic"
          />
          <p className="cases deceased-cases">{deceasedCard.value}</p>
        </div>
      </li>
    </ul>
  )
}

export default StateCards
