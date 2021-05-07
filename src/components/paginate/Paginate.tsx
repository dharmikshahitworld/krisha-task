import React, { FC } from 'react'

export const Paginate: FC<{
  totalItems: number
  itemsPerPage: number
  pageSelected: any
}> = ({ totalItems, itemsPerPage, pageSelected }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map((number) => {
          let activeClassName = `page-item ${
            number === pageSelected ? 'active' : ''
          }`
          return (
            <li className={activeClassName} key={number}>
              <a
                onClick={() => pageSelected(number)}
                className='page-link'
                href='#'
              >
                {number}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
