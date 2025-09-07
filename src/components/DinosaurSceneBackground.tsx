import React from 'react'

interface DinosaurSceneBackgroundProps {
    dinosaurType: 'Aguja' | 'Krito' | 'Mosa' | 'Protos' | 'Tyranno'
    codeId: string
}

const sceneDirMap: Record<string, string> = {
    Aguja: '/AgujaScenes',
    Krito: '/KritoScenes',
    Mosa: '/MosaScenes',
    Protos: '/ProtosScenes',
    Tyranno: '/TyrannoScenes',
}

const DinosaurSceneBackground: React.FC<DinosaurSceneBackgroundProps> = ({
    dinosaurType,
    codeId,
}) => {
    const dir = sceneDirMap[dinosaurType] || '/AgujaScenes'
    const scenePath = `${dir}/${codeId}.png`
    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${scenePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0,
            }}
            aria-label="Scene background"
        />
    )
}

export default DinosaurSceneBackground
