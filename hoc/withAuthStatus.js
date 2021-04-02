import React from 'react'
import cookies from 'nookies'

const checkAuthStatus = (context) => {
    const { token } = cookies.get(context)
    console.log('hoc', token)
    // If on server-side(i.e context.req is present) and no token
    if(context.req && !token) { // Check if cookie is present
        return false
    }

    // If on client-side and no token
    if(!token) {
        return false
    }

    return true
}

const withAuthStatus = (WrappedComponent) => {
    const hocComponent = ({ ...props }) => <WrappedComponent {...props} />

    hocComponent.getInitialProps = async (context) => {
        console.log('hoc', context)
        const isAuthenticated = checkAuthStatus(context)
        const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(context))
        return { ...componentProps, isAuthenticated }
    }

    return hocComponent
}

export { withAuthStatus }