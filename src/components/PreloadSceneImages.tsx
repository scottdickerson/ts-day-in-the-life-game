import React, { useEffect, useState } from 'react'
import { DinosaurTypeEnum } from './utils'

interface PreloadSceneImagesProps {
    dinosaurType: DinosaurTypeEnum
    gameDataUrl: string
}

const sceneDirMap: Record<DinosaurTypeEnum, string> = {
    [DinosaurTypeEnum.Aguja]: '/AgujaScenes',
    [DinosaurTypeEnum.Krito]: '/KritoScenes',
    [DinosaurTypeEnum.Mosa]: '/MosaScenes',
    [DinosaurTypeEnum.Protos]: '/ProtosScenes',
    [DinosaurTypeEnum.Tyranno]: '/TyrannoScenes',
}

/**
 * PreloadSceneImages component
 * Preloads all scene background images for a dinosaur type by:
 * 1. Fetching the game data JSON
 * 2. Extracting all unique Code IDs that have exported scenes
 * 3. Creating hidden link tags with rel="preload" for each scene image
 */
export const PreloadSceneImages: React.FC<PreloadSceneImagesProps> = ({
    dinosaurType,
    gameDataUrl,
}) => {
    const [sceneIds, setSceneIds] = useState<string[]>([])

    useEffect(() => {
        const loadSceneIds = async () => {
            try {
                const response = await fetch(gameDataUrl)
                const gameData = await response.json()

                // Extract all Code IDs where exported is TRUE or exportedForReview is TRUE
                const ids = gameData
                    .filter(
                        (node: any) =>
                            node.exported === 'TRUE' ||
                            node.exportedForReview === 'TRUE'
                    )
                    .map((node: any) => node['Code ID'])
                    .filter((id: string) => id && id !== '0') // Exclude welcome node

                setSceneIds(ids)
                console.log(
                    `🖼️  Preloading ${ids.length} scene images for ${dinosaurType}`
                )
            } catch (error) {
                console.error('Failed to load scene IDs for preloading:', error)
            }
        }

        loadSceneIds()
    }, [gameDataUrl, dinosaurType])

    const sceneDir = sceneDirMap[dinosaurType] || '/AgujaScenes'

    return (
        <>
            {sceneIds.map((codeId) => (
                <link
                    key={codeId}
                    rel="preload"
                    as="image"
                    href={`${sceneDir}/${codeId}.webp`}
                    type="image/webp"
                />
            ))}
        </>
    )
}
