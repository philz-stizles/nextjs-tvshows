import React from 'react'
import cookies from 'nookies'
import Router from 'next/router'

const authenticate = (context) => {
    const { token } = cookies.get(context)

    // If on server-side(i.e context.req is present) and token
    if(context.req && token) { // Check if cookie is present
        context.res.writeHead(302, { Location: '/'})
        context.res.end()
        return
    }

    // If on client-side and no token
    if(token) {
        Router.push('/')
    }

    return token
}

const isAuthenticated = context => {
    const { token } = cookies.get(context)
    return token
}

const withNoAuthorization = (WrappedComponent) => {
    const hocComponent = (props) => {
        console.log(props)
        return <WrappedComponent {...props} />
    }

    hocComponent.getInitialProps = async (context) => {
        console.log('HOC')

        // Check Authentication status
        const token = authenticate(context)

        // If authenticated(i.e token exists), run WrappedComponents getInitialProps if it exists
        const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(context))
        console.log('componentProps', componentProps)

        // return all derived props to HOC
        return { ...componentProps, token }
    }

    return hocComponent
}

export { withNoAuthorization, isAuthenticated }