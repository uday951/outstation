import type { IconName } from '../components/Icon.astro';

export const serviceIcons: Record<string, IconName> = {
  'outstation-ambulance': 'route',
  'icu-ambulance': 'activity',
  'ventilator-ambulance': 'fan',
  'oxygen-ambulance': 'wind',
  'als-ambulance': 'syringe',
  'bls-ambulance': 'cross',
  'patient-transport': 'accessibility',
  'hospital-transfer': 'hospital',
  'neonatal-ambulance': 'baby',
  'medical-escort': 'userCheck',
  'train-ambulance-coordination': 'train',
  'air-ambulance-coordination': 'plane',
  'airport-ambulance-transfer': 'planeTakeoff',
  'emergency-ambulance': 'siren',
  'cardiac-ambulance': 'heartPulse',
  'trauma-ambulance': 'bandage',
  'dead-body-freezer-box': 'snowflake',
  'mortuary-service': 'building',
  'standby-ambulance': 'shieldPlus',
};
