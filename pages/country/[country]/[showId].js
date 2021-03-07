import React from 'react'
import axios from 'axios'
import parse from 'html-react-parser'
import CastListItem from '../../../components/CastListItem'
import CustomError from '../../_error'
// import Error from 'next/Error'

const ShowDetails = ({ show, statusCode, message }) => {
    if(show) {
        const { name, image, summary, type, premiered, _embedded: { cast } } = show
        console.log(statusCode)
        console.log(cast)

        return (
            <main>
                <div className="container my-6">
                    <div className="card">
                        <div className="columns">
                            <div className="column">
                                <div className="card-image py-5">
                                    <figure className="image is-1by1">
                                        <img className="details-image" src={image.original} alt="Placeholder image" />
                                    </figure>
                                </div>
                            </div>
                            
                            <div className="column">
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-3">{name}</p>
                                            <p className="subtitle is-6">{type}</p>
                                        </div>
                                    </div>
                                
                                    <div className="content">{parse(summary)}
                                        <br />
                                        <time dateTime="2016-1-1">{premiered}</time>
                                    </div>
    
                                    {
                                        (cast.length > 0) && (
                                            <div className="content">
                                                <p className="title is-5">Casts</p>
                                                <br />
                                                <div className="casts-container">
                                                    <div className="columns">
                                                        {
                                                            cast.map((item, index) => {
                                                                return (
                                                                    <div className="column is-3" key={index}>
                                                                        <CastListItem person={item.person} />
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .casts-container {
                        overflow: hidden;
                    }
    
                    .casts-container .columns {
                        overflow-x: scroll;
                    }
    
                    .details-image {
                        object-fit: contain;
                    }
                
                `}</style>
            </main>
        )
    }

    // return <Error statusCode={statusCode} title={message}/>
    return <CustomError statusCode={statusCode} title={message}/>
}

ShowDetails.getInitialProps = async (ctx) => {
    try {
        console.log(ctx.query.showId)
        const showId = ctx.query.showId
        const response = await axios.get(`${process.env.API}/shows/${showId}?embed=cast`)

        console.log(response)
        console.log(response.message)
        console.log(response.status)

        return {
            show: response.data,
            statusCode: response.status
        }
    } catch (error) {
        console.log(error.response)
        console.log(error.response.data.message)
        console.log(error.response.status)
        
        return {
            show: null,
            statusCode: error.response ? error.response.status : 500,
            message: (error.response.data) ? error.response.data.message : 'Oops! There was a problem'
        }
    }
}

export default ShowDetails
