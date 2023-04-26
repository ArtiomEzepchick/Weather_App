import React from 'react'
import classNames from 'classnames'
import { ICON_SRC } from '../../helpers/weatherConstants/weatherConstants'

import './index.scss'

type Props = {
  error: string;
  isLoading: boolean;
}

const Error: React.FC<Props> = ({ error, isLoading }) => {
  return (
    <p id='error' className={classNames(isLoading && 'opacity-low')}>
      {error}
      <img src={ICON_SRC + 'error.png'} alt='error'/>
    </p>
  )
}

export default Error