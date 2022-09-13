import Button from '@/components/common/button/Button'
import './FooterMenu.scss'
import { useCanvasContext } from '@components/Canvas/hooks'

function FooterMenu() {
  const { setZoomRatio, zoomRatio, canvas, activeObject } = useCanvasContext()

  const onZoomIn = () => {
    //@ts-ignore
    canvas.zoomToPoint({ x: activeObject.e.offsetX, y: activeObject.e.offsetY }, zoomRatio)
    setZoomRatio(zoomRatio + 0.999)
  }

  const onZoomOut = () => {
    //@ts-ignore
    canvas.zoomToPoint({ x: activeObject.e.offsetX, y: activeObject.e.offsetY }, zoomRatio)
    setZoomRatio(zoomRatio - 0.999)
  }

  const onChange = (e: any) => {
      //@ts-ignore
      // canvas.zoomToPoint({ x: activeObject.e.offsetX, y: activeObject.e.offsetY }, e.target.value)
      // console.log(" activeObject.e",  activeObject.e)
    setZoomRatio(e.target.value)
  }
  return (
    <div className="AtFooterMenu">
      <div className="AtFooterContainer">
        <ul className='AtFooterTools'>
          {/* <li>
            <Button className='AtToolBtn' onClick={() => onZoomIn()}>
              <i className='icon-zoomin AtFs24'></i>
            </Button>
          </li>
          <li>
            <Button className='AtToolBtn' onClick={() => onZoomOut()}>
              <i className='icon-zoomout AtFs24'></i>
            </Button>
          </li> */}
          <li>
            <div className="slidecontainer">
              <input type="range" defaultValue={zoomRatio} min={0.1} max={2} step={0.1} className="AtInputRange" id="myRange" onChange={onChange} />
            </div>
          </li>
          <li>
            <Button className='AtFlexCenter AtToolBtn AtPercent'>
              <h4 className=''>{Number(zoomRatio * 100).toFixed(2)}%</h4>
              {/* <i className='icon-arrow AtFs6 AtMl5'></i> */}
            </Button>
          </li>
          <li>
            <Button className='AtToolBtn' >
              <i className='icon-scale AtFs24'></i>
            </Button>
          </li>
          <li>
            <Button className='AtToolBtn' >
              <i className='icon-grid AtFs24'></i>
            </Button>
          </li>
        </ul>

        <ul className='AtFooterTools'>
          <li>
            <div className='AtFlexCenter'>
              <h4 className="AtTGrey">Qty:</h4>
              <input placeholder='00' className='AtInputQty' type="number" />
            </div>
          </li>
          <li>
            <div className='AtFooterPrice AtLine'>
              <h4 className="AtTGrey">Price:</h4>
              <h3 className='AtTPrimary AtMl10'>$00.00</h3>
            </div>
          </li>
          <li>
            <Button className='AtToolBtn AtLine' >
              <h4 className="AtTGrey">View Proof</h4>
            </Button>
          </li>
          <li>
            <Button className='AtBlueBtn ' >
              Next
            </Button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FooterMenu
