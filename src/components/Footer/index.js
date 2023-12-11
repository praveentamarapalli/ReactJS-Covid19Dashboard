import {Link} from 'react-router-dom'
import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="footer-element">
      <p className="footer-heading">COVID19INDIA</p>
    </div>
    <div className="footer-element">
      <p className="footer-description">
        we stand with everyone fighting on the front lines
      </p>
    </div>
    <div className="footer-icons-container">
      <Link to="https://github.com/" target="__blank" className="">
        <VscGithubAlt className="footer-icon" />
      </Link>
      <Link to="https://www.instagram.com/" target="__blank">
        <FiInstagram className="footer-icon" />
      </Link>
      <Link to="https://twitter.com/" target="__blank">
        <FaTwitter className="footer-icon" />
      </Link>
    </div>
  </footer>
)

export default Footer
