import type { Meta, StoryObj } from '@storybook/react'
import DinosaurOnChoiceScreen from './DinosaurOnChoiceScreen'
import { DinosaurTypeEnum } from './utils'

const reactions = [
    'neutral',
    'happy',
    'afraid',
    'flirty',
    'injured',
    'Dead with Injury',
    'dead',
]

const meta: Meta<typeof DinosaurOnChoiceScreen> = {
    title: 'Game/DinosaurOnChoiceScreen',
    component: DinosaurOnChoiceScreen,
    argTypes: {
        dinosaurType: {
            control: 'select',
            options: Object.values(DinosaurTypeEnum),
        },
        reactionLabel: { control: 'select', options: reactions },
    },
    args: {
        dinosaurType: DinosaurTypeEnum.Aguja,
        reactionLabel: 'neutral',
    },
}
export default meta

type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Happy: Story = { args: { reactionLabel: 'happy' } }
export const Afraid: Story = { args: { reactionLabel: 'afraid' } }
export const Flirty: Story = { args: { reactionLabel: 'flirty' } }
export const Injured: Story = { args: { reactionLabel: 'injured' } }
export const DeadInjury: Story = { args: { reactionLabel: 'Dead with Injury' } }
export const Dead: Story = { args: { reactionLabel: 'dead' } }
