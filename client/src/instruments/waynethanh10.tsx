import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface BanjoNoteProps{
    string: number; // 1-5: G, D, G, B, D
    fret: number;
    duration?: string;
    synth?: Tone.Synth;
    setSynth?: (synth: Tone.Synth) => void;
}

type note = {
    key: string,
    octave: number,
    isSharp: boolean
}

export function BanjoKey({
    string,
    fret,
    synth,
}: BanjoNoteProps): JSX.Element{
    const notes = [
        ['G','D','G','B','D'],
        ['G','D#','Ab','C','D'],
        ['G','E','A','C#','E'],
        ['G','F','Bb','D','F'],
        ['G','F#','B','D#','F#'],
        ['G','G','C','E','G'],
        ['Ab','Ab','C#','F','Ab']
    ]
    const key = notes[string][fret]
    const width = 100/5
    const height = 100/6
    const top1 = height * (5-string)
    const left1 = width * fret
    return(
        <div
            className='banjoKey'
            key={`${key}`}
            onMouseDown={()=>synth?.triggerAttack(`${key}`)}
            onMouseUp={()=> synth?.triggerRelease('+0.25')}
            style ={{
                top: `${top1}`,
                width: `${width}`,
                height: `${height}`,
                left: `${left1}`,
                border: '1px solid black',
                boxSizing: 'border-box',
                padding: 2,
                position: 'relative',
            }}
        >{`${key}`}
        </div>
    );
}

function BanjoType({ title, onClick, active }: any): JSX.Element {
    return (
      <div
        onClick={onClick}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
          'b--black black': active,
          'gray b--light-gray': !active,
        })}
      >
        {title}
      </div>
    );
  }

function Banjo({synth, setSynth}: InstrumentProps): JSX.Element {

    const setOscillator = (newType: Tone.ToneOscillatorType)=>{
        setSynth(oldSynth => {
            oldSynth.disconnect();
            return new Tone.Synth({
                oscillator: {type: newType} as Tone.OmniOscillatorOptions,
            }).toDestination();
        });
    };

    const oscillators: List<OscillatorType> = List([
        'sine',
        'sawtooth',
        'square',
        'triangle',
        'fmsine',
        'fmsawtooth',
        'fmtriangle',
        'amsine',
        'amsawtooth',
        'amtriangle',
      ]) as List<OscillatorType>;

      return (
        <div className="pv4">
            <div className="BanjoGrid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(5, 1fr',
                    gridTemplateRows: 'repeat(6, 1fr',
                    width: '80%',
                    height: '20vh',
                    margin: 'auto',
                    border: '1px solid black',
                    boxSizing: 'border-box',
                    padding: 2,
                }}
            >
                {Range(0,6).map((s) => 
                    Range(0,5).map((f) => {
                        return (
                        <BanjoKey
                            string={s}
                            fret={f}
                            synth={synth}
                        />
                        );
                    })
                )}
                
            </div>
            <div className={'pl4 pt4 flex'}>
                {oscillators.map(o => (
                <BanjoType
                    key={o}
                    title={o}
                    onClick={() => setOscillator(o)}
                    active={synth?.oscillator.type === o}
                />
                ))}
            </div>
        </div>
      )
                }       
      export const BanjoInstrument = new Instrument('Banjo', Banjo);