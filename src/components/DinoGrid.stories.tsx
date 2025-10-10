import type { Meta, StoryObj } from '@storybook/react'
import { DinoGrid } from './DinoGrid'
import { DinosaurTypeEnum } from '@/components/utils'

const meta = {
    title: 'Components/DinoGrid',
    component: DinoGrid,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DinoGrid>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default grid showing all dinosaurs with the "Choose a Creature" title
 * This is how it appears in DinoSelectScreen
 */
export const AllDinosaurs: Story = {
    args: {},
}

/**
 * Grid showing only the selected Agujaceratops
 * This is how it appears in DinoStartScreen for positioning reference
 */
export const SelectedAguja: Story = {
    args: {
        selectedDinoId: DinosaurTypeEnum.Aguja,
    },
}

/**
 * Grid showing only the selected Tyrannosaurus
 */
export const SelectedTyranno: Story = {
    args: {
        selectedDinoId: DinosaurTypeEnum.Tyranno,
    },
}

/**
 * Grid showing only the selected Mosasaurus (bottom row)
 */
export const SelectedMosa: Story = {
    args: {
        selectedDinoId: DinosaurTypeEnum.Mosa,
    },
}

/**
 * Grid with custom background (like DinoSelectScreen)
 */
export const WithBackground: Story = {
    args: {
        className: 'bg-radial-dino-select',
    },
}
