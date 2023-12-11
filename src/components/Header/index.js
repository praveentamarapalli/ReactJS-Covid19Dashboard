import {useState} from 'react'
import {Link} from 'react-router-dom'
import {ImMenu3} from 'react-icons/im'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

const Header = () => {
  const [stateData, setStateData] = useState({
    showMenu: false,
    activeMenu: 'home',
  })

  const onToggleMobileMenu = () => {
    setStateData(prevState => ({
      ...prevState,
      showMenu: !prevState.showMenu,
    }))
  }

  const toggleMenu = value => {
    setStateData(prevState => ({
      ...prevState,
      activeMenu: value,
    }))
  }

  const {activeMenu, showMenu} = stateData

  const activeMenuHomeColor = activeMenu === 'home' ? 'active-menu' : ''
  const activeMenuAboutColor = activeMenu === 'about' ? 'active-menu' : ''

  return (
    <header>
      <ul className="nav-container">
        <div>
          <Link to="/" className="nav-link">
            <h1 className="header-heading">
              COVID19<span className="india-text">INDIA</span>
            </h1>
          </Link>
        </div>
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            <button
              type="button"
              value="home"
              onClick={() => toggleMenu('home')}
              className={`nav-menu-item ${activeMenuHomeColor}`}
            >
              Home
            </button>
          </Link>
          <Link to="/about" className="nav-link">
            <button
              type="button"
              value="about"
              onClick={() => toggleMenu('about')}
              className={`nav-menu-item ${activeMenuAboutColor}`}
            >
              About
            </button>
          </Link>
        </div>
        <button
          type="button"
          className="mobile-menu-icon-button"
          onClick={onToggleMobileMenu}
          aria-label="Toggle Mobile Menu"
        >
          <ImMenu3 className="menu-icon" />
        </button>
      </ul>
      {showMenu ? (
        <div className="mobile-nav-items-container">
          <ul className="menu-items-container">
            <Link to="/" className="nav-link">
              <button
                type="button"
                value="home"
                onClick={() => toggleMenu('home')}
                className={`nav-menu-item ${activeMenuHomeColor}`}
              >
                Home
              </button>
            </Link>
            <Link to="/about" className="nav-link">
              <button
                type="button"
                value="about"
                onClick={() => toggleMenu('about')}
                className={`nav-menu-item ${activeMenuAboutColor}`}
              >
                About
              </button>
            </Link>
          </ul>
          <div>
            <button
              type="button"
              className="close-icon-button"
              onClick={onToggleMobileMenu}
              aria-label="Close Mobile Menu"
            >
              <AiOutlineCloseCircle className="menu-icon" />
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
