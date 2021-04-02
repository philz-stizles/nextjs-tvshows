import Router from 'next/router'
import cookies from 'nookies'
export default function Home() {
  return <h1>This is the Home Page ${process.browser}</h1>
}

Home.getInitialProps = (ctx) => {
  const { defaultCountry } = cookies.get(ctx)
  console.log('Index browser: ', process.browser)
  console.log( 'Index query', ctx.query.country)
  console.log( 'Index cookie', defaultCountry)
  const country = ctx.query.country || defaultCountry || 'us'
  console.log('Index country', country)

  if(process.browser) {
    Router.replace('/country/[country]', `/country/${country}`)
  } else {
    ctx.res.writeHead(302, { Location: `/country/${country}`})
    ctx.res.end()
  }

  return {}
}