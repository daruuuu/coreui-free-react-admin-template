/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import firebase from '../../firebaseConfig'
import { useData } from './data-dashboard'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartBar, CChartPie, CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [selectedDatePasien, setSelectedDatePasien] = useState(null)
  const [selectedDatePengunjung, setSelectedDatePengunjung] = useState(null)

  const {
    dataPasien,
    suhuPasienArray,
    pasienArray,
    dataPengunjung,
    suhuPengunjungArray,
    pengunjungArray,
  } = useData()

  const handleDateSelectPasien = (tanggal) => {
    setSelectedDatePasien(tanggal) // Simpan tanggal yang dipilih saat tombol di klik
  }

  const handleDateSelectPengunjung = (tanggal) => {
    setSelectedDatePengunjung(tanggal) // Simpan tanggal yang dipilih saat tombol di klik
  }

  const getTotalDataPasienByMonth = (dataPasien) => {
    const totalDataByMonth = {}

    Object.keys(dataPasien).forEach((tanggal) => {
      // Mendapatkan tanggal bulan (YYYY-MM) dari tanggal data
      const month = tanggal.slice(0, 7)

      if (!totalDataByMonth[month]) {
        totalDataByMonth[month] = 0
      }

      totalDataByMonth[month] += dataPasien[tanggal].length
    })

    return totalDataByMonth
  }

  // Fungsi untuk mendapatkan total data tiap bulan dari data pengunjung
  const getTotalDataPengunjungByMonth = (dataPengunjung) => {
    const totalDataByMonth = {}

    Object.keys(dataPengunjung).forEach((tanggal) => {
      // Mendapatkan tanggal bulan (YYYY-MM) dari tanggal data
      const month = tanggal.slice(0, 7)

      if (!totalDataByMonth[month]) {
        totalDataByMonth[month] = 0
      }

      dataPengunjung[tanggal].forEach((item) => {
        totalDataByMonth[month] += item.antrianPengunjung
      })
    })

    return totalDataByMonth
  }

  const formatDataForDatePasien = (selectedDate) => {
    const dataForDate = dataPasien[selectedDate]
    if (!dataForDate) return { labels: [], data: [] }

    const suhuCounter = {} // Object to count occurrences of each temperature
    dataForDate.forEach((item) => {
      const formattedSuhu = parseFloat(item.suhu.toFixed(1))
      suhuCounter[formattedSuhu] = (suhuCounter[formattedSuhu] || 0) + 1 // Increment occurrence count
    })

    const sortedSuhuArray = Object.keys(suhuCounter)
      .map((suhu) => parseFloat(suhu))
      .sort((a, b) => a - b)

    const labels = sortedSuhuArray.map((suhu) => suhu.toFixed(1))
    const dataJumlahPasien = sortedSuhuArray.map((suhu) => suhuCounter[suhu.toFixed(1)])

    return { labels, data: dataJumlahPasien }
  }

  const formatDataForDatePengunjung = (selectedDate) => {
    const dataForDate = dataPengunjung[selectedDate]
    if (!dataForDate) return { labels: [], data: [] }

    const suhuCounter = {} // Object to count occurrences of each temperature
    dataForDate.forEach((item) => {
      const formattedSuhu = parseFloat(item.suhu.toFixed(1))
      suhuCounter[formattedSuhu] = (suhuCounter[formattedSuhu] || 0) + 1 // Increment occurrence count
    })

    const sortedSuhuArray = Object.keys(suhuCounter)
      .map((suhu) => parseFloat(suhu))
      .sort((a, b) => a - b)

    const labels = sortedSuhuArray.map((suhu) => suhu.toFixed(1))
    const dataJumlahPengunjung = sortedSuhuArray.map((suhu) => suhuCounter[suhu.toFixed(1)])

    return { labels, data: dataJumlahPengunjung }
  }

  const totalDataPasienByMonth = getTotalDataPasienByMonth(dataPasien)
  const totalDataPengunjungByMonth = getTotalDataPengunjungByMonth(dataPengunjung)

  return (
    <>
      <WidgetsDropdown
        totalPasien={totalDataPasienByMonth}
        totalPengunjung={totalDataPengunjungByMonth}
      />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Data Pasien
              </h4>
            </CCol>
            <CCol sm={7}>
              <CButtonGroup
                role="group"
                aria-label="Button group with nested dropdown"
                className="float-end"
              >
                <CButton color="primary" onClick={() => handleDateSelectPasien(null)}>
                  All
                </CButton>{' '}
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Dropdown</CDropdownToggle>
                  <CDropdownMenu>
                    {Object.keys(dataPasien).map((tanggal) => (
                      <div key={tanggal}>
                        <CDropdownItem onClick={() => handleDateSelectPasien(tanggal)}>
                          {tanggal}
                        </CDropdownItem>
                      </div>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels:
                selectedDatePasien === null
                  ? suhuPasienArray
                  : formatDataForDatePasien(selectedDatePasien).labels, // Menggunakan tanggal sebagai label pada chart
              datasets: [
                {
                  label: 'Pasien',
                  backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data:
                    selectedDatePasien === null
                      ? pasienArray
                      : formatDataForDatePasien(selectedDatePasien).data, // Menggunakan array data jumlah pengunjung
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true, // Menampilkan legend pada chart
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Data Pengunjung
              </h4>
            </CCol>
            <CCol sm={7}>
              <CButtonGroup
                role="group"
                aria-label="Button group with nested dropdown"
                className="float-end"
              >
                <CButton color="primary" onClick={() => handleDateSelectPengunjung(null)}>
                  All
                </CButton>{' '}
                {/* Tombol All untuk menampilkan semua data */}
                <CDropdown variant="btn-group">
                  <CDropdownToggle color="primary">Dropdown</CDropdownToggle>
                  <CDropdownMenu>
                    {Object.keys(dataPengunjung).map((tanggal) => (
                      <div key={tanggal}>
                        <CDropdownItem onClick={() => handleDateSelectPengunjung(tanggal)}>
                          {tanggal}
                        </CDropdownItem>
                      </div>
                    ))}
                  </CDropdownMenu>
                </CDropdown>
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '300px', marginTop: '40px' }}
            data={{
              labels:
                selectedDatePengunjung === null
                  ? suhuPengunjungArray
                  : formatDataForDatePengunjung(selectedDatePengunjung).labels, // Menggunakan tanggal sebagai label pada chart
              datasets: [
                {
                  label: 'Pengunjung',
                  backgroundColor: hexToRgba(getStyle('--cui-success'), 10),
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data:
                    selectedDatePengunjung === null
                      ? pengunjungArray
                      : formatDataForDatePengunjung(selectedDatePengunjung).data, // Menggunakan array data jumlah pengunjung
                  fill: true,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: true, // Menampilkan legend pada chart
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  ticks: {
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
