// Figma-inspired DinoSelectScreen (node 3-675)
import { dinos } from '@/data/siteData'
import React from 'react'

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
            {dinos.map((dino) => (
                <a
                    key={dino.id}
                    href={`/${dino.id.toLowerCase()}.welcome`}
                    className="flex flex-col items-center -translate-y-10 hover:scale-105 transition cursor-pointer no-underline relative "
                >
                    <img
                        src={dino.image}
                        alt={dino.name}
                        className="h-[356px] object-contain z-10"
                        draggable={false}
                    />
                    <img
                        src="SelectedIndividualScreenAssets/dropShadow.svg"
                        className="absolute -bottom-2 -left-2 -right-2 w-full"
                    />
                    <span className="pt-2 text-[45px] font-archivo font-semibold text-[#F5F5F5] tracking-wide drop-shadow italic">
                        {dino.name}
                    </span>
                </a>
            ))}
        </div>
        {/* Optionally add a background image or illustration here */}
    </div>
)
