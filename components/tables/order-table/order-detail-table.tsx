import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Invoice = {
  productName: string;
  numberOfProducts: number;
  price: number;
  totalMoney: number;
};

const TableDemoConst: React.FC<{ initialData: Invoice[] }> = ({ initialData }) => (
    <Table>
    <TableCaption>A list of your details of order.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Product Name</TableHead>
        <TableHead>Quantity</TableHead>
        <TableHead>Price</TableHead>
        <TableHead className="text-right">Total</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
            {initialData.map((invoice) => (
        <TableRow key={invoice.productName}>
          <TableCell className="font-medium">{invoice.productName.toString()}</TableCell>
          <TableCell>{invoice.numberOfProducts.toString()}</TableCell>
          <TableCell>{invoice.totalMoney.toString()}</TableCell>
          <TableCell className="text-right">{invoice.totalMoney.toString()}</TableCell>
        </TableRow>
      ))}
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        {/* Calculation of total amount should be dynamic based on initialData */}
        <TableCell className="text-right">
          {initialData.reduce((total, invoice) => total + invoice.totalMoney, 0)}$
        </TableCell>
      </TableRow>
    </TableFooter>
  </Table>
);

export default TableDemoConst;