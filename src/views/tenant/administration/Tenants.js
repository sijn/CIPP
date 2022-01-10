import React from 'react'
import { useSelector } from 'react-redux'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faEdit } from '@fortawesome/free-solid-svg-icons'
import { CippPageList } from 'src/components'

const Offcanvas = (row, rowIndex, formatExtraData) => {
  return (
    <>
      <CButton
        size="sm"
        variant="ghost"
        color="warning"
        href={`/tenant/administration/tenants/Edit?TenantFilter=${row.defaultDomainName}`}
      >
        <FontAwesomeIcon icon={faEdit} />
      </CButton>
    </>
  )
}

const columns = [
  {
    name: 'Name',
    selector: (row) => row['displayName'],
    sortable: true,
  },
  {
    name: 'Default Domain',
    selector: (row) => row['defaultDomainName'],
    sortable: true,
  },
  {
    name: 'M365 Portal',
    selector: (row) => row['customerId'],
    center: true,
    cell: (row) => (
      <a
        href={`https://portal.office.com/Partner/BeginClientSession.aspx?CTID=${row.customerId}&CSDEST=o365admincenter`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Exchange Portal',
    selector: (row) => row['defaultDomainName'],
    center: true,
    cell: (row) => (
      <a
        href={`https://outlook.office365.com/ecp/?rfr=Admin_o365&exsvurl=1&delegatedOrg=${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'AAD Portal',
    selector: (row) => row['defaultDomainName'],
    center: true,
    cell: (row) => (
      <a
        href={`https://aad.portal.azure.com/${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Teams Portal',
    selector: (row) => row['defaultDomainName'],
    center: true,
    cell: (row) => (
      <a
        href={`https://admin.teams.microsoft.com/?delegatedOrg=${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Azure Portal',
    selector: (row) => row['defaultDomainName'],
    center: true,
    cell: (row) => (
      <a
        href={`https://portal.azure.com/${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'MEM (Intune) Portal',
    selector: (row) => row['defaultDomainName'],
    center: true,
    cell: (row) => (
      <a
        href={`https://endpoint.microsoft.com/${row.defaultDomainName}`}
        target="_blank"
        className="dlink"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
      </a>
    ),
  },
  {
    name: 'Action',
    center: true,
    cell: Offcanvas,
  },
]

const TenantsList = () => {
  const tenant = useSelector((state) => state.app.currentTenant)

  return (
    <CippPageList
      title="Tenants"
      tenantSelector={false}
      datatable={{
        keyField: 'id',
        columns,
        reportName: `${tenant.tenantId}-Tenants-List`,
        path: '/api/ListTenants',
      }}
    />
  )
}

export default TenantsList
