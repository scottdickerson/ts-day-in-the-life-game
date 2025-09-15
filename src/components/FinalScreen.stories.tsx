import type { Meta, StoryObj } from '@storybook/react'
import { FinalScreen, FinalDinosaurState } from './FinalScreen'
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
        state: {
            control: 'select',
            options: Object.values(FinalDinosaurState),
        },
        reaction: { control: 'select', options: reactions },
        dinosaurType: { control: 'text' },
    },
    args: {
        message: 'You sleep soundly knowing you are safer in numbers.',
        state: FinalDinosaurState.GOOD,
        dinosaurType: DinosaurTypeEnum.Aguja,
        reaction: 'happy',
    },
}
export default meta

type Story = StoryObj<typeof meta>

export const Good: Story = {}
export const Neutral: Story = {
    args: { state: FinalDinosaurState.NEUTRAL, reaction: 'neutral' },
}
export const Bad: Story = {
    args: { state: FinalDinosaurState.BAD, reaction: 'Dead with Injury' },
}
