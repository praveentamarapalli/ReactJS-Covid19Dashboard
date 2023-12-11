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
      <a href="https://github.com/" target="__blank" label="GitHub">
        <VscGithubAlt className="footer-icon" />
      </a>
      <a href="https://www.instagram.com/" target="__blank" label="Instagram">
        <FiInstagram className="footer-icon" />
      </a>
      <a href="https://twitter.com/" target="__blank" label="Twitter">
        <FaTwitter className="footer-icon" />
      </a>
    </div>
  </footer>
)

export default Footer
