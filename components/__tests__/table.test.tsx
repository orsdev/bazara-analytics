import { render, screen } from '@testing-library/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption
} from '../ui/table/table';

describe('Table Components', () => {
  describe('Table', () => {
    it('renders without crashing', () => {
      expect(() =>
        render(
          <Table>
            <tbody>
              <tr>
                <td>Content</td>
              </tr>
            </tbody>
          </Table>
        )
      ).not.toThrow();
    });

    it('renders as table element', () => {
      render(
        <Table>
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(table).toHaveAttribute('data-slot', 'table');
    });

    it('applies default classes', () => {
      render(
        <Table>
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );
      const table = screen.getByRole('table');
      expect(table).toHaveClass('w-full');
      expect(table).toHaveClass('caption-bottom');
      expect(table).toHaveClass('text-sm');
    });

    it('applies custom className', () => {
      render(
        <Table className="custom-class">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );
      const table = screen.getByRole('table');
      expect(table).toHaveClass('custom-class');
    });

    it('passes through additional props', () => {
      render(
        <Table data-testid="custom-table">
          <tbody>
            <tr>
              <td>Content</td>
            </tr>
          </tbody>
        </Table>
      );
      expect(screen.getByTestId('custom-table')).toBeInTheDocument();
    });
  });

  describe('TableHeader', () => {
    it('renders as thead element', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const thead = screen.getAllByRole('rowgroup')[0];
      expect(thead).toHaveAttribute('data-slot', 'table-header');
    });

    it('applies default classes', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const thead = screen.getAllByRole('rowgroup')[0];
      expect(thead).toHaveClass('bg-background');
    });
  });

  describe('TableBody', () => {
    it('renders as tbody element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const tbody = screen.getAllByRole('rowgroup')[0];
      expect(tbody).toHaveAttribute('data-slot', 'table-body');
    });
  });

  describe('TableFooter', () => {
    it('renders as tfoot element', () => {
      render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
      const tfoot = screen.getAllByRole('rowgroup')[0];
      expect(tfoot).toHaveAttribute('data-slot', 'table-footer');
    });

    it('applies font-medium class', () => {
      render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
      const tfoot = screen.getAllByRole('rowgroup')[0];
      expect(tfoot).toHaveClass('font-medium');
    });
  });

  describe('TableRow', () => {
    it('renders as tr element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByRole('row');
      expect(row).toHaveAttribute('data-slot', 'table-row');
    });

    it('applies hover and selection classes', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByRole('row');
      expect(row).toHaveClass('hover:bg-muted/50');
      expect(row).toHaveClass('border-b');
      expect(row).toHaveClass('transition-colors');
    });

    it('supports selected state', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-state="selected">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const row = screen.getByRole('row');
      expect(row).toHaveClass('data-[state=selected]:bg-muted');
    });
  });

  describe('TableHead', () => {
    it('renders as th element', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const th = screen.getByRole('columnheader');
      expect(th).toHaveAttribute('data-slot', 'table-head');
    });

    it('renders content correctly', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });
  });

  describe('TableCell', () => {
    it('renders as td element', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const td = screen.getByRole('cell');
      expect(td).toHaveAttribute('data-slot', 'table-cell');
    });

    it('renders content correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  describe('TableCaption', () => {
    it('renders as caption element', () => {
      render(
        <Table>
          <TableCaption>Table Caption</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const caption = screen.getByText('Table Caption');
      expect(caption).toHaveAttribute('data-slot', 'table-caption');
    });

    it('applies muted text classes', () => {
      render(
        <Table>
          <TableCaption>Table Caption</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const caption = screen.getByText('Table Caption');
      expect(caption).toHaveClass('text-muted-foreground');
    });
  });

  describe('Table Integration', () => {
    it('renders complete table structure', () => {
      render(
        <Table>
          <TableCaption>User Information</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total: 2 users</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      // Verify table structure
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('User Information')).toBeInTheDocument();
      expect(screen.getAllByRole('columnheader')).toHaveLength(2);
      expect(screen.getAllByRole('row')).toHaveLength(4); // 2 header + 2 body + 1 footer
      expect(screen.getAllByRole('cell')).toHaveLength(5); // 4 data cells + 1 footer cell
      expect(screen.getByText('Total: 2 users')).toBeInTheDocument();
    });
  });
});
