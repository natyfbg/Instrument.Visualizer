// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const SquareVisualizer = new Visualizer(
    'Square',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth;
      const height = window.innerHeight / 2;
      const dim = Math.min(width, height);
  
      p5.background(0, 0, 0, 255);
  
      const values = analyzer.getValue();
  
      const numSides = 4;
      const sideLength = dim * 0.8;
      const centerX = width / 2;
      const centerY = height / 2;
  
      p5.strokeWeight(dim * 0.01);
      p5.stroke(255, 255, 255, 255);
      p5.noFill();
  
      p5.beginShape();
      for (let i = 0; i < numSides; i++) {
        const progress = i / numSides;
        const index = Math.floor(progress * values.length);
        const amplitude = values[index] as number;
        const angle = p5.TWO_PI * progress - p5.HALF_PI;
        const x = centerX + sideLength * p5.cos(angle) * amplitude;
        const y = centerY + sideLength * p5.sin(angle) * amplitude;
        p5.vertex(x, y);
      }
      p5.endShape(p5.CLOSE);
    },
  );