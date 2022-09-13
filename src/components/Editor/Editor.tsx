import Navbar from '@components/Editor/Navbar/Navbar'
import Panels from '@components/Editor/Panels/Panels'
import FooterMenu from '@components/Editor/FooterMenu/FooterMenu'
import Toolbox from '@components/Editor/Toolbox/Toolbox'
import CanvasArea from '@components/Editor/CanvasArea/CanvasArea'
import './Editor.scss'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetAllElementsActions } from '@/store/slices/elements/action'

function Editor() {

  const dispatch = useDispatch()
  const getElements = async () => {
    await dispatch(GetAllElementsActions({}))
  }
  useEffect(() => {
    getElements()
  }, [])
  return (
    <div className="editor">
      <Navbar />
      <div className="section-two">
        <Panels />
        <div className="section-three">
          <Toolbox />
          <CanvasArea />
          <FooterMenu />
        </div>
      </div>
    </div>
  )
}

export default Editor
