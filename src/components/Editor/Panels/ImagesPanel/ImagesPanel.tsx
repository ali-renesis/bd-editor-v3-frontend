import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useCoreHandler } from '@/components/Canvas/handlers'


function ImagesPanel() {
  const { addObject } = useCoreHandler()
  return (
    <>
      <div style={{ padding: '1rem 1.5rem' }}>
        <InputGroup className='AtSearchInput'>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input style={{ background: '#fff' }} type="tel" placeholder="Search images" />
        </InputGroup>
 
        <div className='AtGallery'> 
          <div className='AtFigHolder' onClick={() => addObject({ type: 'image', element: 'https://bd.infura-ipfs.io/ipfs/QmYzsQSdPtU6WPhxmrKaEniCSMVxpwEY8eGf6A1d8EA3K7' })}>
            <img src='https://bd.infura-ipfs.io/ipfs/QmduHSVrSqJHTwL1ACTSe4xNyNV1v95Z3k5ejhjWJemdRY' />
          </div>
          <div className='AtFigHolder' onClick={() => addObject({ type: 'image', element: 'https://bd.infura-ipfs.io/ipfs/QmYzsQSdPtU6WPhxmrKaEniCSMVxpwEY8eGf6A1d8EA3K7' })}>
            <img src='https://bd.infura-ipfs.io/ipfs/QmduHSVrSqJHTwL1ACTSe4xNyNV1v95Z3k5ejhjWJemdRY' />
          </div>
          <div className='AtFigHolder' onClick={() => addObject({ type: 'image', element: 'https://bd.infura-ipfs.io/ipfs/QmYzsQSdPtU6WPhxmrKaEniCSMVxpwEY8eGf6A1d8EA3K7' })}>
            <img src='https://bd.infura-ipfs.io/ipfs/QmduHSVrSqJHTwL1ACTSe4xNyNV1v95Z3k5ejhjWJemdRY' />
          </div>
        </div>
      </div>
    </>
  )
}
export default ImagesPanel
