/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, useEffect } from 'react'
import firebase from '../../firebaseConfig'

// Create a new context
const DataContext = createContext()

// Create a custom hook to access the context
export function useData() {
  return useContext(DataContext)
}

// Create a provider component to wrap around your App component
export function DataProvider({ children }) {
  const [dataPasien, setDataPasien] = useState({})
  const [suhuPasienArray, setSuhuPasienArray] = useState([])
  const [pasienArray, setPasienArray] = useState([])
  const [dataPengunjung, setDataPengunjung] = useState({})
  const [suhuPengunjungArray, setSuhuPengunjungArray] = useState([])
  const [pengunjungArray, setPengunjungArray] = useState([])

  useEffect(() => {
    const dataRef = firebase.database().ref('data_pasien')
    dataRef.on('value', (snapshot) => {
      const dataFromFirebase = snapshot.val()
      setDataPasien(dataFromFirebase)

      const suhuCounter = {}

      Object.keys(dataFromFirebase).forEach((tanggal) => {
        dataFromFirebase[tanggal].forEach((item) => {
          const formattedSuhu = item.suhu.toFixed(1)
          suhuCounter[formattedSuhu] = (suhuCounter[formattedSuhu] || 0) + 1
        })
      })

      const sortedSuhuArray = Object.keys(suhuCounter)
        .map((suhu) => Number(suhu))
        .sort((a, b) => a - b)

      const labels = sortedSuhuArray.map((suhu) => suhu.toFixed(1))
      const dataJumlahPasien = sortedSuhuArray.map((suhu) => suhuCounter[suhu.toFixed(1)])

      setSuhuPasienArray(labels)
      setPasienArray(dataJumlahPasien)
    })

    return () => {
      dataRef.off('value')
    }
  }, [])

  useEffect(() => {
    const dataRef = firebase.database().ref('data_pengunjung')
    dataRef.on('value', (snapshot) => {
      const dataFromFirebase = snapshot.val()
      setDataPengunjung(dataFromFirebase)

      // Mengubah data suhu dan data jumlah pengunjung menjadi array
      const suhuCounter = {} // Objek untuk menghitung banyaknya data dengan suhu yang sama

      Object.keys(dataFromFirebase).forEach((tanggal) => {
        dataFromFirebase[tanggal].forEach((item) => {
          // Format suhu dengan 2 angka di belakang koma
          const formattedSuhu = item.suhu.toFixed(1)
          // Hitung jumlah data dengan suhu yang sama
          suhuCounter[formattedSuhu] = (suhuCounter[formattedSuhu] || 0) + item.antrianPengunjung
        })
      })

      // Mengurutkan data suhu dari yang terendah ke tertinggi
      const sortedSuhuArray = Object.keys(suhuCounter)
        .map((suhu) => Number(suhu))
        .sort((a, b) => a - b)

      // Mengubah objek suhuCounter menjadi array label dan data jumlah pengunjung
      const labels = []
      const dataJumlahPengunjung = []
      sortedSuhuArray.forEach((suhu) => {
        labels.push(suhu.toFixed(1)) // Convert back to string for displaying as label
        dataJumlahPengunjung.push(suhuCounter[suhu.toFixed(1)])
      })

      setSuhuPengunjungArray(labels)
      setPengunjungArray(dataJumlahPengunjung)
    })

    return () => {
      dataRef.off('value')
    }
  }, [])

  // Store the data in an object to pass to the context provider
  const dataData = {
    dataPasien,
    suhuPasienArray,
    pasienArray,
    dataPengunjung,
    suhuPengunjungArray,
    pengunjungArray,
  }

  return <DataContext.Provider value={dataData}>{children}</DataContext.Provider>
}
