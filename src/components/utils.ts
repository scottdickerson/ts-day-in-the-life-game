import { FinalDinosaurState } from './FinalScreen'

export enum DinosaurReaction {
    HAPPY = 'happy',
    NEUTRAL = 'neutral',
    AFRAID = 'afraid',
    INJURED = 'injured',
    DEAD = 'dead',
    DEAD_WITH_INJURY = 'Dead with Injury',
    FLIRTY = 'flirty',
    FLIRTACIOUS = 'flirtacious',
    EATING = 'eating',
    EMPTY = '',
    DASH = '-',
}

export const determineDinoFinalState = (reaction: string = '') => {
    if (
        [DinosaurReaction.DEAD_WITH_INJURY, DinosaurReaction.DEAD].includes(
            reaction as DinosaurReaction
        )
    ) {
        return FinalDinosaurState.DEAD
    } else if (
        [
            DinosaurReaction.NEUTRAL,
            DinosaurReaction.INJURED,
            DinosaurReaction.AFRAID,
        ].includes(reaction as DinosaurReaction)
    ) {
        return FinalDinosaurState.NEUTRAL
    } else {
        return FinalDinosaurState.GOOD
    }
}

export const determineDinoImage = (
    dinoId: DinosaurTypeEnum,
    reaction: string = DinosaurReaction.NEUTRAL,
    isFinal?: boolean
) => {
    let formattedReaction = reaction
    switch (reaction.toLowerCase()) {
        case DinosaurReaction.AFRAID.toLowerCase():
            formattedReaction = 'afraid'
            break
        case DinosaurReaction.DEAD.toLowerCase():
            formattedReaction = 'dead'
            break
        case DinosaurReaction.DEAD_WITH_INJURY.toLowerCase():
            formattedReaction = 'deadwInjury'
            break
        case DinosaurReaction.FLIRTY.toLowerCase():
        case DinosaurReaction.FLIRTACIOUS.toLowerCase():
            formattedReaction = 'flirty'
            break
        case DinosaurReaction.HAPPY.toLowerCase():
            formattedReaction = 'happy'
            break
        case DinosaurReaction.INJURED.toLowerCase():
            formattedReaction = 'injured'
            break
        case DinosaurReaction.EATING.toLowerCase():
            // TODO: need picture for eating
            formattedReaction = 'neutral'
            break
        default:
            formattedReaction = 'neutral'
    }
    return `${dinoId}${isFinal ? 'Final' : ''}Reactions/${dinoId.toString().toLowerCase()}${isFinal ? '_FinalReaction' : ''}_${formattedReaction}.${isFinal ? 'webp' : 'png'}`
}

export enum DinosaurTypeEnum {
    'Aguja' = 'Aguja',
    'Krito' = 'Krito',
    'Mosa' = 'Mosa',
    'Protos' = 'Protos',
    'Tyranno' = 'Tyranno',
}
