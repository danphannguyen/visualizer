import scene from '../../webgl/Scene'
import s from './Picker.module.scss'
import { useState } from 'react'

const VISUALIZERS = [
  {
    name: 'Cover',
    index: 0
  },
  {
    name: 'Line',
    index: 1
  },
  {
    name: 'Board',
    index: 2
  },
  {
    name: 'Logo IUT',
    index: 3
  },
  {
    name: 'Bubble',
    index: 4
  },
]
const Picker = () => {
  const [current, setCurrent] = useState(0)
  const pickerVisualizer = index => {
    setCurrent(index)
    scene.pickerVisualizer(index)
  }
  return (
    <div className={s.picker}>
      {VISUALIZERS.map((visualizer, i) => (
        <span
          key={visualizer.name}
          className={`${current === visualizer.index ? s.current : ''}`}
          onClick={() => {
            pickerVisualizer(visualizer.index)
          }}>
          {visualizer.name}
        </span>
      ))}
    </div>
  )
}

export default Picker
