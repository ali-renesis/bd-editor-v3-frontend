import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import Button from '@/components/common/button/Button'
import { ChangeEvent, useRef } from 'react'
import { useCoreHandler } from '@components/Canvas/handlers'

function TemplatesPanel() {

  const { ImportFromSVG } = useCoreHandler()
  const inputRef = useRef<any>(null)
  const onClickInput = () => {
    inputRef?.current?.click()
  }

  const onUploadTemplates = (e: ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files[0]
    if (file) {

      var url = URL.createObjectURL(file);
      ImportFromSVG(url)
    }
  }
  return (
    <>
      <div style={{ padding: '1rem 1.5rem' }}>
        <InputGroup className='AtSearchInput'>
          <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
          <Input style={{ background: '#fff' }} type="tel" placeholder="Search templates" />
        </InputGroup>

        <form>
          <Button className='AtUploadTempBtn'
            onClick={onClickInput}
          >Click to upload!</Button>
          <div className='AtUploadInput'>
            <input ref={inputRef} id="upfile" type="file" onChange={onUploadTemplates} />
          </div>
          <input type="submit" value='' />
        </form>
      </div>
    </>
  )
}
export default TemplatesPanel
