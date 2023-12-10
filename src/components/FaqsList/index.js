import './index.css'

const FaqsList = props => {
  const {faqDetails} = props
  const {question, answer} = faqDetails
  return (
    <li className="question-details">
      <p className="question">{question}</p>
      <p className="answer">{answer}</p>
    </li>
  )
}

export default FaqsList
