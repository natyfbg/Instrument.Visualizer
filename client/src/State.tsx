// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument} from './instruments/shinjsjustin';
import { WaveformVisualizer } from './visualizers/Waveform';
import { CircularVisualizer } from './visualizers/shinjsjustin';
import { BarformVisualizer } from './visualizers/shinjsjustin-2';
import { UkuleleInstrument } from './instruments/katevu';
import { UkuleleVisualizer } from './visualizers/katevu';
import { BanjoInstrument } from './instruments/waynethanh10';
import { SquareVisualizer } from './visualizers/waynethanh10';
import { DrumPadsInstrument } from './instruments/DrumPads';
import { ShibliVisualizer } from './visualizers/shibli21';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, GuitarInstrument, UkuleleInstrument, BanjoInstrument, DrumPadsInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer, CircularVisualizer, BarformVisualizer, UkuleleVisualizer, SquareVisualizer, ShibliVisualizer]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});