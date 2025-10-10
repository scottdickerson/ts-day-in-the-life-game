import { FinalDinosaurState } from './FinalScreen'

export const determineDinoFinalState = (reaction: string = '') => {
    if (['Dead with Injury', 'dead'].includes(reaction)) {
        return FinalDinosaurState.DEAD
    } else if (['neutral', 'injured', 'afraid'].includes(reaction)) {
        return FinalDinosaurState.NEUTRAL
    } else {
        return FinalDinosaurState.GOOD
    }
}

export const determineDinoImage = (
    dinoId: DinosaurTypeEnum,
    reaction: string = 'neutral',
    isFinal?: boolean
) => {
    let formattedReaction = reaction
    switch (reaction.toLowerCase()) {
        case 'afraid':
            formattedReaction = 'afraid'
            break
        case 'dead':
            formattedReaction = 'dead'
            break
        case 'dead with injury':
            formattedReaction = 'deadwInjury'
            break
        case 'flirty':
            formattedReaction = 'flirty'
            break
        case 'happy':
            formattedReaction = 'happy'
            break
        case 'injured':
            formattedReaction = 'injured'
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
