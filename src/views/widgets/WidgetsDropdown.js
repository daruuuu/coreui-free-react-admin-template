/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'

const WidgetsDropdown = (props) => {
  const { totalPasien } = props
  const { totalPengunjung } = props
  const totalPasienArray = Object.entries(totalPasien)
  const totalPengunjungArray = Object.entries(totalPengunjung)
  const [selectedMonthPasien, setSelectedMonthPasien] = useState('')
  const [selectedMonthPengunjung, setSelectedMonthPengunjung] = useState('')

  // Function to update the selected month when a button is clicked
  const handleMonthChangePasien = (month) => {
    setSelectedMonthPasien(month)
  }

  const handleMonthChangePengunjung = (month) => {
    setSelectedMonthPengunjung(month)
  }

  // Filter the data for the selected month
  const selectedMonthDataPasien = selectedMonthPasien
    ? totalPasienArray.find(([month]) => month === selectedMonthPasien)
    : null
  const totalPasienForSelectedMonth = selectedMonthDataPasien ? selectedMonthDataPasien[1] : ''

  const selectedMonthDataPengunjung = selectedMonthPengunjung
    ? totalPengunjungArray.find(([month]) => month === selectedMonthPengunjung)
    : null
  const totalPengunjungForSelectedMonth = selectedMonthDataPengunjung
    ? selectedMonthDataPengunjung[1]
    : ''
  return (
    <CRow>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="primary"
          value={
            selectedMonthPasien
              ? totalPasienForSelectedMonth
              : totalPasienArray.reduce((total, [, value]) => total + value, 0)
          }
          title={
            selectedMonthPasien
              ? `Total Pasien pada ${selectedMonthPasien}`
              : 'Total Pasien (Semua Bulan)'
          }
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                {totalPasienArray.map(([month]) => (
                  <CDropdownItem
                    key={month}
                    className={`btn btn-${
                      selectedMonthPasien === month ? 'primary' : 'secondary'
                    } m-1`}
                    onClick={() => handleMonthChangePasien(month)}
                  >
                    {month}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-primary'),
                    data: [34, 59, 84, 84, 51, 55, 40],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: 30,
                    max: 89,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                    tension: 0.4,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
      <CCol sm={6} lg={3}>
        <CWidgetStatsA
          className="mb-4"
          color="info"
          value={
            selectedMonthPengunjung
              ? totalPengunjungForSelectedMonth
              : totalPengunjungArray.reduce((total, [, value]) => total + value, 0)
          }
          title={
            selectedMonthPengunjung
              ? `Total Pengunjung pada ${selectedMonthPengunjung}`
              : 'Total Pengunjung (Semua Bulan)'
          }
          action={
            <CDropdown alignment="end">
              <CDropdownToggle color="transparent" caret={false} className="p-0">
                <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
              </CDropdownToggle>
              <CDropdownMenu>
                {totalPengunjungArray.map(([month]) => (
                  <CDropdownItem
                    key={month}
                    className={`btn btn-${
                      selectedMonthPengunjung === month ? 'primary' : 'secondary'
                    } m-1`}
                    onClick={() => handleMonthChangePengunjung(month)}
                  >
                    {month}
                  </CDropdownItem>
                ))}
              </CDropdownMenu>
            </CDropdown>
          }
          chart={
            <CChartLine
              className="mt-3 mx-3"
              style={{ height: '70px' }}
              data={{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'My First dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: getStyle('--cui-info'),
                    data: [1, 18, 9, 17, 34, 22, 11],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                  y: {
                    min: -9,
                    max: 39,
                    display: false,
                    grid: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                },
                elements: {
                  line: {
                    borderWidth: 1,
                  },
                  point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          }
        />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
