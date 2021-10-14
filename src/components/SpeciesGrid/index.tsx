import type { ISpecimen } from '@/types'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

const columns: GridColDef[] = [
  { field: 'taxonid', headerName: 'Taxon Id', width: 100 },

  {
    field: 'class_name',
    headerName: 'Class Name',
    width: 200,
    editable: true,
  },
  {
    field: 'family_name',
    headerName: 'Family Name',
    width: 200,
    editable: true,
  },
  {
    field: 'scientific_name',
    headerName: 'Scientific Name',
    width: 200,
    editable: true,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 150,
    editable: true,
  },
  {
    field: 'conservation_measures',
    headerName: 'Conservation Measures',
    width: 200,
    editable: true,
  },
]

export type SpeciesGridProps = {
  species: ISpecimen[]
}

const SpeciesGrid = ({ species }: SpeciesGridProps) => {
  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={species}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.taxonid}
        disableSelectionOnClick
      />
    </div>
  )
}

export default SpeciesGrid
