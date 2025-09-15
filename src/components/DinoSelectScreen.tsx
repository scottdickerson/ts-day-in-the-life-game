// Figma-inspired DinoSelectScreen (node 3-675)
import { dinos } from '@/data/siteData'
import React from 'react'

/**
 *
 * Users choose their cretaceous creature on this screen
 */
export const DinoSelectScreen: React.FC = () => (
    <div className="relative w-screen h-screen flex flex-col bg-radial-dino-select">
        <div className="text-center mb-8 mt-24">
            <h1 className="text-[60px] font-archivo font-bold text-[#F5F5F5] mb-4 drop-shadow-lg">
                Choose a Cretaceous creature
            </h1>
        </div>
        <div className="flex flex-wrap gap-12 gap-y-0 justify-center items-center">
            {dinos.map((dino) => (
                <a
                    key={dino.id}
                    href={`/${dino.id.toLowerCase()}.welcome`}
                    className="flex flex-col items-center hover:scale-105 transition cursor-pointer no-underline"
                >
                    <img
                        src={dino.image}
                        alt={dino.name}
                        className="w-[550px] object-contain drop-shadow-xl"
                        draggable={false}
                    />
                    <span className="text-[35px] font-archivo font-semibold text-[#F5F5F5] tracking-wide drop-shadow italic">
                        {dino.name}
                    </span>
                </a>
            ))}
        </div>
        {/* Optionally add a background image or illustration here */}
    </div>
)
