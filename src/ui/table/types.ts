import {ReactNode} from "react";
import {TableHeader} from "./components/table-header";
import {TableCell} from "./components/table-cell";
import {TableRow} from "./components/table-row";
import {TableHeaderCell} from "./components/table-header-cell";

interface TableCommonProps {
  className?: string
  children?: ReactNode
}

interface TableRowProps extends TableCommonProps {
  onClick?: () => void
}

type TableHeaderProps = TableCommonProps

type TableCellProps = TableCommonProps

type TableHeaderCellProps = TableCommonProps

interface TableProps extends TableCommonProps {
  columnWidths: string[]
}

interface TableSubcomponents {
  Header: typeof TableHeader
  Cell: typeof TableCell
  HeaderCell: typeof TableHeaderCell
  Row: typeof TableRow
}

export type {
  TableProps,
  TableSubcomponents,
  TableRowProps,
  TableHeaderProps,
  TableCellProps,
  TableHeaderCellProps
}
