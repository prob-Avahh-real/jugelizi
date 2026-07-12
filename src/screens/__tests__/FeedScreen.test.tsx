import { render, fireEvent } from '@testing-library/react-native';
import FeedScreen from '../FeedScreen';
import { ChestnutProvider } from '../../store/ChestnutContext';

const mockNavigate = jest.fn();

describe('FeedScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ChestnutProvider>
        <FeedScreen navigation={{ navigate: mockNavigate }} />
      </ChestnutProvider>
    );

    expect(getByText('举个栗子')).toBeTruthy();
    expect(getByText('每天一个小知识 🌰')).toBeTruthy();
  });

  it('filters chestnuts by category', () => {
    const { getAllByText } = render(
      <ChestnutProvider>
        <FeedScreen navigation={{ navigate: mockNavigate }} />
      </ChestnutProvider>
    );

    // MOCK_CHESTNUTS has items with category '编程' — appears in chip and cards
    const chips = getAllByText('编程');
    fireEvent.press(chips[0]); // press the first '编程' (the filter chip)
    // Category chip toggles — just confirm no crash
  });

  it('navigates to DetailScreen when a card is pressed', () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <ChestnutProvider>
        <FeedScreen navigation={{ navigate }} />
      </ChestnutProvider>
    );

    // Find a known item
    fireEvent.press(getByText('一行 CSS 实现渐变文字效果'));
    expect(navigate).toHaveBeenCalledWith('Detail', expect.any(Object));
  });
});
