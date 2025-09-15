import React from 'react'

interface DinosaurOnGameScreenProps {
    dinosaurType: keyof typeof reactionMap
    reactionLabel: string
}

const reactionMap: Record<string, Record<string, string>> = {
    Aguja: {
        neutral: '/AgujaReactions/aguja_neutral.png',
        happy: '/AgujaReactions/aguja_happy.png',
        afraid: '/AgujaReactions/aguja_afraid.png',
        injured: '/AgujaReactions/aguja_injured.png',
        flirty: '/AgujaReactions/aguja_flirty.png',
        dead: '/AgujaReactions/aguja_dead.png',
        'Dead with Injury': '/AgujaReactions/aguja_deadwinjury.png',
    },
    Krito: {
        neutral: '/KritoReactions/krito_neutral.png',
        happy: '/KritoReactions/krito_happy.png',
        afraid: '/KritoReactions/krito_afraid.png',
        injured: '/KritoReactions/krito_injured.png',
        flirty: '/KritoReactions/krito_flirty.png',
        dead: '/KritoReactions/krito_dead.png',
        'Dead with Injury': '/KritoReactions/krito_deadwinjury.png',
    },
    Mosa: {
        neutral: '/MosaReactions/mosa_neutral.png',
        happy: '/MosaReactions/mosa_happy.png',
        afraid: '/MosaReactions/mosa_afraid.png',
        injured: '/MosaReactions/mosa_injured.png',
        flirty: '/MosaReactions/mosa_flirty.png',
        dead: '/MosaReactions/mosa_dead.png',
        'Dead with Injury': '/MosaReactions/mosa_deadwinjury.png',
    },
    Protos: {
        neutral: '/ProtosReactions/protos_neutral.png',
        happy: '/ProtosReactions/protos_happy.png',
        afraid: '/ProtosReactions/protos_afraid.png',
        injured: '/ProtosReactions/protos_injured.png',
        flirty: '/ProtosReactions/protos_flirty.png',
        dead: '/ProtosReactions/protos_dead.png',
        'Dead with Injury': '/ProtosReactions/protos_deadwinjury.png',
    },
    Tyranno: {
        neutral: '/TyrannoReactions/tyranno_neutral.png',
        happy: '/TyrannoReactions/tyranno_happy.png',
        afraid: '/TyrannoReactions/tyranno_afraid.png',
        injured: '/TyrannoReactions/tyranno_injured.png',
        flirty: '/TyrannoReactions/tyranno_flirty.png',
        dead: '/TyrannoReactions/tyranno_dead.png',
        'Dead with Injury': '/TyrannoReactions/tyranno_deadwinjury.png',
    },
}

/**
 *
 * This component renders the dinosaur picture
 */
const DinosaurOnGameScreen: React.FC<DinosaurOnGameScreenProps> = ({
    dinosaurType,
    reactionLabel,
}) => {
    const src =
        (reactionMap[dinosaurType] &&
            reactionMap[dinosaurType][reactionLabel]) ??
        reactionMap[dinosaurType]?.neutral
    return (
        <img
            src={src}
            alt={reactionLabel}
            className=""
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '35%',
                zIndex: 2,
            }}
        />
    )
}

export default DinosaurOnGameScreen
