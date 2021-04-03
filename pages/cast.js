import React from 'react'
import axios from 'axios'

const CastMemberDetails = ({ cast }) => {
    console.log(cast)
    return (
        <div>
            Cast
        </div>
    )
}

CastMemberDetails.getInitialProps = async (ctx) => {
    try {
        console.log(ctx.query)
        const personId = ctx.query.personId
        const response = await axios.get(`${process.env.NEXT_PUBLIC_TVSHOWS_API}/people/${personId}`)

        return {
            cast: response.data,
        }
    } catch (error) {
        console.log('error browser', process.browser)
        console.log('error message', error.response.data.message)
        console.log('error status', error.response.status)
        
        return {
            show: null,
            statusCode: error.response ? error.response.status : 500,
            message: (error.response.data) ? error.response.data.message : 'Oops! There was a problem'
        }
    }
}

export default CastMemberDetails
