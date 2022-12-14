import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

function VideosPanel() {
  return (
    <>
      <div style={{ padding: '1rem 1.5rem' }}>
        <InputGroup className='AtSearchInput'>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input style={{ background: '#fff' }} type="tel" placeholder="Search videos" />
        </InputGroup>
      </div>
    </>
  )
}
export default VideosPanel
