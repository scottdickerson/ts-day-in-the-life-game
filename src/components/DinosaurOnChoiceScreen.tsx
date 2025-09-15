import React from 'react'
import { determineDinoImage, type DinosaurTypeEnum } from './utils'

interface DinosaurOnGameScreenProps {
    dinosaurType: DinosaurTypeEnum
    reactionLabel: string
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
