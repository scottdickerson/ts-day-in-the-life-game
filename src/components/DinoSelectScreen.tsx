// Figma-inspired DinoSelectScreen (node 3-675)
import { dinos } from '@/data/siteData'
import React from 'react'
import { SelectIndividualDinosaur } from './SelectIndividualDinosaur'

/**
 *
 * Users choose their cretaceous creature on this screen
 */
export const DinoSelectScreen: React.FC = () => (
    <div className="relative w-screen h-screen flex flex-col bg-radial-dino-select">
        <div className="text-center mb-8 mt-16">
            <h1 className="text-[65px] font-archivo font-bold text-[#F5F5F5] mb-4 drop-shadow-lg">
                Choose a Creature
            </h1>
        </div>
        <div className="flex flex-wrap gap-[120px] gap-y-0 justify-center items-center px-[40px]">
            {dinos.map((dino, index) => (
                <a
                    key={dino.id}
                    href={`/${dino.id.toLowerCase()}.welcome`}
                    className={`${index >= 3 ? '-translate-y-20' : '-translate-y-10'} hover:scale-105 transition cursor-pointer no-underline relative`}
                >
                    <SelectIndividualDinosaur {...dino} />
                </a>
            ))}
        </div>
        {/* Optionally add a background image or illustration here */}
    </div>
)
