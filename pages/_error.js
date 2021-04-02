import React from 'react'

// This custom Error handling component has to be at the sam level as _app.js
const CustomError = ({ statusCode, title }) => {
    console.log(title)
    if(statusCode === 404) {
        return <h1>The resource was not found ...</h1>
    }

    return <h1>Oops! Something went wrong</h1>
}

CustomError.getInitialProps = ({ err, res }) => { // res means server-side | err is client-side
    console.log('CustomError', process.browser)
    console.log('CustomError', res)
    console.log('CustomError', err)
    return { statusCode: res ? res.statusCode : err ? err.statusCode : 404 }
}

export default CustomError
