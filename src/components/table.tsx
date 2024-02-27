import {
  Table as ChakraTable,
  Th,
  TableCaption,
  Tr,
  Td,
  Tbody,
  Thead,
  TableOptions,
  ThemingProps,
} from '@chakra-ui/react'

export type Row = {
  id: string
  values: string[]
}

export type TableProps = TableOptions &
  ThemingProps<'Table'> & {
    caption?: string
    headers: string[]
    rows: Row[]
  }

export function Table({ caption, headers, rows, ...props }: TableProps) {
  return (
    <ChakraTable {...props}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <Thead>
        <Tr>
          {headers.map((header) => (
            <Th key={header}>{header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((row) => (
          <Tr key={row.id}>
            {row.values.map((value) => (
              <Td key={`${row.id}-${value}`}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  )
}
