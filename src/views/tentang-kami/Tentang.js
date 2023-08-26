/* eslint-disable prettier/prettier */
import React from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol } from '@coreui/react'
import { DocsLink } from 'src/components'

const Tentang = () => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Tentang Rumah Sakit</CCardHeader>
        <CCardBody>
          <CRow className="justify-content-center">
            <CCol md="8">
              <h3 className="text-center mb-4">Nama Rumah Sakit</h3>
              <p className="text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl
                tincidunt convallis.
              </p>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md="6">
              <h4>Visi</h4>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Sed ac purus sit amet nisl tincidunt convallis.</li>
                <li>Ut varius purus nec justo scelerisque.</li>
              </ul>
            </CCol>
            <CCol md="6">
              <h4>Misi</h4>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                <li>Sed ac purus sit amet nisl tincidunt convallis.</li>
                <li>Ut varius purus nec justo scelerisque.</li>
              </ul>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md="8">
              <h4>Alamat</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl
                tincidunt convallis.
              </p>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            <CCol md="6">
              <h4>Hubungi Kami</h4>
              <p>Nomor Telepon: +123-456-7890</p>
            </CCol>
            <CCol md="6">
              <h4>Website</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl
                tincidunt convallis.
              </p>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Tentang
