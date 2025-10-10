import type { Meta, StoryObj } from '@storybook/react'
import { SelectIndividualDinosaur } from './SelectIndividualDinosaur'
import { dinos } from '@/data/siteData'

const meta: Meta<typeof SelectIndividualDinosaur> = {
    title: 'Components/SelectIndividualDinosaur',
    component: SelectIndividualDinosaur,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        height: {
            control: 'number',
            description: 'Height of the dinosaur image container',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes for the container',
        },
        showName: {
            control: 'boolean',
            description: 'Whether to show the dinosaur name',
        },
    },
}

export default meta
type Story = StoryObj<typeof meta>

// Get dinosaur data from siteData
const [aguja, krito, tyranno, mosa, protos] = dinos

export const SelectScreenStyle: Story = {
    args: {
        ...aguja,
        height: 356,
        showName: true,
    },
    decorators: [
        (Story) => (
            <div className="bg-gradient-radial from-[#4a9eff] to-[#1e40af] p-8 min-h-[500px] flex items-center justify-center">
                <Story />
            </div>
        ),
    ],
}

export const StartScreenStyle: Story = {
    args: {
        ...aguja,
        height: 750,
        className: 'w-[948px] z-20',
        showName: false,
    },
    decorators: [
        (Story) => (
            <div
                className="relative w-full h-[600px] bg-center bg-cover flex items-center justify-center"
                style={{
                    backgroundImage: `url(/DinoWelcomeAssets/dino-welcome-background.png)`,
                }}
            >
                <Story />
            </div>
        ),
    ],
}

export const DinosaurSelector: Story = {
    args: {
        selectedDinosaur: aguja.name,
    },
    argTypes: {
        // Only show the dinosaur selector control
        selectedDinosaur: {
            control: 'select',
            options: dinos.map((dino) => dino.name),
            description: 'Select a dinosaur to display',
        },
        // Hide all the normal component properties
        height: { table: { disable: true } },
        className: { table: { disable: true } },
        showName: { table: { disable: true } },
        id: { table: { disable: true } },
        name: { table: { disable: true } },
        image: { table: { disable: true } },
        description: { table: { disable: true } },
    },
    render: (args) => {
        // Find the selected dinosaur data based on the selectedDinosaur control
        const selectedDinoName = args.selectedDinosaur || aguja.name
        const selectedDino =
            dinos.find((dino) => dino.name === selectedDinoName) || aguja

        return (
            <div className="bg-gradient-radial from-[#4a9eff] to-[#1e40af] p-8 min-h-[500px] flex items-center justify-center">
                <SelectIndividualDinosaur
                    {...selectedDino}
                    height={400}
                    showName={true}
                />
            </div>
        )
    },
}
