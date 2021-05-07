import React, { FC, useEffect, useState } from 'react'
import axios from 'axios'
import {
  Alert,
  Button,
  Card,
  CardColumns,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap'

import { Loader } from 'components/common/loader/Loader'

import './Giphy.scss'
import { Paginate } from 'components/paginate/Paginate'

export const Giphy: FC<{}> = ({}) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const totalItems = images.length
  const currentItems = images.slice(indexOfFirstItem, indexOfLastItem)

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setLoading(true)

      try {
        const results = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'Lw2BlSOVmFK779wjpyJn03gciTLQ2E4g',
            limit: 100,
          },
        })
        console.log(results)
        setImages(results.data.data)
      } catch (err) {
        setIsError(true)
        setTimeout(() => setIsError(false), 5000)
      }
      setLoading(false)
    }

    fetchData()
    return () => {
      // cleanup
    }
  }, [])

  const giphyImages = () =>
    loading ? (
      <Loader />
    ) : (
      currentItems.map((giffy) => {
        return (
          <img
            key={giffy.id}
            src={giffy.images.fixed_height.url}
            alt='gifImages'
          />
        )
      })
    )
  const showError = () => {
    isError && (
      <Alert variant='danger'>Unable to load Gits, Please try again.</Alert>
    )
  }
  const searchHandler = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setSearch(e.target.value)
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    setIsError(false)
    setLoading(true)
    const results = await axios('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: 'Lw2BlSOVmFK779wjpyJn03gciTLQ2E4g',
        q: search,
        limit: 100,
      },
    })
    setImages(results.data.data)
    setLoading(false)
  }

  const selectedPage = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <Container>
      <h1 className='text-center my-4'>Giffy Images</h1>
      {showError}
      <Form>
        <InputGroup className='mb-4'>
          <FormControl
            value={search}
            onChange={searchHandler}
            className='rounded-0'
            placeholder='Search'
            aria-label='search'
          />
          <InputGroup.Append>
            <Button
              onClick={handleSubmit}
              variant='outline-primary'
              className='px-5 rounded-0'
            >
              Go
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      <Paginate
        pageSelected={selectedPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />
      <div className='giphy'>{giphyImages()}</div>
    </Container>
  )
}
