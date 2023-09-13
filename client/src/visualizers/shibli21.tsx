// 3rd party library imports
import P5 from "p5";
import * as Tone from "tone";

// project imports
import { Visualizer } from "../Visualizers";

export const ShibliVisualizer = new Visualizer("Shibli21", (p5: P5, analyzer: Tone.Analyser) => {
  const width = window.innerWidth;
  const height = window.innerHeight / 2;

  p5.background(0, 0, 0, 255);

  // Define an array of colors to use for the bars
  const colors = [
    p5.color(255, 0, 0),
    p5.color(255, 128, 0),
    p5.color(255, 255, 0),
    p5.color(0, 255, 0),
    p5.color(0, 128, 255),
    p5.color(128, 0, 255),
  ];

  // Calculate the bar width and spacing based on the number of bars
  const numBars = 128;
  const barWidth = width / numBars;
  const barSpacing = barWidth / 4;

  const values = analyzer.getValue();

  for (let i = 0; i < numBars; i++) {
    // Calculate the average amplitude of the frequency range for this bar
    const startIndex = Math.floor((values.length / numBars) * i);
    const endIndex = Math.floor((values.length / numBars) * (i + 1));
    //@ts-ignore
    const amplitude = values.slice(startIndex, endIndex).reduce((a, b) => a + b, 0) / (endIndex - startIndex);

    // Map the amplitude to a bar height
    const barHeight = p5.map(amplitude, 0, 1, 0, height);

    // Calculate the position of the bar
    const x = i * (barWidth + barSpacing) + barSpacing / 2;
    const y = height - barHeight;

    // Set the fill color based on the bar's position in the spectrum
    const colorIndex = Math.floor((i / numBars) * colors.length);
    p5.fill(colors[colorIndex]);

    // Draw the bar
    p5.rect(x, y, barWidth - barSpacing, barHeight);
  }
});