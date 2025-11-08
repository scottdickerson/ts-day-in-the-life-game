import React from 'react'
import { DinosaurTypeEnum } from './utils'

interface DinosaurSceneBackgroundProps {
    dinosaurType: DinosaurTypeEnum
    codeId: string
}

const sceneDirMap: Record<DinosaurTypeEnum, string> = {
    [DinosaurTypeEnum.Aguja]: '/AgujaScenes',
    [DinosaurTypeEnum.Krito]: '/KritoScenes',
    [DinosaurTypeEnum.Mosa]: '/MosaScenes',
    [DinosaurTypeEnum.Protos]: '/ProtosScenes',
    [DinosaurTypeEnum.Tyranno]: '/TyrannoScenes',
}

const DinosaurSceneBackground: React.FC<DinosaurSceneBackgroundProps> = ({
    dinosaurType,
    codeId,
}) => {
    const dir = sceneDirMap[dinosaurType] || '/AgujaScenes'
    const scenePath = `${dir}/${codeId}.webp`
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
        >
            {/* <div className="flex flex-col w-fit ">
                <span className="bg-black text-white p-1 rounded text-5xl">{`Scene Code: ${codeId}`}</span>
                <span className="bg-black text-white p-1 rounded text-5xl">{`Scene Background: ${scenePath}`}</span>
            </div> */}
        </div>
    )
}

export default DinosaurSceneBackground
