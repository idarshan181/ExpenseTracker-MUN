import CategoriesClient from '@/components/Categories/CategoriesClient';
import { fireEvent, render, screen } from '@testing-library/react';

//  Mock useCategories (custom hook)
jest.mock('@/hooks/useCategories', () => ({
  useCategories: () => ({
    data: [{ id: 1, name: 'Groceries' }],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

// Mock backend-related modules (to avoid Jest parsing ESM/Prisma/auth logic)
jest.mock('@/app/utils/auth', () => ({}));
jest.mock('@/app/utils/requireUser', () => ({}));
jest.mock('@/app/actions/categoryActions', () => ({
  deleteCategory: jest.fn(),
}));

// Mock any components that may indirectly import backend logic
jest.mock('@/components/Categories/DeleteCategoryButton', () => () => <div>MockDeleteButton</div>);
jest.mock('@/components/Categories/CategoriesColumn', () => ({
  CategoriesColumn: [],
}));

//  Mock AddCategoriesDialog and CategoriesTable
jest.mock('@/components/Categories/AddCategoriesDialog', () => ({
  __esModule: true,
  default: ({ isOpen }: any) =>
    isOpen ? <div data-testid="add-category-dialog">Dialog Open</div> : null,
}));

jest.mock('@/components/Categories/CategoriesTable', () => ({
  __esModule: true,
  CategoriesTable: () => <div>Mocked CategoriesTable</div>,
}));

// Frontend test cases only
describe('CategoriesClient (Frontend UI)', () => {
  it('renders header and Add Category button', () => {
    render(<CategoriesClient />);

    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Add Category')).toBeInTheDocument();
    expect(screen.getByText('Mocked CategoriesTable')).toBeInTheDocument();
  });

  it('opens AddCategoriesDialog when Add Category button is clicked', () => {
    render(<CategoriesClient />);

    const button = screen.getByText('Add Category');
    fireEvent.click(button);

    expect(screen.getByTestId('add-category-dialog')).toBeInTheDocument();
  });
});
