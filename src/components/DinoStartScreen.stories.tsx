import type { Meta, StoryObj } from '@storybook/react'
import { DinoStartScreen } from './DinoStartScreen'
import { DinosaurTypeEnum } from './utils'
import { dinos } from '@/data/siteData'

const meta = {
    title: 'Game/DinoStartScreen',
    component: DinoStartScreen,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        id: { control: 'select', options: Object.values(DinosaurTypeEnum) },
        name: { control: 'text' },
        image: { control: 'text' },
        description: { control: 'text' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DinoStartScreen>

export default meta
type Story = StoryObj<typeof meta>

export const Agujaceratops: Story = {
    args: {
        ...dinos.find((dino) => dino.id === DinosaurTypeEnum.Aguja)!,
        description:
            'You are an adult Agujaceratops, and you are currently without a herd. You will need to find food and choose how to interact with other animals all by yourself!',
    },
}

export const Kritosaurus: Story = {
    args: {
        ...dinos.find((dino) => dino.id === DinosaurTypeEnum.Krito)!,
        description:
            'You are an adult Kritosaurus, living with your herd. You will need to find food and protect your herd from predators.',
    },
}

export const Tyrannosaurus: Story = {
    args: {
        ...dinos.find((dino) => dino.id === DinosaurTypeEnum.Tyranno)!,
        description:
            'You are a young Tyrannosaurus learning to hunt. You will need to find prey and establish your territory.',
    },
}

export const Mosasaurus: Story = {
    args: {
        ...dinos.find((dino) => dino.id === DinosaurTypeEnum.Mosa)!,
        description:
            'You are a Mosasaurus, ruler of the ancient seas. You will need to hunt and defend your underwater domain.',
    },
}

export const Protohadros: Story = {
    args: {
        ...dinos.find((dino) => dino.id === DinosaurTypeEnum.Protos)!,
        description:
            'You are a Protohadros living in a coastal environment. You will need to find food and avoid dangerous predators.',
    },
}
