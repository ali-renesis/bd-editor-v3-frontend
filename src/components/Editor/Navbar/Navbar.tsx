import './Navbar.scss'
import { DownloadIcon, LogoIcon, GithubIcon } from './NavbarIcons'
import { useCoreHandler } from '@/components/Canvas/handlers'
import { useCanvasContext } from '@components/Canvas/hooks'
import Button from '@/components/common/button/Button'
import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal } from '@chakra-ui/react'

function Navbar() {
  const {  exportPng } = useCoreHandler()
  const { canvas } = useCanvasContext()

  const download = () => {
    let img = exportPng()
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'editorImage.png');
    downloadLink.setAttribute('href', img);
    downloadLink.click();
    // let json = exportJSON()
    // console.log("json:-=-=", json)
  }

  const downloadPdf = () => {
    let img = exportPng()
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'editorImage.png');
    downloadLink.setAttribute('href', img);
    downloadLink.click();
    // let json = exportJSON()
    // console.log("json:-=-=", json)
  }
  return (
    <div className="navbar">
      <div className="navbar-left">
        {/* <LogoIcon /> */}
        <div className="AtBack AtFlexCenter">
          <i className='icon-arrow-left'></i>
          <h4>Back</h4>
        </div>
        <ul className='AtTopTools'>
          <li>
            <Button disabled>
              <i className='icon-undo AtFs16'></i>
            </Button>
          </li>
          <li>
            <Button>
              <i className='icon-redo AtFs16'></i>
            </Button>
          </li>
          <li className='AtLine'>
            <Button>
              <i className='icon-saved AtFs24'></i>
            </Button>
          </li>
        </ul>
      </div>
      <div className="navbar-action-items">
        {/* <a href="https://github.com/xorb/react-design-editor">
          <GithubIcon />
        </a> */}
        <DownloadIcon onClick={download} />

      </div>
    </div>
  )
}

export default Navbar
