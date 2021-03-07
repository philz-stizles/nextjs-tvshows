import React from 'react'

const CastListItem = ({ person }) => {
    console.log(person)
    const { image } = person
    return (
        <div class="card">
            <div class="card-image">
                <figure class="image is-96x96">
                {
                    image 
                    ? <img src={image.medium} alt="Placeholder image" /> 
                    : <img src="https://via.placeholder.com/210x295?text=?" alt="Placeholder image" />
                }
                </figure>
            </div>
        </div>
    )
}

export default CastListItem
