import axios from 'axios'
import ShowListItem from '../../../components/ShowListItem'
import Error from 'next/error'

// SERVER-SIDE RENDERING
const Country = ({shows, country, statusCode, message}) => {
    const renderShows = (shows) => {
        return shows.map(({show}, index) => (
            <div key={index} className="column is-3">
                <ShowListItem show={show} country={country} />
            </div>
        ))
    }

    if(shows) {
        return (
            <section className="mt-6">
                <div className="container">
                    <div className="columns is-multiline">
                        { renderShows(shows) }
                    </div>
                </div>
            </section>
        )
    }

    return <Error statusCode={statusCode} title={message}/>
}

// Limitations of getInitialProps
// 1.) The method runs only after this then our page is going to be rendered you dont have 
// any access to like the window object 
// 2.) You cannot use Hooks, Providers inside getInitialProps
// You must make sure that whatever you do inside getInitialProps are Server-side compatible
Country.getInitialProps = async (ctx) => { // Important!!!!. Note that getInitialProps can only be used for page components
    try {
        console.log(ctx.query.country)
        const country = ctx.query.country || 'us'
        const response = await axios.get(`${process.env.TVSHOWS_API}/schedule?country=${country}&date=2014-12-01`)

        return {
            shows: response.data,
            country
        }
    } catch (error) {
        console.log(error.response)
        // console.log(error.response.data.message)
        // console.log(error.response.status)
        
        return {
            shows: null,
            statusCode: error.response ? error.response.status : 500,
            message: (error.response) 
                ? (error.response.data) ? error.response.data.message : 'Oops! There was a problem' 
                : 'Oops! There was a problem'
        }
    }
}

export default Country

// CLIENT SIDE RENDERING
// import React, { useEffect } from 'react'
//
// const Country = () => {
//     useEffect(() => {
//         loadCountries()
//     }, [])

//     const loadCountries = async () => {
//         const response = await axios.get(`${process.env.API}/schedule?country=US&date=2014-12-01`)
//         console.log(response)
//     }

//     return (
//         <div>
            
//         </div>
//     )
// }

// export default Country
