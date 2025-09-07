import React from 'react'

const DINOSAURS = [
    { name: 'Aguja', img: '/SelectScreenAssets/Aguja.png' },
    { name: 'Krito', img: '/SelectScreenAssets/Krito.png' },
    { name: 'Mosa', img: '/SelectScreenAssets/Mosa.png' },
    { name: 'Protos', img: '/SelectScreenAssets/protos.png' },
    { name: 'Tyranno', img: '/SelectScreenAssets/Tyranno.png' },
]

export const WelcomeScreen: React.FC = () => (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf7e6] to-[#d2e6f7]">
        <div className="text-center mb-8">
            <h1 className="text-[80px] font-archivo font-bold text-[#2a5433] mb-8 drop-shadow-lg">
                A Day in the Life
            </h1>
            <p className="text-[36px] font-archivo text-[#19528b] mb-12">
                Choose your dinosaur and experience their world!
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {DINOSAURS.map((dino) => (
                <a
                    key={dino.name}
                    href={`/dino/${dino.name}`}
                    className="flex flex-col items-center bg-white/80 rounded-3xl shadow-xl p-8 hover:scale-105 hover:bg-blue-50 transition cursor-pointer border-4 border-transparent hover:border-blue-300"
                    style={{ minWidth: 260, minHeight: 340 }}
                >
                    <img
                        src={dino.img}
                        alt={dino.name}
                        className="w-48 h-48 object-contain mb-6 drop-shadow-xl"
                        draggable={false}
                    />
                    <span className="text-[32px] font-archivo font-bold text-[#19528b] tracking-wide drop-shadow">
                        {dino.name}
                    </span>
                </a>
            ))}
        </div>
        {/* Optionally add a background image or illustration here */}
    </div>
)
