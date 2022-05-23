import { fireEvent, render as renderRTL, screen } from '@testing-library/react';
import { CharactersList, CharactersListProps } from './CharactersList';

const render = (props: Partial<CharactersListProps> = {}) => {
  const defaultProps = {
    characters: [] as CharactersListProps['characters'],
    isLoading: false,
    error: null,
    onlyTall: false,
    searchTerm: '',
    onSearchChange: jest.fn(),
    onToggleChange: jest.fn(),
    averageHeight: '',
    retryFetch: jest.fn(),
    ...props,
  } as CharactersListProps;

  const view = renderRTL(<CharactersList {...defaultProps} />);
  return { view, props: defaultProps };
};

it('should render loading', () => {
  render({ isLoading: true });
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('should render error msg and fire retry callback after clicking btn', () => {
  const { props } = render({
    error: new Error('500'),
  });
  screen.getByText('Something went wrong');

  const btn = screen.getByText('Try again');
  fireEvent.click(btn);

  expect(props.retryFetch).toHaveBeenCalled();
});

it('should fire search callback on input change', () => {
  const { props } = render();
  const input = screen.getByPlaceholderText('Filter...');

  fireEvent.change(input, { target: { value: 'test' } });
  expect(props.onSearchChange).toHaveBeenCalledWith('test');
});

it('should fire toggle callback on toggle btn click', () => {
  const { props } = render();
  const btn = screen.getByText('Include only tall');

  fireEvent.click(btn);
  expect(props.onToggleChange).toHaveBeenCalled();
});
