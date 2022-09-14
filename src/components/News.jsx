import React, { useState, useEffect } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Bitcoin')
  const count = simplified ? 6 : 18
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  })
  const { data: cryptosList, isFetching } = useGetCryptosQuery(100)

  console.log(cryptoNews)

  const demoImage =
    'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

  if (!cryptoNews?.value) return 'Loading ...'

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a crypto'
            onChange={(value) => setNewsCategory(value)}
          >
            {cryptosList?.data?.coins?.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value?.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title level={5}>{news.name}</Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt='image'
                  width={100}
                  height={100}
                />
              </div>

              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)} ...`
                  : `${news.description}`}
              </p>
              <div className='provider-container'>
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=''
                  />
                  <Text level={5} className='provider-name'>
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf('ss').fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
