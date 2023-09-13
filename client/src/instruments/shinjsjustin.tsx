import * as Tone from 'tone';
import {List, Range} from 'immutable';
import classNames from 'classnames';

import {Instrument, InstrumentProps} from '../Instruments';

interface GuitarNoteProps{
    string: number; // 1-6: E, A, D, G, B, E
    fret: number; // 1-12
    duration?: string;
    synth?: Tone.Synth;
    setSynth?: (synth: Tone.Synth) => void;
}

type note = {
    key: string,
    octave: number,
    isSharp: boolean
}

export function GuitarKey({
    string,
    fret,
    synth,
}: GuitarNoteProps): JSX.Element{
    const notes = [
        ['F2','F#2','G2','G#2','A2'],
        ['A#2','B2','C3','C#3','D3'],
        ['D#3','E3','F3','F#3','G3'],
        ['G#3','A3','A#3','B3','C4'],
        ['C4','C#4','D4','D#4','E4'],
        ['F4','F#4','G4','G#4','A4']
    ]
    // function getNote(string: number, fret: number): note{
    //     const x = notes[string][fret];
    //     return {key: x.charAt(1), octave: parseInt(x.charAt(0)), isSharp: x.length === 3}
    // }
    // const note = getNote(string, fret)
    // const key = note.key
    // const octave = note.octave
    // const attack = `${key}${note.isSharp? '#':''}${octave}`
    const key = notes[string][fret]
    const width = 100 / 5
    const height = 100/6
    const topp = height * (5-string)
    const leftt = width * fret
    // console.log('\nkey: (' + key + ')')
    // console.log('width: (' +width + ')')
    // console.log('height: (' + height + ')')
    // console.log('top: (' + topp + ')')
    // console.log('left: (' + leftt + ')')
    return (
        <div
            className='guitarKey'
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
function PianoType({ title, onClick, active }: any): JSX.Element {
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

function Guitar({synth, setSynth}: InstrumentProps): JSX.Element {

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
            <div className="guitarGrid"
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
                        <GuitarKey
                            string={s}
                            fret={f}
                            synth={synth}
                        />
                        );
                    })
                )}
                {/* {notes.map((string, stringIndex)=>(
                    <div className='string' key={`string-${stringIndex}`}>
                        {string.map((note, noteIndex)=> (
                            <GuitarKey
                                key={`note-${stringIndex}-${noteIndex}`}
                                string={stringIndex}
                                fret={noteIndex}
                                synth={synth}
                                />
                        ))}
                    </div>
                ))} */}
            </div>
            <div className={'pl4 pt4 flex'}>
                {oscillators.map(o => (
                <PianoType
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

export const GuitarInstrument = new Instrument('Guitar', Guitar)