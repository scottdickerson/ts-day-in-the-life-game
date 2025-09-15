import type { Meta, StoryObj } from '@storybook/react'
import { DinosaurWelcomeScreen } from './DinosaurWelcomeScreen'
import { DinosaurTypeEnum } from './utils'

const meta: Meta<typeof DinosaurWelcomeScreen> = {
    title: 'Game/DinosaurWelcomeScreen',
    component: DinosaurWelcomeScreen,
    argTypes: {
        dinoId: { control: 'select', options: Object.values(DinosaurTypeEnum) },
        dinoName: { control: 'text' },
        description: { control: 'text' },
    },
    args: {
        dinoId: DinosaurTypeEnum.Aguja,
        dinoName: 'Agujaceratops',
    },
}
export default meta

type Story = StoryObj<typeof meta>

export const Aguja: Story = {}
export const Krito: Story = {
    args: { dinoId: DinosaurTypeEnum.Krito, dinoName: 'Kritosaurus' },
}
export const Mosa: Story = {
    args: { dinoId: DinosaurTypeEnum.Mosa, dinoName: 'Mosasaurus' },
}
export const Protos: Story = {
    args: { dinoId: DinosaurTypeEnum.Protos, dinoName: 'Protohadros' },
}
export const Tyranno: Story = {
    args: { dinoId: DinosaurTypeEnum.Tyranno, dinoName: 'Tyrannosaurus' },
}
