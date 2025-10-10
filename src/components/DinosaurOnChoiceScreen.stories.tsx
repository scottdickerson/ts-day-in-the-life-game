import type { Meta, StoryObj } from '@storybook/react'
import DinosaurOnChoiceScreen from './DinosaurOnChoiceScreen'
import { DinosaurTypeEnum, DinosaurReaction } from './utils'

const meta: Meta<typeof DinosaurOnChoiceScreen> = {
    title: 'Game/DinosaurOnChoiceScreen',
    component: DinosaurOnChoiceScreen,
    argTypes: {
        dinosaurType: {
            control: 'select',
            options: Object.values(DinosaurTypeEnum),
        },
        reactionLabel: {
            control: 'select',
            options: Object.values(DinosaurReaction),
        },
    },
    args: {
        dinosaurType: DinosaurTypeEnum.Aguja,
        reactionLabel: DinosaurReaction.NEUTRAL,
    },
}
export default meta

type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Happy: Story = { args: { reactionLabel: DinosaurReaction.HAPPY } }

export const Eating: Story = {
    args: { reactionLabel: DinosaurReaction.EATING },
}

export const Afraid: Story = {
    args: { reactionLabel: DinosaurReaction.AFRAID },
}

export const Flirty: Story = {
    args: { reactionLabel: DinosaurReaction.FLIRTY },
}
export const Flirtacious: Story = {
    args: { reactionLabel: DinosaurReaction.FLIRTACIOUS },
}
export const Injured: Story = {
    args: { reactionLabel: DinosaurReaction.INJURED },
}
export const DeadInjury: Story = {
    args: { reactionLabel: DinosaurReaction.DEAD_WITH_INJURY },
}
export const Dead: Story = { args: { reactionLabel: DinosaurReaction.DEAD } }
