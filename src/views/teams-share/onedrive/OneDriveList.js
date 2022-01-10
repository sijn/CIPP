import React from 'react'
import { useSelector } from 'react-redux'
import TenantSelector from '../../../components/cipp/TenantSelector'
import CippDatatable from '../../../components/cipp/CippDatatable'
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

import { Link } from 'react-router-dom'
import { faCog, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const dropdown = (row, rowIndex, formatExtraData) => {
  return (
    <CDropdown>
      <CDropdownToggle size="sm" color="link">
        <FontAwesomeIcon icon={faBars} />
      </CDropdownToggle>
      <CDropdownMenu style={{ position: 'fixed', right: 0, zIndex: 1000 }}>
        <CDropdownItem href="#">
          <Link
            className="dropdown-item"
            to={`/identity/administration/users/edit?userId=${row.id}&tenantDomain=${row.primDomain}`}
          >
            <FontAwesomeIcon icon={faCog} className="me-2" />
            Edit User
          </Link>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

const columns = [
  {
    name: 'Name',
    selector: (row) => row['displayName'],
    sort: true,
  },
  {
    name: 'UPN',
    selector: (row) => row['UPN'],
    sort: true,
  },
  {
    name: 'Last Active',
    selector: (row) => row['LastActive'],
    sort: true,
  },
  {
    name: 'File Count (Total)',
    selector: (row) => row['FileCount'],
    sort: true,
  },
  {
    name: 'Used (GB)',
    selector: (row) => row['UsedGB'],
    sort: true,
  },
  {
    name: 'Allocated (GB)',
    selector: (row) => row['Allocated'],
    sort: true,
  },
  {
    name: 'Actions',
    cell: dropdown,
  },
]

const OneDriveList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <div>
      <TenantSelector />
      <hr />
      <CCard className="page-card">
        <CCardHeader>
          <CCardTitle className="text-primary">OneDrive Report</CCardTitle>
        </CCardHeader>
        <CCardBody>
          {Object.keys(tenant).length === 0 && <span>Select a tenant to get started.</span>}
          <CippDatatable
            keyField="id"
            reportName={`${tenant?.defaultDomainName}-OneDrive-Report`}
            path="/api/ListSites?type=OneDriveUsageAccount"
            columns={columns}
            params={{ TenantFilter: tenant?.defaultDomainName }}
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default OneDriveList
