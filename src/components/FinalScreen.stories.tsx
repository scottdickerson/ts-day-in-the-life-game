import type { Meta, StoryObj } from '@storybook/react'
import { FinalScreen } from './FinalScreen'
import { DinosaurTypeEnum } from './utils'

const reactions = [
    'happy',
    'neutral',
    'afraid',
    'injured',
    'dead',
    'Dead with Injury',
]

const meta: Meta<typeof FinalScreen> = {
    title: 'Game/FinalScreen',
    component: FinalScreen,
    argTypes: {
        reaction: { control: 'select', options: reactions },
        dinosaurType: {
            control: 'select',
            options: Object.values(DinosaurTypeEnum),
        },
    },
    args: {
        message: 'You sleep soundly knowing you are safer in numbers.',
        dinosaurType: DinosaurTypeEnum.Aguja,
        reaction: 'happy',
    },
}
export default meta

type Story = StoryObj<typeof meta>

export const Good: Story = {
    args: {
        reaction: 'afraid',
    },
}
export const Neutral: Story = {
    args: { reaction: 'neutral' },
}
export const Bad: Story = {
    args: { reaction: 'Dead with Injury' },
}
