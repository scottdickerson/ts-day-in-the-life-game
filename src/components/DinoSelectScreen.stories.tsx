import type { Meta, StoryObj } from '@storybook/react'
import { DinoSelectScreen } from './DinoSelectScreen'

const meta: Meta<typeof DinoSelectScreen> = {
    title: 'Game/DinoSelectScreen',
    component: DinoSelectScreen,
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
