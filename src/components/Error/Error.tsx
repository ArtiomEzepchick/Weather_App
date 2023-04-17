import React from 'react'

import './index.scss'

type Props = {
  error: string
}

const Error: React.FC<Props> = ({ error }) => {
  return (
    <p className='error'>{error}</p>
  )
}

export default Error