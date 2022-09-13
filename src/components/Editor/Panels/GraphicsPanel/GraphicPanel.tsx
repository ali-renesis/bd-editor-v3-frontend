import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { SearchIcon } from '@chakra-ui/icons'
import { useCoreHandler } from '@/components/Canvas/handlers'
function GraphicItems() {
    const { addObject } = useCoreHandler()
    const elements = useSelector((state: any) => state.elements)

    const renderGraphics = (c: string) => {
        let array = elements.elements.filter((e: any) => e.category === c).slice(0, 5)
        return (
            array.map((vector: any, index: number) => (
                c === vector.category ?
                    <div key={index} onClick={() => addObject({ type: 'path', element: vector.url })} style={{ cursor: "pointer" }}>
                        <img

                            src={vector.url}
                            style={{
                                width: `64px`,
                                height: `64px`,
                                objectFit: "contain",
                                pointerEvents: "none",
                                verticalAlign: "middle",
                            }}
                        />
                    </div>
                    : null
            ))

        )
    }

    return (
        <>
            <div style={{ padding: '1rem 1.5rem' }}>
            <InputGroup className='AtSearchInput'>
                    <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
                    <Input style={{ background: '#fff' }} type="tel" placeholder="Search images" />
                </InputGroup>
                {elements.categories && elements.categories.length > 0 && elements.categories.map((c: string, index: number) => {
                    return (
                        <div key={index}>
                            <div className='AtFlex AtMt10'>
                                <p className='AtTitle'>{c}</p>
                                <p className='AtSee' style={{ cursor: "pointer" }} >See all</p>
                            </div>
                            <div className='AtFlex Atscroll' >
                                {renderGraphics(c)}
                            </div>
                        </div>
                    )
                })}

                {/* <div onClick={() => }>
                    <img src='https://bd.infura-ipfs.io/ipfs/QmduHSVrSqJHTwL1ACTSe4xNyNV1v95Z3k5ejhjWJemdRY' />
                </div> */}
            </div>
        </>
    )
}
export default GraphicItems
