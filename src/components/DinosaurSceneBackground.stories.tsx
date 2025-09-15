import type { Meta, StoryObj } from '@storybook/react'
import DinosaurSceneBackground from './DinosaurSceneBackground'
import { DinosaurTypeEnum } from './utils'

const meta: Meta<typeof DinosaurSceneBackground> = {
    title: 'Game/DinosaurSceneBackground',
    component: DinosaurSceneBackground,
    argTypes: {
        dinosaurType: {
            control: 'select',
            options: Object.values(DinosaurTypeEnum),
        },
        codeId: { control: 'text' },
    },
    args: {
        dinosaurType: DinosaurTypeEnum.Aguja,
        codeId: '1a_2a_3a',
    },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
