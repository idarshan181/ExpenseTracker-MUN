import CategoriesClient from '@/components/Categories/CategoriesClient';
import { useCategories } from '@/hooks/useCategories';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/hooks/useCategories');
jest.mock('./AddCategoriesDialog', () => ({ isOpen }: any) =>
  isOpen ? <div data-testid="add-category-dialog">AddCategoriesDialogMock</div> : null);
jest.mock('./CategoriesTable', () => () => <div>CategoriesTableMock</div>);

describe('CategoriesClient', () => {
  const mockRefetch = jest.fn();

  it('shows loading state', () => {
    (useCategories as jest.Mock).mockReturnValue({
      data: [],
      isLoading: true,
      refetch: mockRefetch,
    });

    render(<CategoriesClient />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders Add Category button and table when loaded', () => {
    (useCategories as jest.Mock).mockReturnValue({
      data: [{ id: 1, name: 'Groceries' }],
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CategoriesClient />);

    expect(screen.getByText('Add Category')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('CategoriesTableMock')).toBeInTheDocument();
  });

  it('opens AddCategoriesDialog on button click', () => {
    (useCategories as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
      refetch: mockRefetch,
    });

    render(<CategoriesClient />);
    const addButton = screen.getByText('Add Category');
    fireEvent.click(addButton);

    expect(screen.getByTestId('add-category-dialog')).toBeInTheDocument();
  });
});
