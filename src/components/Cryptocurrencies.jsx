import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    //se il searchTerm è vuoto allora cerca tutte, altrimenti fa la richiesta ogni volta che digiti sul input del filtro
    console.log(filteredData);
    setCryptos(filteredData)
  }, [cryptosList, searchTerm])
  //quando cambia il searchTerm filtra tra la cryptosList,
  //cryptosList è o con count 10 o con count 100 a seconda che la venga passata la prop "simplified" al component Cryptocurrencies quindi solo in home page

  if (isFetching) return 'Loading...'

  return (
    <>
      <div className='search-crypto'>
        <Input
          placeholder='Search Cryptocurrency'
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className='crypto-card'
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className='crypto-image' src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}$</p>
                <p>Market Cap: {millify(currency.marketCap)}$</p>
                <p>Daily change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
