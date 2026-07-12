import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreateScreen from '../CreateScreen';
import { ChestnutProvider } from '../../store/ChestnutContext';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('CreateScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getAllByText, getByPlaceholderText } = render(
      <ChestnutProvider>
        <CreateScreen />
      </ChestnutProvider>
    );

    // "发布栗子" appears in both header title and submit button
    expect(getAllByText('发布栗子').length).toBeGreaterThanOrEqual(2);
    expect(getByPlaceholderText('给栗子起个名字...')).toBeTruthy();
    expect(getByPlaceholderText('详细描述你的栗子...')).toBeTruthy();
  });

  it('allows user to input title, content and select category, then submit', () => {
    const { getByPlaceholderText, getByText, getAllByText } = render(
      <ChestnutProvider>
        <CreateScreen />
      </ChestnutProvider>
    );

    // Input Title
    fireEvent.changeText(getByPlaceholderText('给栗子起个名字...'), '测试栗子标题');
    // Input Content
    fireEvent.changeText(getByPlaceholderText('详细描述你的栗子...'), '测试栗子内容详情');

    // Select Category — use actual category name from CATEGORIES
    fireEvent.press(getByText('编程'));

    // Submit — click the submit button (use the last match since header also has "发布栗子")
    const submitBtns = getAllByText('发布栗子');
    const submitBtn = submitBtns[submitBtns.length - 1];
    fireEvent.press(submitBtn);

    expect(Alert.alert).toHaveBeenCalledWith(
      '🎉 发布成功',
      '你的栗子已经发布到广场啦！',
      expect.any(Array)
    );
  });
});
