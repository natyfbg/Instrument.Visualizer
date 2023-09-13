import * as Tone from 'tone';
import {List, Range} from 'immutable';
import classNames from 'classnames';

import {Instrument, InstrumentProps} from '../Instruments';

interface UkuleleNoteProps{
    string: number;
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

export function UkuleleKey({
    string,
    fret,
    synth,
}: UkuleleNoteProps): JSX.Element{
    const notes = [
    ['G4','G#4','A4','A#4','B4'],
    ['C4','C#4','D4','D#4','E4'],
    ['E4','F4','F#4','G4','G#4'],
    ['A4','A#4','B4','C5','C#5']

    
    ]
    
    const key = notes[string][fret]
    const width = 100 /5
    const height = 100/6
    const topp = height * (4-string)
    const leftt = width * fret
  
    return (
        <div
            className='ukuleleKey'
            key={`${key}`}
            onMouseDown={()=>synth?.triggerAttack(`${key}`)}
            onMouseUp={()=> synth?.triggerRelease('+0.25')}
            style ={{
                top: `${topp}`,
                width: `${width}`,
                height: `${height}`,
                left: `${leftt}`,
                border: '1px solid black',
                boxSizing: 'border-box',
                padding: 2,
                position: 'relative',
            }}
        >{`${key}`}
        </div>
    )
}
function UkuleleType({ title, onClick, active }: any): JSX.Element {
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

function Ukulele({synth, setSynth}: InstrumentProps): JSX.Element {

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
            <div className="UkuleleGrid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr',
                    gridTemplateRows: 'repeat(3, 1fr',
                    width: '80%',
                    height: '20vh',
                    margin: 'auto',
                    border: '1px solid pink',
                    boxSizing: 'border-box',
                    padding: 2,
                }}
            >
                {Range(0,4).map((s) => 
                    Range(0,5).map((f) => {
                        return (
                        <UkuleleKey
                            string={s}
                            fret={f}
                            synth={synth}
                        />
                        );
                    })
                )}
                {}
            </div>
            <div className={'pl4 pt4 flex'}>
                {oscillators.map(o => (
                <UkuleleType
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

export const UkuleleInstrument = new Instrument('Ukulele', Ukulele)

