import React from 'react'
import { useSelector } from 'react-redux'
import CippDatatable from 'src/components/cipp/CippDatatable'
import CellBoolean from '../../../components/cipp/CellBoolean'
import TenantSelector from 'src/components/cipp/TenantSelector'
import { Link } from 'react-router-dom'
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'

const dropdown = (row, rowIndex, formatExtraData) => (
  <CDropdown>
    <CDropdownToggle size="sm" color="link">
      <FontAwesomeIcon icon={faBars} />
    </CDropdownToggle>
    <CDropdownMenu style={{ position: 'fixed', right: 0, zIndex: 1000 }}>
      <CDropdownItem href="#">
        <Link className="dropdown-item" to={`/teams-share/teams/view-team-settings}`}>
          <FontAwesomeIcon icon={faCog} className="me-2" />
          View Team Settings
        </Link>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
)

const Formatter = (cell) => CellBoolean({ cell })
const columns = [
  {
    name: 'Assigned to User',
    selector: (row) => row['AssignedTo'],
    sortable: true,
  },
  {
    name: 'Phone Number',
    selector: (row) => row['TelephoneNumber'],
    sortable: true,
  },
  {
    name: 'Number Type',
    selector: (row) => row['NumberType'],
    sortable: true,
  },
  {
    name: 'Country',
    selector: (row) => row['IsoCountryCode'],
    sortable: true,
  },
  {
    name: 'Location',
    selector: (row) => row['PlaceName'],
    sortable: true,
  },
  {
    name: 'Activation State',
    selector: (row) => row['ActivationState'],
    formatter: Formatter,
    sortable: true,
  },
  {
    name: 'Operator Connect',
    selector: (row) => row['IsOperatorConnect'],
    formatter: Formatter,
    sortable: true,
  },
  {
    name: 'Purchased on',
    selector: (row) => row['AcquisitionDate'],
    sortable: true,
  },
  {
    name: 'Actions',
    cell: dropdown,
  },
]

const BusinessVoice = () => {
  const tenant = useSelector((state) => state.app.currentTenant)
  return (
    <div>
      <TenantSelector />
      <hr />
      <CCard className="page-card">
        <CCardHeader>
          <CCardTitle className="text-primary">Teams Business Voice</CCardTitle>
        </CCardHeader>
        <CCardBody>
          {Object.keys(tenant).length === 0 && <span> Select a tenant to get started.</span>}
          <CippDatatable
            reportName={`${tenant?.defaultDomainName}-Businessvoice`}
            path="/api/ListTeamsVoice"
            columns={columns}
            params={{ TenantFilter: tenant?.defaultDomainName }}
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default BusinessVoice
