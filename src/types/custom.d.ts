import '@tanstack/react-table'

declare module '*.svg' {
  import * as React from 'react'
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>
  export default ReactComponent
}

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string
  }
}
