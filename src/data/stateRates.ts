export type WorkType = 'residential' | 'commercial' | 'both'
export type CompanySize = 'solo' | 'small' | 'medium'
export type Experience = 'new' | 'mid' | 'exp'

export interface StateData {
  laborMult: number
  sqftMult: number
  region: string
}

export const STATE_DATA: Record<string, StateData> = {
  'Alabama':        { laborMult: 0.82, sqftMult: 0.83, region: 'Southeast' },
  'Alaska':         { laborMult: 1.28, sqftMult: 1.35, region: 'Pacific' },
  'Arizona':        { laborMult: 0.95, sqftMult: 0.96, region: 'Southwest' },
  'Arkansas':       { laborMult: 0.78, sqftMult: 0.79, region: 'South' },
  'California':     { laborMult: 1.38, sqftMult: 1.42, region: 'Pacific' },
  'Colorado':       { laborMult: 1.08, sqftMult: 1.10, region: 'Mountain' },
  'Connecticut':    { laborMult: 1.22, sqftMult: 1.25, region: 'Northeast' },
  'Delaware':       { laborMult: 1.05, sqftMult: 1.06, region: 'Mid-Atlantic' },
  'Florida':        { laborMult: 0.92, sqftMult: 0.93, region: 'Southeast' },
  'Georgia':        { laborMult: 0.93, sqftMult: 0.94, region: 'Southeast' },
  'Hawaii':         { laborMult: 1.32, sqftMult: 1.40, region: 'Pacific' },
  'Idaho':          { laborMult: 0.88, sqftMult: 0.89, region: 'Mountain' },
  'Illinois':       { laborMult: 1.12, sqftMult: 1.14, region: 'Midwest' },
  'Indiana':        { laborMult: 0.88, sqftMult: 0.89, region: 'Midwest' },
  'Iowa':           { laborMult: 0.84, sqftMult: 0.85, region: 'Midwest' },
  'Kansas':         { laborMult: 0.83, sqftMult: 0.84, region: 'Plains' },
  'Kentucky':       { laborMult: 0.82, sqftMult: 0.83, region: 'South' },
  'Louisiana':      { laborMult: 0.84, sqftMult: 0.85, region: 'South' },
  'Maine':          { laborMult: 0.92, sqftMult: 0.93, region: 'Northeast' },
  'Maryland':       { laborMult: 1.15, sqftMult: 1.17, region: 'Mid-Atlantic' },
  'Massachusetts':  { laborMult: 1.28, sqftMult: 1.32, region: 'Northeast' },
  'Michigan':       { laborMult: 0.93, sqftMult: 0.94, region: 'Midwest' },
  'Minnesota':      { laborMult: 1.02, sqftMult: 1.03, region: 'Midwest' },
  'Mississippi':    { laborMult: 0.76, sqftMult: 0.77, region: 'South' },
  'Missouri':       { laborMult: 0.87, sqftMult: 0.88, region: 'Midwest' },
  'Montana':        { laborMult: 0.86, sqftMult: 0.87, region: 'Mountain' },
  'Nebraska':       { laborMult: 0.84, sqftMult: 0.85, region: 'Plains' },
  'Nevada':         { laborMult: 1.02, sqftMult: 1.03, region: 'West' },
  'New Hampshire':  { laborMult: 1.05, sqftMult: 1.06, region: 'Northeast' },
  'New Jersey':     { laborMult: 1.26, sqftMult: 1.28, region: 'Northeast' },
  'New Mexico':     { laborMult: 0.84, sqftMult: 0.85, region: 'Southwest' },
  'New York':       { laborMult: 1.30, sqftMult: 1.35, region: 'Northeast' },
  'North Carolina': { laborMult: 0.88, sqftMult: 0.89, region: 'Southeast' },
  'North Dakota':   { laborMult: 0.86, sqftMult: 0.87, region: 'Plains' },
  'Ohio':           { laborMult: 0.90, sqftMult: 0.91, region: 'Midwest' },
  'Oklahoma':       { laborMult: 0.80, sqftMult: 0.81, region: 'South' },
  'Oregon':         { laborMult: 1.15, sqftMult: 1.17, region: 'Pacific' },
  'Pennsylvania':   { laborMult: 1.05, sqftMult: 1.06, region: 'Mid-Atlantic' },
  'Rhode Island':   { laborMult: 1.10, sqftMult: 1.12, region: 'Northeast' },
  'South Carolina': { laborMult: 0.84, sqftMult: 0.85, region: 'Southeast' },
  'South Dakota':   { laborMult: 0.80, sqftMult: 0.81, region: 'Plains' },
  'Tennessee':      { laborMult: 0.86, sqftMult: 0.87, region: 'South' },
  'Texas':          { laborMult: 0.94, sqftMult: 0.95, region: 'South' },
  'Utah':           { laborMult: 0.96, sqftMult: 0.97, region: 'Mountain' },
  'Vermont':        { laborMult: 0.96, sqftMult: 0.97, region: 'Northeast' },
  'Virginia':       { laborMult: 1.05, sqftMult: 1.06, region: 'Mid-Atlantic' },
  'Washington':     { laborMult: 1.22, sqftMult: 1.24, region: 'Pacific' },
  'West Virginia':  { laborMult: 0.78, sqftMult: 0.79, region: 'South' },
  'Wisconsin':      { laborMult: 0.90, sqftMult: 0.91, region: 'Midwest' },
  'Wyoming':        { laborMult: 0.88, sqftMult: 0.89, region: 'Mountain' },
}

export const BASE = {
  laborLow: 38, laborMed: 52, laborHigh: 72,
  intSqftLow: 1.50, intSqftMed: 2.25, intSqftHigh: 3.50,
  extSqftLow: 1.25, extSqftMed: 1.90, extSqftHigh: 3.00,
  jobLow: 1800, jobMed: 3800, jobHigh: 8500,
}

export function calcMultipliers(
  state: string,
  workType: WorkType,
  companySize: CompanySize,
  experience: Experience
): { fm: number; fsm: number; region: string } {
  const d = STATE_DATA[state]
  const sizeMult = companySize === 'solo' ? 0.92 : companySize === 'small' ? 1.0 : 1.08
  const expMult  = experience === 'new' ? 0.88 : experience === 'mid' ? 1.0 : 1.10
  const wtMult   = workType === 'commercial' ? 1.18 : workType === 'both' ? 1.08 : 1.0
  return {
    fm:  d.laborMult * sizeMult * expMult * wtMult,
    fsm: d.sqftMult  * sizeMult * expMult * wtMult,
    region: d.region,
  }
}

export const STATES = Object.keys(STATE_DATA)
