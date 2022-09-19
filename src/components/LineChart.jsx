import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
import { Col, Row, Typography } from 'antd'
Chart.register(...registerables)


const { Title } = Typography

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = []
  const coinTimestamp = []

  coinHistory?.data?.history.forEach((date) => {
    coinPrice.push(date?.price)
    const timestamp = date?.timestamp * 1000
    coinTimestamp.push(new Date(timestamp).toLocaleDateString())
  })
  console.log({ coinPrice, coinTimestamp })

  

  const data = {
    labels: coinTimestamp.reverse(),
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice.reverse(),
        backgroundColor: '#0071bd',
        fill: false,
        borderColor: '#0071bd'
      }
    ]
  } 

 const options = {
   scales: {
     y: {
       beginAtZero: true,
     },
   },
 }

  return (
    <>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>
          {coinName} Price Chart
        </Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className='current-price'>
            Current {coinName} Price: {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line datasetIdKey='id' data={data} options={options} />
    </>
  )
}

export default LineChart
