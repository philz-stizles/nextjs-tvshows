import { useState, useEffect } from 'react'
import cookies, { destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { isAuthenticated } from '../hoc/withAuthorization'

const countries = [
    { name: 'United States', value: 'us' },
    { name: 'Brazil', value: 'br' }
]

const Navbar = () => {
    const router = useRouter()
    const country = router.query.country
    console.log("In the Header", router.query.country)
    const [selectedCountry, setSelectedCountry] = useState(country)

    useEffect(() => {
      cookies.set(null, 'defaultCountry', selectedCountry, {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/'
      })
    }, [selectedCountry])

    const handleChange = (e) => {
        const { value } = e.target
        
        if(value !== selectedCountry) {
          router.push(`/country/[country]`, `/country/${value}`)  // If you want the refresh to be done client side, use this pattern
        }
        console.table(value)
        setSelectedCountry(value)
    }

    const handleLogout = () => {
      console.log('handleLogout')
      // cookies.destroy(null, 'token')
      destroyCookie({}, 'token', {
        path: '/', // THE KEY IS TO SET THE SAME PATH
      })
    }

    return ( 
      <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="container">
      <div className="navbar-brand">
      <Link href="/" as="/"><a className="navbar-item is-size-4">TvShows</a></Link>
  
      <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  
    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
  
        <a className="navbar-item">Documentation</a>
  
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
                  <div className="select">
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
                {
                  !isAuthenticated() && (
                    <Link href="/signup">
                      <a className="button is-primary"><strong>Sign up</strong></a>
                    </Link>
                  )
                }

                { isAuthenticated() && <Link href="/country/[country]" as="/country/us"><a onClick={handleLogout} className="button is-light">Log out</a></Link>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar