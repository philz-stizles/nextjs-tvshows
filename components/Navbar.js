import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const countries = [
    { name: 'United States', value: 'us' },
    { name: 'Brazil', value: 'br' }
]

const Navbar = () => {
    const router = useRouter()
    const country = router.query.country
    const [selectedCountry, setSelectedCountry] = useState(country)

    const handleChange = (e) => {
        const { value } = e.target
        
        if(value !== selectedCountry) {
          router.push(`/country/[country]`, `/country/${value}`)  // If you want the refresh to be done client side, use this pattern
        }
        console.table(value)
        setSelectedCountry(value)
    }

    return ( 
      <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
        </a>
    
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item">
            Home
          </a>
    
          <a className="navbar-item">
            Documentation
          </a>
    
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>
    
            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
              </a>
              <a className="navbar-item">
                Jobs
              </a>
              <a className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider" />
              <a className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-item">
                <div className="control has-icons-left">
                    <div className="select is-medium">
                        <select onChange={handleChange } defaultValue={ selectedCountry }>
                            {
                                countries.map(({ value, name }, index) => {
                                    return <option key={ index } value={ value }>{ name }</option>
                                })
                            } 
                        </select> 
                    </div> 
                    <span className="icon is-medium is-left"><i className="fas fa-globe"> </i></span>
                </div>
            </div>
    
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar