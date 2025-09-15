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

export const determineDinoFinalImage = (
    dinoId: string,
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
        case 'happy':
            formattedReaction = 'happy'
            break
        case 'injured':
            formattedReaction = 'injured'
            break
        default:
            formattedReaction = 'neutral'
    }
    return `${dinoId}Reactions/${dinoId.toLowerCase()}_${formattedReaction}.png`
}
