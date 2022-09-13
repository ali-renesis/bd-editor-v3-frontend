import { useCanvasContext } from '@/components/Canvas/hooks'
import DefaultToolbox from './DefaultToolbox/DefaultToolbox'
import ElementToolbox from './ElementToolbox/ElementToolbox'
import TextToolbox from './TextToolbox/TextToolbox'

import './Toolbox.scss'

function Toolbox() {
  const { activeObject } = useCanvasContext()
  if (!activeObject) {
    return <DefaultToolbox />
  }
  const activeObjectType = activeObject.type
  console.log("activeObjectType:-=-=", activeObjectType)

  const renderBox = () => {
    if (activeObjectType === 'textbox') {
      return <TextToolbox />
    }
  }

  return (



    activeObjectType ?
      <div className="editor-toolbox-container">
        <div className={`editor-toolbox text`}>
          <ElementToolbox />
        </div>
      </div>
      :

      <DefaultToolbox />

  )
}

export default Toolbox
