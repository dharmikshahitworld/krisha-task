import React, { FC } from 'react'
import { ImSpinner2 } from 'react-icons/im'

import './Loader.scss'

export const Loader: FC<{}> = ({}) => {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center loader'>
      <ImSpinner2 className='me-2 fs-4' /> <div>Loading...</div>
    </div>
  )
}
