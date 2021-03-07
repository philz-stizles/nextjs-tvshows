import Router from 'next/router'
export default function Home() {
  return <h1>This is the Home Page ${process.browser}</h1>
}

Home.getInitialProps = (ctx) => {
  console.log('browser: ', process.browser)
  const country = ctx.query.country || 'us'

  if(process.browser) {
    Router.replace('/country/[country]', `/country/${country}`)
  } else {
    ctx.res.writeHead(302, { Location: `/country/${country}`})
    ctx.res.end()
  }
}
