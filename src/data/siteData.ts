import { DinosaurTypeEnum } from '@/components/utils'

export interface DinoOverview {
    id: DinosaurTypeEnum
    name: string
    image: string
    description: string
}

export const dinos: DinoOverview[] = [
    {
        id: DinosaurTypeEnum.Aguja,
        name: 'Agujaceratops',
        image: '/SelectedIndividualScreenAssets/SelectedIndividualScreenAssets-Aguja.webp',
        description:
            'You are an adult Agujaceratops and you are currently without a herd. You will need to find food and choose how to interact with other animals all by yourself!',
    },
    {
        id: DinosaurTypeEnum.Krito,
        name: 'Kritosaurus',
        image: '/SelectedIndividualScreenAssets/SelectedIndividualScreenAssets-Krito.webp',
        description:
            'You are a young Kritosaurus living in a herd. Even though you are not as big as some of the older adults in the herd, this is your first year looking for a mate.',
    },
    {
        id: DinosaurTypeEnum.Tyranno,
        name: 'Tyrannosaurus',
        image: '/SelectedIndividualScreenAssets/SelectedIndividualScreenAssets-Tyranno.webp',
        description:
            'You are a parent Tyrannosaurus. Your nest is in a secluded spot within walking distance of the river. Your eggs will hatch soon, so you need to find food for yourself and your offspring',
    },
    {
        id: DinosaurTypeEnum.Mosa,
        name: 'Mosasaurus',
        image: '/SelectedIndividualScreenAssets/SelectedIndividualScreenAssets-Mosa.webp',
        description:
            'You are a Mosasaurus whose territory is near a dormant undersea volcano. You need lots of food to sustain yourself, so you better get to it!',
    },
    {
        id: DinosaurTypeEnum.Protos,
        name: 'Protostega',
        image: '/SelectedIndividualScreenAssets/SelectedIndividualScreenAssets-Proto.webp',
        description:
            'You are a mature Protostega, measuring 8 feet long from nose to tail.',
    },
]
