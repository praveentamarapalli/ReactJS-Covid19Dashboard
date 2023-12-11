/* eslint-disable no-shadow */
/* eslint-disable react/no-unknown-property */
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  XAxis,
  LineChart,
  Line,
  YAxis,
} from 'recharts'

import './index.css'

const Charts = props => {
  const {category} = props
  const {stateCode} = useParams()

  const [stateChartData, setStateChartData] = useState({
    chartsList: '',
    chartsOther: '',
  })

  useEffect(() => {
    const getStateCovidData = async () => {
      const apiUrl = 'https://apis.ccbp.in/covid19-timelines-data/'
      const options = {
        method: 'GET',
      }
      const response = await fetch(apiUrl, options)

      if (response.ok) {
        const data = await response.json()
        // console.log(data);
        const dataObject = Object.keys(data[stateCode].dates)
        // console.log(dataObject);
        const dataState = dataObject.map(eachDate => ({
          eachDate,
          confirmed: data[stateCode].dates[eachDate].total.confirmed,
          recovered: data[stateCode].dates[eachDate].total.recovered,
          deceased: data[stateCode].dates[eachDate].total.deceased,
          tested: data[stateCode].dates[eachDate].total.tested,
          active:
            data[stateCode].dates[eachDate].total.confirmed -
            data[stateCode].dates[eachDate].total.recovered -
            data[stateCode].dates[eachDate].total.deceased,
        }))
        // console.log(dataState);

        setStateChartData(prevState => ({
          ...prevState,
          chartsList: dataState,
          chartsOther: dataState,
        }))
      }
    }
    getStateCovidData()
  }, [stateCode])

  const barGraph = () => {
    const {chartsList} = stateChartData
    const maxBarChart = chartsList.slice(Math.max(chartsList.length - 10, 0))

    let barColor
    if (category === 'confirmed') {
      barColor = '#9A0E31'
    } else if (category === 'active') {
      barColor = '#0A4FA0'
    } else if (category === 'recovered') {
      barColor = '#216837'
    } else if (category === 'deceased') {
      barColor = '#474C57'
    }

    return (
      <div className="bar-graph-container">
        <BarChart
          width={900}
          height={460}
          barSize={45}
          data={maxBarChart}
          margin={{
            top: 20,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="eachDate"
            stroke={`${barColor}`}
            interval={0}
            axisLine={false}
            fontSize={10}
            tickLine={0}
            strokeWidth={1}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: 14,
              textTransform: 'uppercase',
            }}
          />
          <Tooltip stroke={`${barColor}`} />
          <Legend wrapperStyle={{fontSize: 22, textTransform: 'capitalize'}} />
          <Bar
            dataKey={category}
            fill={`${barColor}`}
            label={{
              position: 'top',
              fill: `${barColor}`,
              fontSize: 14,
            }}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </div>
    )
  }

  const lineGraph = (category, color) => {
    const {chartsOther} = stateChartData

    return (
      <div className={`line-graph-container line-graph-${category}`}>
        <LineChart
          width={900}
          height={250}
          data={chartsOther}
          margin={{top: 5, right: 50, left: 20, bottom: 5}}
        >
          <XAxis
            dataKey="eachDate"
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={5}
            stroke={color}
          />
          <YAxis stroke={color} />
          <Tooltip />
          <Legend
            wrapperStyle={{fontSize: 18, textTransform: 'capitalize'}}
            margin={{top: 10, bottom: 10}}
          />
          <Line type="monotone" dataKey={category} stroke={color} />
        </LineChart>
      </div>
    )
  }

  const lineGraphCharts = () => (
    <div>
      <h1 className="charts-graph-heading">Speed Trends</h1>
<<<<<<< HEAD
      <div className="line-chart-graph">
=======
      <div testid="lineChartsContainer" className="line-chart-graph">
>>>>>>> f669e8f54bd2c41e61fc1bd03f1923ccddc7478e
        <div className="charts-graph-list-margin charts-graph-red">
          {lineGraph('confirmed', '#FF073A')}
        </div>
        <div className="charts-graph-list-margin charts-graph-blue">
          {lineGraph('active', '#007BFF')}
        </div>
        <div className="charts-graph-list-margin charts-graph-green">
          {lineGraph('recovered', '#27A243')}
        </div>
        <div className="charts-graph-list-margin charts-graph-gray">
          {lineGraph('deceased', '#6C757D')}
        </div>
        <div className="charts-graph-list-margin charts-graph-vi">
          {lineGraph('tested', '#9673B9')}
        </div>
      </div>
    </div>
  )

  return (
    <div className="charts-container">
      {barGraph()}
      {lineGraphCharts()}
    </div>
  )
}

export default Charts
