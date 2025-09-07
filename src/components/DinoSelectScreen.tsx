// Figma-inspired DinoSelectScreen (node 3-675)
import { dinos } from '@/data/siteData'
import React from 'react'

export const DinoSelectScreen: React.FC = () => (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf7e6] to-[#d2e6f7]">
        <div className="text-center mb-8">
            <h1 className="text-[80px] font-archivo font-bold text-[#2a5433] mb-4 drop-shadow-lg">
                Choose Your Dinosaur
            </h1>
            <p className="text-[32px] font-archivo text-[#19528b] mb-12">
                Select a dinosaur to begin your adventure!
            </p>
        </div>
        <div className="flex flex-wrap gap-12 justify-center items-center">
            {dinos.map((dino) => (
                <a
                    key={dino.id}
                    href={`/${dino.name.toLowerCase()}`}
                    className="flex flex-col items-center bg-white/90 rounded-3xl shadow-xl p-8 hover:scale-105 hover:bg-blue-50 transition cursor-pointer border-4 border-transparent hover:border-[#4093e6] focus:outline-none no-underline"
                    style={{ minWidth: 260, minHeight: 340 }}
                >
                    <img
                        src={dino.image}
                        alt={dino.name}
                        className="w-[220px] h-[220px] object-contain mb-6 drop-shadow-xl"
                        draggable={false}
                    />
                    <span className="text-[32px] font-archivo font-semibold text-[#19528b] tracking-wide drop-shadow">
                        {dino.name}
                    </span>
                </a>
            ))}
        </div>
        {/* Optionally add a background image or illustration here */}
    </div>
)
