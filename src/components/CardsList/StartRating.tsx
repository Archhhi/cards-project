import React, {useState} from "react";
import {FaStar} from "react-icons/fa";

type PropsType = {
  grade: number
}

const StarRating: React.FC<PropsType> = React.memo(({grade}) => {

  const [rating, setRating] = useState<null | number>(grade)
  // const [hover, setHover] = useState<null | number>(null)

  return (
    <div>
      {[...Array(5)]
        .map((star, i) => {
          const ratingValue = i + 1

          return (
            <label>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                style={{display: 'none'}}
                // onClick={() => setRating(ratingValue)}
              />
              <FaStar
                className='star'
                color={ratingValue <= rating! ? '#9890C7' : '#E6D4DE'}
                size={14}
                // onMouseOver={() => setHover(ratingValue)}
                // onMouseOut={() => setHover(null)}
              />
            </label>
          )
        })}
    </div>
  )
})

export default StarRating