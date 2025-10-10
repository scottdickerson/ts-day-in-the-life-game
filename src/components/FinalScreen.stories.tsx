import type { Meta, StoryObj } from '@storybook/react'
import { FinalScreen } from './FinalScreen'
import { DinosaurTypeEnum, DinosaurReaction } from './utils'

const meta: Meta<typeof FinalScreen> = {
    title: 'Game/FinalScreen',
    component: FinalScreen,
    argTypes: {
        reaction: {
            control: 'select',
            options: Object.values(DinosaurReaction),
        },
        dinosaurType: {
            control: 'select',
            options: Object.values(DinosaurTypeEnum),
        },
    },
    args: {
        message: 'You sleep soundly knowing you are safer in numbers.',
        dinosaurType: DinosaurTypeEnum.Aguja,
        reaction: DinosaurReaction.HAPPY,
    },
}
export default meta

type Story = StoryObj<typeof meta>

export const Good: Story = {
    args: {
        reaction: DinosaurReaction.AFRAID,
    },
}
export const Neutral: Story = {
    args: { reaction: DinosaurReaction.NEUTRAL },
}
export const Bad: Story = {
    args: { reaction: DinosaurReaction.DEAD_WITH_INJURY },
}
