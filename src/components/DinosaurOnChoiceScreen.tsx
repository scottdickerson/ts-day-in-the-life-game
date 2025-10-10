import React from 'react'
import {
    determineDinoImage,
    DinosaurReaction,
    type DinosaurTypeEnum,
} from './utils'

interface DinosaurOnGameScreenProps {
    dinosaurType: DinosaurTypeEnum
    reactionLabel: DinosaurReaction
}

const wigglingAnimation =
    'animate-wiggle animate-once animate-duration-[3000ms] animate-ease-linear animate-normal animate-fill-forwards'
const nervousAnimation =
    'animate-shake animate-once animate-duration-[3000ms] animate-ease-linear animate-normal animate-fill-forwards'
const deadAnimation =
    'animate-once animate-duration-1000 animate-ease-out animate-normal'

const REACTION_ANIMATIONS: Record<DinosaurReaction, string> = {
    [DinosaurReaction.HAPPY]: wigglingAnimation,
    [DinosaurReaction.INJURED]: nervousAnimation,
    [DinosaurReaction.AFRAID]: nervousAnimation,
    [DinosaurReaction.FLIRTACIOUS]: wigglingAnimation,
    [DinosaurReaction.FLIRTY]: wigglingAnimation,
    [DinosaurReaction.EATING]: wigglingAnimation,
    [DinosaurReaction.DEAD]: deadAnimation,
    [DinosaurReaction.DEAD_WITH_INJURY]: deadAnimation,
    [DinosaurReaction.NEUTRAL]: '',
    [DinosaurReaction.EMPTY]: '',
    [DinosaurReaction.DASH]: '',
}

/**
 *
 * This component renders the dinosaur picture
 */
const DinosaurOnGameScreen: React.FC<DinosaurOnGameScreenProps> = ({
    dinosaurType,
    reactionLabel,
}) => {
    const src = determineDinoImage(dinosaurType, reactionLabel)
    return (
        <img
            src={src}
            key={reactionLabel} // this is to restart the animation when the reaction changes
            alt={reactionLabel}
            className={REACTION_ANIMATIONS[reactionLabel]}
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
