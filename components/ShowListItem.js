import React from 'react'
import Link from 'next/link'

const ShowListItem = ({show: { id, name, image }, country}) => {
    // console.log(name, image.medium)
    return (
        <div className="card">
            <div className="card-image">
                <Link href="/country/[country]/[showId]" as={`/country/${country}/${id}`}>
                    <a>
                        <figure className="image is-3by4">
                            {
                                image 
                                ? <img src={image.original} alt="Placeholder image" /> 
                                : <img src="https://via.placeholder.com/210x295?text=?" alt="Placeholder image" />
                            }
                        </figure>   
                    </a>
                </Link>
            </div>
            <div className="card-content">
                <p className="title is-4">{name}</p>
                <div className="content">
                    <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                </div>
            </div>
        </div>
    )
}

export default ShowListItem
