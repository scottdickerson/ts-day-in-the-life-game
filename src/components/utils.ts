import { FinalDinosaurState } from './FinalScreen'

export const determineDinoFinalState = (reaction: string = '') => {
    if (['Dead with Injury', 'dead'].includes(reaction)) {
        return FinalDinosaurState.BAD
    } else if (['neutral', 'injured'].includes(reaction)) {
        return FinalDinosaurState.NEUTRAL
    } else {
        return FinalDinosaurState.GOOD
    }
}

export const determineDinoImage = (
    dinoId: DinosaurTypeEnum,
    reaction: string = 'neutral'
) => {
    let formattedReaction = reaction
    switch (reaction.toLowerCase()) {
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
    return `${dinoId}Reactions/${dinoId.toString().toLowerCase()}_${formattedReaction}.png`
}

export enum DinosaurTypeEnum {
    'Aguja' = 'Aguja',
    'Krito' = 'Krito',
    'Mosa' = 'Mosa',
    'Protos' = 'Protos',
    'Tyranno' = 'Tyranno',
}
