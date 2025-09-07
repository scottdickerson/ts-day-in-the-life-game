import React from 'react'

interface DinoStartScreenProps {
    dinosaurType: 'Aguja' | 'Krito' | 'Mosa' | 'Protos' | 'Tyranno'
    onStart: () => void
    onChooseNew: () => void
}

const dinoConfig = {
    Aguja: {
        dinoName: 'Agujaceratops',
        dinoNameItalic: 'Agujaceratops',
        introText:
            'You are an adult, and you are currently without a herd. You will need to find food and choose how to interact with other animals all by yourself!',
        dinoImage: '/SelectScreenAssets/Aguja.png',
        bgBlur: '/SelectScreenAssets/aguja_bg_blur.png',
        bgOverlay: '/SelectScreenAssets/aguja_bg_overlay.png',
        ellipse12: '/SelectScreenAssets/ellipse12.svg',
        ellipse13: '/SelectScreenAssets/ellipse13.svg',
    },
    Krito: {
        dinoName: 'Kritosaurus',
        dinoNameItalic: 'Kritosaurus',
        introText:
            'You are a young Kritosaurus living in a herd. Even though you are not as big as some of the older adults in the herd, this is your first year looking for a mate.',
        dinoImage: '/SelectScreenAssets/Krito.png',
        bgBlur: '/SelectScreenAssets/krito_bg_blur.png',
        bgOverlay: '/SelectScreenAssets/krito_bg_overlay.png',
        ellipse12: '/SelectScreenAssets/ellipse12.svg',
        ellipse13: '/SelectScreenAssets/ellipse13.svg',
    },
    Mosa: {
        dinoName: 'Mosasaurus',
        dinoNameItalic: 'Mosasaurus',
        introText:
            'You are a Mosasaurus whose territory is near a dormant undersea volcano. You need lots of food to sustain yourself, so you better get to it!',
        dinoImage: '/SelectScreenAssets/Mosa.png',
        bgBlur: '/SelectScreenAssets/mosa_bg_blur.png',
        bgOverlay: '/SelectScreenAssets/mosa_bg_overlay.png',
        ellipse12: '/SelectScreenAssets/ellipse12.svg',
        ellipse13: '/SelectScreenAssets/ellipse13.svg',
    },
    Protos: {
        dinoName: 'Protohadros',
        dinoNameItalic: 'Protohadros',
        introText:
            'You are a mature Protostega, measuring 8 feet long from nose to tail.',
        dinoImage: '/SelectScreenAssets/protos.png',
        bgBlur: '/SelectScreenAssets/protos_bg_blur.png',
        bgOverlay: '/SelectScreenAssets/protos_bg_overlay.png',
        ellipse12: '/SelectScreenAssets/ellipse12.svg',
        ellipse13: '/SelectScreenAssets/ellipse13.svg',
    },
    Tyranno: {
        dinoName: 'Tyrannosaurus',
        dinoNameItalic: 'Tyrannosaurus',
        introText:
            'You are a parent Tyrannosaurus. Your nest is in a secluded spot within walking distance of the river. Your eggs will hatch soon, so you need to find food for yourself and your offspring.',
        dinoImage: '/SelectScreenAssets/Tyranno.png',
        bgBlur: '/SelectScreenAssets/tyranno_bg_blur.png',
        bgOverlay: '/SelectScreenAssets/tyranno_bg_overlay.png',
        ellipse12: '/SelectScreenAssets/ellipse12.svg',
        ellipse13: '/SelectScreenAssets/ellipse13.svg',
    },
}

export const DinoStartScreen: React.FC<DinoStartScreenProps> = ({
    dinosaurType,
    onStart,
    onChooseNew,
}) => {
    const config = dinoConfig[dinosaurType]
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-white">
            {/* Blurred background */}
            <div
                className="absolute left-[-171px] top-0 w-[2262px] h-[1276px] bg-cover bg-center blur-[46px] z-0"
                style={{ backgroundImage: `url('${config.bgBlur}')` }}
            />
            {/* Overlay */}
            <div
                className="absolute left-[-46px] top-0 w-[2012px] h-[1248px] bg-cover bg-center opacity-70 z-1"
                style={{ backgroundImage: `url('${config.bgOverlay}')` }}
            />
            {/* Title */}
            <div className="absolute left-40 top-[268px] w-[641px] h-[198px] text-[#2a5433] font-archivo font-medium text-[75px] text-left z-2">
                <p className="m-0 leading-normal">You are a</p>
                <p className="inline italic text-[#2a5433]">
                    {config.dinoNameItalic || config.dinoName}
                </p>
                <span>!</span>
            </div>
            {/* Intro text */}
            <div className="absolute left-40 top-[462px] w-[601px] h-[195px] text-[#2a5433] font-archivo font-medium text-[33px] text-left z-2">
                <p className="leading-[45px]">{config.introText}</p>
            </div>
            {/* Start Button */}
            <div className="absolute left-40 top-[715px] z-3">
                <button
                    className="bg-[#4093e6] text-white rounded-[100px] w-[410px] h-[100px] font-archivo font-medium text-[35px] cursor-pointer shadow-lg hover:bg-[#2563eb] transition"
                    onClick={onStart}
                >
                    Start
                </button>
            </div>
            {/* Choose new animal Button */}
            <div className="absolute left-40 top-[844px] z-3">
                <button
                    className="bg-[#19528b] text-white rounded-[100px] w-[410px] h-[66px] font-archivo font-medium text-[25px] cursor-pointer shadow hover:bg-[#113a5c] transition"
                    onClick={onChooseNew}
                >
                    Choose a new animal
                </button>
            </div>
            {/* Ellipses and overlays */}
            <div className="absolute left-[960px] top-[664px] w-[718px] h-[123px] z-2">
                <img src={config.ellipse12} alt="" className="w-full h-full" />
            </div>
            <div className="absolute left-[1063.71px] top-[706.389px] w-[518.556px] h-[63.584px] z-2 mix-blend-multiply">
                <img src={config.ellipse13} alt="" className="w-full h-full" />
            </div>
            {/* Dinosaur image */}
            <div
                className="absolute left-[920px] top-[252px] w-[903px] h-[495px] bg-cover bg-center z-3"
                style={{ backgroundImage: `url('${config.dinoImage}')` }}
            />
        </div>
    )
}
