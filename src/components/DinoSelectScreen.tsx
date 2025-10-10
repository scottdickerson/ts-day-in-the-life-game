// Figma-inspired DinoSelectScreen (node 3-675)
import React from 'react'
import { DinoGrid } from './DinoGrid'

/**
 *
 * Users choose their cretaceous creature on this screen
 */
export const DinoSelectScreen: React.FC = () => (
    <div className="w-screen h-screen flex flex-col bg-radial-dino-select">
        <div className="text-center mb-8 mt-16">
            <h1 className="text-[65px] font-archivo font-bold text-[#F5F5F5] mb-4 drop-shadow-lg">
                Choose a Creature
            </h1>
        </div>
        <DinoGrid />
    </div>
)
