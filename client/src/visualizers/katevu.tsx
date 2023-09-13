// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const UkuleleVisualizer = new Visualizer(
  'Triangle',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.005);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();
    
    const values = analyzer.getValue();

    const centerX1 = width/2
    const centerY1 = height/100
    const centerX2 = width/4
    const centerY2 = height/4
    const centerX3 = width/ 5
    const centerY3 = height/ (4/3)
    const numWaves = 4;
    const numPoints = values.length

    p5.beginShape();
    for(let j=0; j<numPoints; j++){
      for (let i = 0; i <= numWaves; i++) {
        const waveIndex = j+i*numPoints
        const amplitude = values[waveIndex] as number;
        const numWaves = 4;

        p5.colorMode(p5.HSB, 255);
        const hue = (p5.frameCount*3)%255
        p5.stroke(hue, 255, 255)
  
        const x1 = centerX1;
        const y1 = centerY1 + height / 2 + (amplitude * height);

        const x2 = centerX2 + Math.cos(i * (p5.TWO_PI / numWaves)) + amplitude;
        const y2 = centerY2 + amplitude;

        const x3 = centerX3 + amplitude;
        const y3 = centerY3 + amplitude * height;
        // Place vertex
        p5.triangle(x1, y1, x2, y2, x3, y3);
      }
    }
    p5.endShape();

  },
);
