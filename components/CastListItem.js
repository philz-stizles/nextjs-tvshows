import React from 'react'
import Link from 'next/link'

const CastListItem = ({ person }) => {
    console.log(person)
    const { id, image } = person
    return (
        <div className="card">
            <Link href={`/cast?personId=${id}`} as={`/cast/${id}`}>
                <a>
                    <div className="card-image">
                        <figure className="image is-96x96">
                        {
                            image 
                            ? <img src={image.medium} alt="Placeholder image" /> 
                            : <img src="https://via.placeholder.com/210x295?text=?" alt="Placeholder image" />
                        }
                        </figure>
                    </div>
                </a>
            </Link>
        </div>
    )
}

export default CastListItem
