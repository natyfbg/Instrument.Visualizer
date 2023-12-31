// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const BarformVisualizer = new Visualizer(
  'BarForm',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    // p5.noFill();

    const values = analyzer.getValue();
    
    const barWidth = width/values.length;
    for(let i=0; i<values.length; i++){
        const amplitude = values[i] as number

        p5.colorMode(p5.HSB, 255);
        const hue = (p5.frameCount*3)%255
        p5.stroke(hue, 255, 255, 255)

        const x = p5.map(i,0, values.length-1, 0, width)
        const y = height - amplitude*height
        p5.rect(x,y,barWidth,amplitude*height*2)
    }
  },
);
