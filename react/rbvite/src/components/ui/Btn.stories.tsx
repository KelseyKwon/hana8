import type { Meta, StoryObj } from '@storybook/react-vite';
import Btn from './Btn';

const meta: Meta = {
  title: 'ui/Btn',
  component: Btn,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const PrimaryBtn: Story = {
  args: {
    variant: 'primary',
    // 이것이 텍스트가 됨.
    children: 'PrimaryBtn',
    type: 'submit',
    onclick: () => alert('primary!'),
  },
};
export const DestructiveBtn: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive Btn',
    type: 'reset',
    onClick: () => alert('primary!'),
  },
};

export default meta;
